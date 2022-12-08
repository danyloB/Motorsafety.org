import { mkdirsSync } from 'fs-extra'
import Loki from 'lokijs'
import { readPages } from './reader'
import { copyDist } from './writer'

export default class Generator {
  constructor () {
    console.log('initialized object of generator')
    this._busy = 0
    this._ensured = false
    this._stamp = new Date().getTime()

    this.outputPath = './.generator'
    this.dbPath = `${this.outputPath}/cache.json`

    this.options = {
      readLimit: 100,
      writeLimit: 300
    }

    this.length = 0
    this.created = 0
    this.counter = 0
    this.startTime = null
    this.endTime = null
    this.schema = {}
    this.indexes = {}
    this.routes = []
    this.templates = {}
    this.templateIndexing = {}
    this.checksumChanges = {}

    mkdirsSync(this.outputPath)
    this.lokiDB = new Loki(this.dbPath)
    console.log(this.lokiDB)
    this.statRow = null
    this.statExists = false
  }

  async prepare () {
    if (!this._ensured) {
      this._ensured = true

      await this.load()

      this.statsCol = this.lokiDB.addCollection('stats')
      this.routesCol = this.lokiDB.addCollection('routes')
      this.templateCol = this.lokiDB.addCollection('templates')

      this.readStats()
    }
  }

  async done () {
    await this.save()
    this._ensured = false
  }

  addTemplate (file, checksum, rowid = null) {
    let activeChecksum
    if (rowid === null) {
      let tRow = this.templateCol.findOne({
        file
      })
      if (tRow) {
        if (tRow.checksum !== checksum) {
          activeChecksum = tRow.checksum
          this.checksumChanges[tRow.$loki] = checksum
        } else {
          activeChecksum = checksum
        }
        rowid = tRow.$loki
      } else {
        tRow = this.templateCol.insert({
          file,
          checksum,
          status: 'queue'
        })
        rowid = tRow.$loki
        activeChecksum = checksum
      }
    } else {
      activeChecksum = checksum
    }

    this.templates[file] = {
      rowid,
      checksum: activeChecksum
    }
    if (rowid) {
      this.templateIndexing[rowid] = file
    }
  }

  addRoute (file, ...routes) {
    if (file in this.templates) {
      for (const route of routes) {
        this.length++
        this.routes.push({
          template_id: this.templates[file].rowid,
          url: Array.isArray(route) ? route[0] : route,
          exists: Array.isArray(route) ? route[1] : false
        })
      }
    }
  }

  get canPush () {
    return this.routes.length >= this.options.writeLimit
  }

  pushBatch () {
    if (this.canPush) {
      const startTime = new Date()
      this.saveRoutes().then((count) => {
        const endTime = new Date()
        console.log('batch routes saved %s(%s) [%d ms]', count, this.length, endTime.getTime() - startTime.getTime())
      }).catch((err) => {
        const endTime = new Date()
        console.error('batch routes save failed: %s [%d ms]', err.message, endTime.getTime() - startTime.getTime())
      })
    }
  }

  async readExisting () {
    const routes = {}
    const readRows = (limit, cb, offset = 0) => {
      try {
        const rows = this.routesCol.chain().find({}).offset(offset).limit(limit).data()
        if (rows && rows.length > 0) {
          for (const row of rows) {
            cb(row)
          }

          if (rows.length < limit) {
            return null
          }
          return readRows(limit, cb, offset + limit)
        } else {
          return null
        }
      } catch (_) {
        return null
      }
    }

    await readRows(this.options.readLimit, (row) => {
      if (row.template_id in this.templateIndexing && !(row.template_id in routes)) {
        routes[row.template_id] = {
          file: this.templateIndexing[row.template_id],
          checksum: this.templates[this.templateIndexing[row.template_id]].checksum,
          routes: []
        }
      }
      routes[row.template_id].routes.push(row.url)
    })

    return routes
  }

  saveRoutes () {
    const routes = this.routes.splice(0, this.options.writeLimit)
    if (routes.length > 0) {
      this._busy++

      const fRoutes = routes
        .filter(route => !route.exists)
        .map((route) => {
          return {
            template_id: route.template_id,
            url: route.url,
            status: 'queue'
          }
        })

      if (fRoutes.length > 0) {
        this.routesCol.insert(fRoutes)
        this.created += fRoutes.length
        this._busy--
      }
    }

    return Promise.resolve(0)
  }

  waitForBusy () {
    if (this._busy < 1) {
      return Promise.resolve(true)
    }

    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        if (this._busy < 1) {
          clearTimeout(timer)
          resolve(true)
        }
      }, 500)
    })
  }

  load () {
    return new Promise((resolve, reject) => {
      this.lokiDB.loadDatabase({}, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(null)
        }
      })
    })
  }

  save () {
    return new Promise((resolve, reject) => {
      this.lokiDB.saveDatabase((err) => {
        if (err) {
          reject(err)
        } else {
          resolve(null)
        }
      })
    })
  }

  started () {
    this.startTime = new Date()
  }

  async markDone () {
    await this.waitForBusy()
    await this.saveRoutes()
    await this.updateChecksums()
    this.saveStats()
    this.queueDone()
  }

  updateChecksums () {
    if (Object.keys(this.checksumChanges).length > 0) {
      this.templateCol.findAndUpdate((tmpl) => {
        return Object.keys(this.checksumChanges).includes('' + tmpl.$loki)
      }, (tmpl) => {
        tmpl.checksum = this.checksumChanges[tmpl.$loki]
        return tmpl
      })
    }

    return null
  }

  queueDone () {
    this.routesCol.findAndUpdate({
      status: 'queue'
    }, (r) => {
      r.status = 'done'
      return r
    })

    this.templateCol.findAndUpdate({
      status: 'queue'
    }, (r) => {
      r.status = 'done'
      return r
    })

    this._busy = 0
    this.length = 0
    this.created = 0
    this.routes = []
    this.checksumChanges = {}
  }

  async clearQueue () {
    this.routesCol.findAndRemove({
      status: 'queue'
    })
    this.templateCol.findAndRemove({
      status: 'queue'
    })

    await this.save()
  }

  async readFiles (opts = {}) {
    const files = await readPages(opts)
    for (const file of files) {
      this.addTemplate(file.relFile, file.checksum)
    }
    return files
  }

  readStats () {
    this.statExists = false
    this.statRow = this.statsCol.findOne({})

    if (!this.statRow) {
      this.statRow = {
        length: 0,
        counter: 0,
        created: 0,
        duration: 0,
        lastModified: null
      }
    } else {
      this.statExists = true
    }

    this.counter = this.statRow.counter
    this.created = this.statRow.created
    this.length = this.statRow.length
  }

  saveStats () {
    this.endTime = new Date()

    this.statRow.length = this.length
    this.statRow.created = this.created
    this.statRow.counter = ++this.counter
    this.statRow.lastModified = new Date()
    this.statRow.duration = (this.endTime.getTime() - this.startTime.getTime())

    if (this.statExists) {
      this.statsCol.update(this.statRow)
    } else {
      this.statsCol.insert(this.statRow)
    }
  }

  async saveFiles () {
    await copyDist(this.counter > 1 && this.created > 0)
  }

  async createSchema (opts = null) {
    this.indexes = {}
    this.schema = await this.readFiles(opts)
    for (const idx in this.schema) {
      this.indexes[this.schema[idx].relFile] = idx
    }
  }
}
