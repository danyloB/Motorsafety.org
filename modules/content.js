import readline from 'readline'
import { $content } from '@nuxt/content'
import types from '../utils/types'
import makes from '../utils/makes'
import states from '../utils/states'
import content from '../utils/content'
import repo from '../generator/repo'

let generator
let routesDone = 0
let routesLength = 0
const IGNORE_CACHE = process.env.IGNORE_CACHE === '1'

const findRouteMatch = (route) => {
  let match
  if (generator.schema) {
    for (const entry of generator.schema) {
      if ((entry.regex && entry.pattern.test(route)) ||
        (!entry.regex && entry.pattern === route)) {
        match = entry
        break
      }
    }
  }
  return match
}

export const resolveRoutes = async (callback) => {
  generator = await repo.resolveGenerator(IGNORE_CACHE)

  if (!repo.routesReady) {
    try {
      const { $content } = require('@nuxt/content')
      const stats = await $content('auto/stats').fetch()

      repo.addRoute(
        '/',
        '/faqs/',
        '/about-us/',
        '/contact-us/',
        '/privacy/',
        '/terms/',
        '/dealers/',
        '/recall-news/'
      )
      for (const tag in stats.pages.tags) {
        repo.addRoute(`/tag/${tag}/`)
        if (stats.pages.tags[tag] >= 2) {
          for (let i = 2; i <= stats.pages.tags[tag]; i++) {
            repo.addRoute(`/tag/${tag}/page/${i}/`)
          }
        }
      }
      for (const author in stats.pages.authors) {
        repo.addRoute(`/author/${author}/`)
        if (stats.pages.authors[author] >= 2) {
          for (let i = 2; i <= stats.pages.authors[author]; i++) {
            repo.addRoute(`/author/${author}/page/${i}/`)
          }
        }
      }
      for (const cat in stats.pages.categories) {
        repo.addRoute(`/category/${cat}/`)
        if (stats.pages.categories[cat] >= 2) {
          for (let i = 2; i <= stats.pages.categories[cat]; i++) {
            repo.addRoute(`/category/${cat}/page/${i}/`)
          }
        }
      }
      for (const timed in stats.pages.timed) {
        repo.addRoute(`/${timed}/`)
        if (stats.pages.timed[timed] >= 2) {
          for (let i = 2; i <= stats.pages.timed[timed]; i++) {
            repo.addRoute(`/${timed}/page/${i}/`)
          }
        }
      }

      if (stats.pages.posts >= 2) {
        for (let i = 2; i <= stats.pages.posts; i++) {
          repo.addRoute(`/recall-news/page/${i}/`)
        }
      }
      for (const slug of stats.slugs) {
        repo.addRoute(`/${slug}/`)
      }

      for (const tp in types) {
        repo.addRoute(`/type/${tp}/`)
      }

      const zipDone = []
      const dealers = await $content('auto/dealers').fetch()
      for (const dealer of dealers) {
        if (zipDone.includes(dealer.zip)) {
          zipDone.push(dealer.zip)
          repo.addRoute(`/zip/${dealer.zip}/`)
        }
        repo.addRoute(`/dealers/${dealer.city_state_slug}/${dealer.dealerSlug}/`)
      }

      for (const mk of makes) {
        repo.addRoute(`/dealers/make/${mk.id}/`)
      }
      for (const st of states) {
        repo.addRoute(`/dealers/state/${st.id}/`)
        for (const mk2 of makes) {
          repo.addRoute(`/dealers/state/${st.id}/${mk2.id}/`)
        }
      }

      repo.filterRoutes()
      repo.markRoutesReady()

      routesLength = repo.totalRoutes
      callback(null, repo.allRoutes)
    } catch (ex) {
      callback(ex, null)
    }
  } else {
    routesLength = repo.totalRoutes
    callback(null, repo.allRoutes)
  }
}

export default function () {
  let payload = null
  const cacheStats = {
    total: 0,
    unchanged: 0,
    generated: 0
  }

  this.nuxt.hook('generate:before', async () => {
    const recallNews = await content.fetchPosts($content)
    payload = {
      recallNews
    }

    generator = await repo.resolveGenerator()
    generator.started()
  })

  this.nuxt.hook('generate:route', ({ route, setPayload }) => {
    setPayload(payload)

    const rMatch = findRouteMatch(route)
    if (rMatch) {
      generator.addRoute(rMatch.relFile, route)
      cacheStats.generated++
    } else {
      throw new Error('Failed to match route: ' + route)
    }

    cacheStats.total++
  })

  this.nuxt.hook('generate:routeCreated', () => {
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)

    routesDone++
    if (routesDone > routesLength) {
      console.log('⧗ Generated %d/%d (+%d) routes', routesDone, routesLength, routesDone - routesLength)
    } else {
      console.log('⧗ Generated %d/%d routes', routesDone, routesLength)
    }

    process.nextTick(() => {
      generator.pushBatch()
    })
  })

  this.nuxt.hook('generate:done', async () => {
    cacheStats.unchanged += repo.excludedLength

    if (cacheStats.total > 0) {
      if (IGNORE_CACHE) {
        generator.counter = 0
      }

      await generator.markDone()
      await generator.done()

      console.log('Generator stats: %d unchanged, %d generated',
        cacheStats.unchanged, cacheStats.generated
      )
    }
  })
}
