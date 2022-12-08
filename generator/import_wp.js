import fs from 'fs'
import {
  format as formatDate,
  parse as parseDate
} from 'date-fns'
import axios from 'axios'
import excludeCategories from '../utils/categories'

const DEFAULT_JSON_SPACE = ''

const jsonSavable = (data, space = DEFAULT_JSON_SPACE) => {
  return JSON.stringify(data, null, space)
}

const strToDate = (dt, gmt = false, source = null) => {
  if (dt instanceof Date) {
    return dt
  }
  const splits = dt.split('T')
  return parseDate(
    `${splits[0]} ${splits[1].split('.')[0]} ${gmt ? '+0000' : ''}`.trim(),
    'yyyy-MM-dd HH:mm:ss' + (gmt ? ' X' : ''),
    source || new Date()
  )
}

const countPages = (total, per_page = 10) => {
  let pages = Math.round(total / per_page)
  if (total > (pages * per_page)) {
    pages++
  }
  if (isNaN(pages)) {
    pages = 0
  }
  return pages
}

const importData = (cb, space = DEFAULT_JSON_SPACE) => {
  Promise.resolve(cb()).then(({ stats = null, authors = [], taxonomies = {}, posts = [], timedPosts = {} }) => {
    return Promise.all([
      stats
        ? fs.promises.writeFile('./content/auto/stats.json', jsonSavable(stats, space))
        : Promise.resolve(null),
      authors.length > 0
        ? fs.promises.writeFile('./content/auto/authors.json', jsonSavable(authors, space))
        : Promise.resolve(null),
      ...Object.keys(taxonomies).map((t) => {
        const list = taxonomies[t]
        if (list.length < 1) {
          return Promise.resolve(null)
        }
        return fs.promises.writeFile('./content/auto/' + t + '.json', jsonSavable(Object.values(list), space))
      }),
      posts.length > 0
        ? fs.promises.writeFile('./content/auto/posts/list.json', jsonSavable(posts, space))
        : Promise.resolve(null),
      ...Object.keys(timedPosts).map((s) => {
        const list = timedPosts[s]
        if (list.length < 1) {
          return Promise.resolve(null)
        }
        return fs.promises.writeFile('./content/auto/posts/' + s + '.json', jsonSavable(Object.values(list), space))
      })
    ])
  }).then(() => {
    console.log('Successfully imported wordpress data')
  }).catch((err) => {
    console.log('Failed to import wordpress data: %s', err.message || err)
  })
}

