import path from 'path'
import checksum from 'checksum'
import fse from 'fs-extra'

export const checksumPromise = (file) => {
  return new Promise((resolve, reject) => {
    checksum.file(file, (err, sum) => {
      if (err) {
        reject(err)
      } else {
        resolve(sum)
      }
    })
  })
}

export const createPageEntry = async (files, file, relFile) => {
  try {
    const fileChecksum = await checksumPromise(file)
    const urlPath = relFile.replace('/index.vue', '')
      .replace('index.vue', '')
      .replace('.vue', '')
    const splits = urlPath.split('/')
    const patternDepth = splits.filter(s => s.substring(0, 1) === '_').length

    let regex = false
    let pattern = '/' + (urlPath.length > 0 ? urlPath + '/' : '')
    if (urlPath.substring(0, 1) === '_' || urlPath.includes('/_')) {
      regex = true
      pattern = new RegExp('\\/' + splits.map((s) => {
        if (s.substring(0, 1) !== '_') {
          return `(${s})`
        }
        return '([a-zA-Z0-9.-_+:]+)'
      }).join('\\/') + '(\\/)?')
    }

    const fileEntry = {
      name: path.basename(relFile),
      file,
      relFile,
      urlPath,
      regex,
      pattern,
      depth: splits.length,
      patternDepth,
      checksum: fileChecksum
    }
    if (regex) {
      if (urlPath.substring(0, 1) === '_') {
        files.rogue.push(fileEntry)
      } else {
        files.regex.push(fileEntry)
      }
    } else {
      files.plain.push(fileEntry)
    }
  } catch (_) {}
}

export const sortedPageEntries = (files) => {
  files.plain.sort((b, a) => {
    return b.urlPath.length - a.urlPath.length
  })

  files.regex.sort((a, b) => {
    if (a.depth === b.depth) {
      return b.urlPath.length - a.urlPath.length
    }
    return b.depth - a.depth
  })

  files.rogue.sort((a, b) => {
    return b.patternDepth - a.patternDepth
  })

  return [
    ...files.plain,
    ...files.regex,
    ...files.rogue
  ]
}

export const readPages = async (opts = {}) => {
  const options = {
    dir: './pages',
    chunks: null,
    ...opts
  }

  const files = {
    plain: [],
    regex: [],
    rogue: []
  }

  const abspath = path.resolve(options.dir)
  const readPath = async (dir_path) => {
    const entries = await fse.readdir(dir_path, {
      withFileTypes: true
    })

    for (const entry of entries) {
      if (entry.name.substring(0, 1) !== '.') {
        const file = path.resolve(dir_path, entry.name)
        if (entry.isDirectory()) {
          await readPath(file)
        } else if (entry.name.endsWith('.vue')) {
          const relFile = file.replace(abspath + '/', '')
          await createPageEntry(files, file, relFile)
        }
      }
    }
  }

  if (options.chunks) {
    for (const source of options.chunks) {
      const file = path.resolve(`${source}.vue`)
      const relFile = `${source.replace('pages/', '')}.vue`
      await createPageEntry(files, file, relFile)
    }
  } else {
    await readPath(options.dir)
  }

  return sortedPageEntries(files)
}
