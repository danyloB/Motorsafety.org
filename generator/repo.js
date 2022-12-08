import Generator from '../generator'

let generator
let excluded = []
let routesReady = false
let existingRoutes = []
let resolvedRoutes = []
const routeMappings = {}

export default {
  async resolveGenerator (ignore_cache = false) {
    if (!generator) {
      generator = new Generator()

      await generator.prepare()
      await generator.clearQueue()
      await generator.createSchema()

      if (!ignore_cache) {
        existingRoutes = generator.counter > 0 ? await generator.readExisting() : null
        for (const key in existingRoutes) {
          for (const route of existingRoutes[key].routes) {
            routeMappings[route] = key
          }
        }
      }
    }
    return generator
  },

  get generatorResolved () {
    return !!generator
  },

  addRoute (...routes) {
    for (const route of routes) {
      resolvedRoutes.push(route)
    }
  },

  filterRoutes () {
    excluded = []
    const hasExisting = existingRoutes && Object.keys(existingRoutes).length > 0
    resolvedRoutes = resolvedRoutes.filter((route) => {
      let changed = true
      if (hasExisting) {
        const key = routeMappings[route]
        if (key && existingRoutes[key].checksum ===
          generator.schema[generator.indexes[existingRoutes[key].file]].checksum) {
          changed = false
          excluded.push(route)
        }
      }

      return changed
    })
  },

  get allRoutes () {
    return resolvedRoutes
  },

  get totalRoutes () {
    return resolvedRoutes.length
  },

  get excluded () {
    return excluded
  },

  get excludedLength () {
    return excluded.length
  },

  markRoutesReady () {
    routesReady = true
  },

  get routesReady () {
    return routesReady
  }
}