const importFromAPI = (merge_posts = null, space = DEFAULT_JSON_SPACE) => {
  merge_posts = ['1', 'y', 'yes'].includes(String(merge_posts || '').toLowerCase())

  return importData(async () => {
    const jsonEndpoint = 'https://www.motorsafety.org/wp-json/wp/v2'

    const countStats = {
      tags: {},
      timed: {},
      authors: {},
      categories: {}
    }
    const importStats = {
      total: {
        tags: 0,
        posts: 0,
        authors: 0,
        categories: 0
      },
      pages: {
        tags: {},
        posts: 0,
        timed: {},
        authors: {},
        categories: {}
      },
      slugs: []
    }

    const makeRequest = (path, data = {}, method = 'get', config = {}) => {
      return axios[method](`${jsonEndpoint}${path}`, data, config)
    }

    const pagedRequest = async (name, path, cb, opts = null) => {
      const options = {
        page: 1,
        per_page: 25,
        method: 'get',
        data: {},
        config: {},
        max: 0,
        index: 1,
        total: 0,
        params: {},
        possible_total: 0,
        possible_pages: 0,
        ...(opts || {})
      }
      options.hasLimit = options.max > 0
      options.remaining = options.hasLimit ? options.max - options.total : -1

      if (options.possible_pages > 0 && options.page > options.possible_pages) {
        return null
      }

      let response
      try {
        response = await makeRequest(path, {
          params: {
            page: options.page,
            per_page: options.hasLimit
              ? (options.per_page > options.remaining ? options.remaining : options.per_page)
              : options.per_page,
            ...options.params
          },
          ...options.data
        }, options.method, options.config)
      } catch (ex) {
        if (ex.response && ex.response.data && ex.response.data.code &&
          ex.response.data.code === 'rest_post_invalid_page_number') {
          return null
        }
        throw ex
      }

      const toNextRequest = {}
      if (response && response.headers && options.possible_pages < 1) {
        if ('x-wp-total' in response.headers) {
          toNextRequest.possible_total = parseInt(response.headers['x-wp-total'])
        }
        if ('x-wp-totalpages' in response.headers) {
          toNextRequest.possible_pages = parseInt(response.headers['x-wp-totalpages'])
        }
      }

      let length = response && response.data ? response.data.length : 0
      if (length > 0 && options.hasLimit && length > options.remaining) {
        length = options.remaining
      }
      if (length > 0) {
        console.log(
          'API [%s]: page=%d size=%d total=%d',
          name,
          options.page,
          length,
          length + options.total
        )
        cb(response.data.splice(0, length))

        if (length < options.per_page || (options.hasLimit &&
          length + options.total >= options.max
        )) {
          return null
        }

        return pagedRequest(
          name, path, cb,
          {
            ...(opts || {}),
            page: options.page + 1,
            index: options.index + 1,
            total: options.total + length,
            ...toNextRequest
          }
        )
      } else {
        return null
      }
    }

    const makeTermInfo = (term, detailed = false, trimRecalls = false) => {
      const info = {
        id: term.id,
        name: trimRecalls && term.name.toLowerCase().endsWith('recalls')
          ? term.name.slice(0, -('recalls'.length)).trim()
          : term.name,
        slug: decodeURIComponent(term.slug)
      }
      if (term.image || (term.acf && term.acf.image)) {
        info.image = term.image || term.acf.image
      }
      if (detailed) {
        info.recall = term.name.toLowerCase().includes('recall')
        info.link = term.link
        info.description = term.description
      }
      if (Object.prototype.hasOwnProperty.call(term, 'count')) {
        info.count = term.count
      }
      return info
    }

    const posts = []
    const timedPosts = []
    const authors = []
    const taxonomies = {
      categories: [],
      tags: []
    }

    const getAuthors = async () => {
      await pagedRequest('authors', '/users', (data) => {
        for (const author of data) {
          authors.push({
            id: author.id,
            name: author.name,
            description: author.description,
            slug: decodeURIComponent(author.slug),
            link: author.link,
            avatar_urls: author.avatar_urls,
            acf: author.acf
          })
          importStats.total.authors++
        }
      })
    }
    await getAuthors()

    const getTags = async () => {
      await pagedRequest('tags', '/tags', (data) => {
        for (const tag of data) {
          taxonomies.tags.push(makeTermInfo(tag, true))
          importStats.total.tags++
        }
      }, {
        per_page: 100
      })
    }
    await getTags()

    const getCategories = async () => {
      await pagedRequest('categories', '/categories', (data) => {
        for (const category of data) {
          if (!excludeCategories.excludes.includes(category.name)) {
            taxonomies.categories.push(makeTermInfo(category, true, true))
            importStats.total.categories++
          }
        }
      }, {
        per_page: 100
      })
    }
    await getCategories()

    const getPosts = async () => {
      const extractTaxonomies = (terms) => {
        const tags = []
        const categories = []

        for (const tgroups of terms) {
          for (const term of tgroups) {
            if (term.taxonomy === 'category' && !excludeCategories.excludes.includes(term.name)) {
              categories.push(makeTermInfo(term, false, true))
            } else if (term.taxonomy === 'post_tag') {
              tags.push(makeTermInfo(term))
            }
          }
        }

        return {
          tags,
          categories
        }
      }

      await pagedRequest('posts', '/posts', (data) => {
        for (const post of data) {
          const date = strToDate(post.date)
          const extracted = extractTaxonomies(post._embedded['wp:term'])

          const postData = {
            id: post.id,
            title: post.title.rendered,
            link: post.link,
            status: post.status,
            slug: decodeURIComponent(post.slug),
            excerpt: post.excerpt.rendered,
            description: post.content.rendered,
            source: post.guid.rendered,
            createdAt: date,
            date_gmt: strToDate(post.date_gmt, true),
            updatedAt: strToDate(post.modified),
            modified_gmt: strToDate(post.modified_gmt, true),
            display_date: formatDate(date, 'LLLL dd, yyyy'),
            sticky: post.sticky,
            recall: post.title.rendered.toLowerCase().includes('recall'),
            authors: post._embedded.author && post._embedded.author.length > 0
              ? post._embedded.author.map((author) => {
                return {
                  id: author.id,
                  name: author.name,
                  slug: decodeURIComponent(author.slug)
                }
              })
              : [],
            acf: post.acf,
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            featured_image: null,
            alt_text: '',
            cld_public_id: null,
            category: extracted.categories.length > 0 ? extracted.categories[0] : null,
            ...extracted
          }

          const images = post._embedded['wp:featuredmedia']
          if (images && images.length) {
            const image = images[0]
            postData.featured_image = image.source_url
            postData.alt_text = image.alt_text || ''
            if (image.media_details && image.media_details.sizes &&
              image.media_details.sizes && image.media_details.sizes.medium_large) {
              postData.featured_image = image.media_details.sizes.medium_large.source_url
            }
            if (image.media_details && image.media_details._cloudinary_v2 && image.media_details._cloudinary_v2._public_id) {
              postData.cld_public_id = image.media_details._cloudinary_v2._public_id
            }
          }

          postData.authors.forEach((author) => {
            if (!(author.slug in countStats.authors)) {
              countStats.authors[author.slug] = 0
            }
            countStats.authors[author.slug]++
          })

          postData.tags.forEach((tag) => {
            if (!(tag.slug in countStats.tags)) {
              countStats.tags[tag.slug] = 0
            }
            countStats.tags[tag.slug]++
          })

          postData.categories.forEach((cat) => {
            if (!(cat.slug in countStats.categories)) {
              countStats.categories[cat.slug] = 0
            }
            countStats.categories[cat.slug]++
          })

          if (merge_posts) {
            postData.authorIDs = postData.authors.map(author => author.id)
            postData.categoryIDs = post.categories
            postData.tagIDs = post.tags
            posts.push(postData)
          } else {
            const postStamp = `${postData.year}-${postData.month}`
            if (!(postStamp in timedPosts)) {
              timedPosts[postStamp] = []
            }
            timedPosts[postStamp].push(postData)

            posts.push({
              id: postData.id,
              slug: postData.slug,
              stamp: postStamp,
              authorIDs: postData.authors.map(author => author.id),
              categoryIDs: post.categories,
              tagIDs: post.tags,
              year: postData.year,
              month: postData.month,
              createdAt: postData.createdAt,
              updatedAt: postData.updatedAt
            })
          }

          const timeSlug = `${postData.year}/${postData.month}`
          if (!(timeSlug in countStats.timed)) {
            countStats.timed[timeSlug] = 0
          }
          countStats.timed[timeSlug]++

          importStats.slugs.push(postData.slug)
          importStats.total.posts++
        }
      }, {
        params: {
          _embed: true
        }
      })
    }
    await getPosts()

    importStats.pages.posts = countPages(importStats.total.posts)
    for (const tID in countStats.tags) {
      importStats.pages.tags[tID] = countPages(countStats.tags[tID])
    }
    for (const aID in countStats.authors) {
      importStats.pages.authors[aID] = countPages(countStats.authors[aID])
    }
    for (const cID in countStats.categories) {
      importStats.pages.categories[cID] = countPages(countStats.categories[cID])
    }
    for (const tSlug in countStats.timed) {
      importStats.pages.timed[tSlug] = countPages(countStats.timed[tSlug])
    }
    importStats.createdAt = new Date()
    importStats.updatedAt = new Date()

    return {
      stats: importStats,
      authors,
      taxonomies,
      posts,
      timedPosts
    }
  }, space)
}

importFromAPI(process.env.MERGE_POSTS, process.env.JSON_SPACE || DEFAULT_JSON_SPACE)
