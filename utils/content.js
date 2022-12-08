import { resizeImage } from './index'

const queryTotal = {}

export class ContentError extends Error {
  constructor (message, err, statusCode = 503) {
    super(message)
    this.error = err
    this.statusCode = statusCode
  }
}

export const ContentError404 = (err) => {
  return new ContentError('Not found', err, 404)
}

const makeParams = (params = null) => {
  return {
    page: 1,
    per_page: 10,
    sort: null,
    sort_dir: false,
    slug: null,
    ...(params || {})
  }
}

const queryContent = async ($content, path, params = null, config = null) => {
  const options = {
    only: [],
    ignore: [],
    total: null,
    callback: null,
    forEach: null,
    auto: true,
    ...(config || {})
  }
  params = makeParams(params)

  const docPath = options.auto
    ? `auto/${path}`
    : path

  const makeQuery = () => {
    let q = params.slug
      ? $content(docPath, params.slug)
      : $content(docPath)
    if (params.sort) {
      q = q.sortBy(params.sort, params.sort_dir ? 'asc' : 'desc')
    }
    if (options.callback) {
      q = options.callback(q)
    }
    return q
  }

  let query = makeQuery()
  if (params.per_page > 0) {
    query = query.limit(params.per_page)

    if (params.page > 1) {
      query = query.skip((params.page - 1) * params.per_page)
    }
  }

  const hasEach = typeof options.forEach === 'function'
  const defIgnore = ['dir', 'path', 'extension']
  const filterRow = (row, defaults = true) => {
    const record = {}
    for (const key in row) {
      if ((defaults && defIgnore.includes(key)) || options.ignore.includes(key) ||
        (options.only.length > 0 && !options.only.includes(key))) {
        continue
      }
      record[key] = row[key]
    }
    return hasEach ? options.forEach(record) : record
  }

  try {
    const result = await query.fetch()

    if (params.slug) {
      return result ? filterRow(result, false) : null
    } else {
      const records = result && Array.isArray(result) ? result.map(filterRow) : []

      if (options.total) {
        if (!(options.total in queryTotal)) {
          const tResponse = await makeQuery().only(['id']).fetch()
          queryTotal[options.total] = tResponse.length
        }

        return {
          total: queryTotal[options.total],
          records
        }
      }
      return records
    }
  } catch (ex) {
    throw ContentError404(ex)
  }
}

const fetchPosts = async ($content, params = null, config = null) => {
  params = {
    per_page: 10,
    author: null,
    tag: null,
    category: null,
    year: null,
    month: null,
    resolveTotal: false,
    ...(params || {})
  }
  if (params.author) {
    params.author = parseInt(params.author)
  }
  if (params.tag) {
    params.tag = parseInt(params.tag)
  }
  if (params.categpry) {
    params.categpry = parseInt(params.categpry)
  }
  if (params.year) {
    params.year = parseInt(params.year)
    if (isNaN(params.year)) {
      params.year = 0
    }
  } else {
    params.year = 0
  }
  if (params.month) {
    params.month = parseInt(params.month)
    if (isNaN(params.month)) {
      params.month = 0
    }
  } else {
    params.month = 0
  }

  let eCB
  if (!config) {
    config = {}
  } else if (typeof config.callback === 'function') {
    eCB = config.callback
  }
  config.callback = (query) => {
    const where = {}
    if (params.author) {
      where.authorIDs = {
        $contains: params.author
      }
    }
    if (params.tag) {
      where.tagIDs = {
        $contains: params.tag
      }
    }
    if (params.category) {
      where.categoryIDs = {
        $contains: params.category
      }
    }
    if (params.year > 0) {
      where.year = params.year
    }
    if (params.month > 0) {
      where.month = params.month
    }

    if (Object.keys(where).length > 0) {
      query = query.where(where)
    }
    if (eCB != null) {
      return eCB(query)
    }
    return query
  }

  if (params.resolveTotal) {
    let totalKey = `l:${params.per_page}`
    if (params.author) {
      totalKey += `;a:${params.author}`
    }
    if (params.categories) {
      totalKey += `;c:${params.categories.join(',')}`
    }
    config.total = totalKey
  }

  const result = await queryContent($content, 'posts/list', params, config)
  if (params.slug) {
    return resolvePost($content, result)
  }

  if (config.total) {
    const resolved = await resolvePosts($content, result.records)
    return {
      total: result.total,
      records: resolved
    }
  }
  return resolvePosts($content, result)
}

const fetchPost = async ($content, slug, params = null, config = null) => {
  if (!params) {
    params = {}
  }
  params.slug = decodeURIComponent(slug)

  const post = await fetchPosts($content, {
    ...(params || {}),
    slug
  }, config)
  if (post) {
    post.author_info = await queryContent($content, 'authors', null, {
      callback: (query) => {
        return query.where({
          slug: {
            $in: post.authors.map(author => author.slug)
          }
        })
      }
    })
  }
  return post
}

const resolvePost = ($content, post) => {
  if (!post.stamp) {
    return post
  }
  return $content(`auto/posts/${post.stamp}`, post.slug)
    .fetch()
    .catch((err) => {
      console.log('fetch post failed [%s]: %s', post.slug, err.message)
      return null
    })
}

const resolvePosts = ($content, posts) => {
  return Promise.all(posts.map((post) => {
    return resolvePost($content, post)
  }))
}

const wrap = async (onError, cb) => {
  try {
    return await cb()
  } catch (ex) {
    if (ex instanceof ContentError) {
      console.error(ex.error)
      onError(ex)
    } else {
      console.error(ex)
      throw ex
    }
  }
}

const allCategories = ($content, params = null, config = null) => {
  return queryContent($content, 'categories', {
    ...(params || {}),
    per_page: 0
  }, {
    only: ['id', 'name', 'slug', 'image', 'count'],
    ...(config || {})
  })
}

const recallNewsData = async ($content, params = null, config = null) => {
  params = {
    page: 1,
    per_page: 10,
    resolveTotal: false,
    ...(params || {})
  }
  config = {
    append: {},
    banner: true,
    categories: true,
    categoryRecalls: false,
    ...(config || {})
  }

  let total = 0
  let recallNews = []
  if (params.resolveTotal) {
    const { total: totalRecords, records } = await fetchPosts($content, params)
    total = totalRecords
    recallNews = records
  } else {
    recallNews = await fetchPosts($content, params, config)
  }

  const categoryRecalls = config.categoryRecalls
    ? recallNews.map((post) => {
      return {
        id: post.id,
        slug: post.slug,
        category: post.category
          ? {
              ...post.category,
              image: resizeImage(post.category.image)
            }
          : null,
        createdAt: post.createdAt
      }
    })
    : []

  const banner = config.banner && recallNews.length > 0 ? recallNews.shift() : null
  const categories = config.categories ? await allCategories($content) : []

  const response = {
    recallNews,
    ...config.append
  }
  if (config.banner) {
    response.banner = banner
  }
  if (config.categories) {
    response.categories = categories
  }
  if (config.categoryRecalls) {
    response.categoryRecalls = categoryRecalls
  }
  if (params.resolveTotal) {
    response.total = total
    response.page = params.page
    response.per_page = params.per_page
  }
  return response
}

const fetchDealers = async ($content, params = null, config = null) => {
  params = {
    zip: null,
    dealerSlug: null,
    cityStateSlug: null,
    state: null,
    brand: null,
    per_page: 0,
    ...(params || {})
  }

  let eCB
  if (!config) {
    config = {}
  } else if (typeof config.callback === 'function') {
    eCB = config.callback
  }

  let eFEach
  if (typeof config.forEach === 'function') {
    eFEach = config.forEach
  }

  config.forEach = (row) => {
    row.addressDisplay = `${row.address} ${row.city}, ${row.state} ${row.zip} United States`
    if (eFEach != null) {
      return eCB(row)
    }
    return row
  }

  config.callback = (query) => {
    const where = {}
    if (params.zip) {
      where.zip = parseInt(params.zip)
    }
    if (params.dealerSlug) {
      where.dealerSlug = params.dealerSlug.toLowerCase()
    }
    if (params.cityStateSlug) {
      where.cityStateSlug = params.cityStateSlug.toLowerCase()
    }
    if (params.state) {
      where.state = params.state
    }
    if (params.brand) {
      where.brandsList = {
        $contains: params.brand.toLowerCase()
      }
    }

    if (Object.keys(where).length > 0) {
      query = query.where(where)
    }
    if (eCB != null) {
      return eCB(query)
    }
    return query
  }

  const result = await queryContent($content, 'dealers/list', params, config)
  if (params.slug) {
    return resolveDealer($content, result)
  }

  if (config.total) {
    const resolved = await resolveDealers($content, result.records)
    return {
      total: result.total,
      records: resolved
    }
  }
  return resolveDealers($content, result)
}

const resolveDealer = ($content, dealer) => {
  return $content(`auto/dealers/${dealer.state}`, dealer.slug)
    .fetch()
    .catch((err) => {
      console.log('fetch dealer failed [%s]: %s', dealer.slug, err.message)
      return null
    })
}

const resolveDealers = ($content, posts) => {
  return Promise.all(posts.map((post) => {
    return resolveDealer($content, post)
  }))
}

const fetchDealer = async ($content, dealerSlug, cityStateSlug, params = null, config = null) => {
  const records = await fetchDealers($content, {
    ...(params || {}),
    dealerSlug,
    cityStateSlug,
    per_page: 1
  }, config)
  return records && records.length > 0 ? records[0] : null
}

export default {
  wrap,
  queryContent,
  resolvePost,
  resolvePosts,
  resolveDealer,
  resolveDealers,

  resolvePayload: (key, payload, cb) => {
    if (key in payload) {
      return payload[key]
    }

    return cb()
  },

  fetchPost,
  fetchPosts,

  fetchAuthor: ($content, slug, params = null, config = null) => {
    return queryContent($content, 'authors', {
      ...(params || {}),
      slug
    }, config)
  },

  fetchAuthors: ($content, params = null, config = null) => {
    return queryContent($content, 'authors', params, config)
  },

  fetchTag: ($content, slug, params = null, config = null) => {
    return queryContent($content, 'tags', {
      ...(params || {}),
      slug
    }, config)
  },

  fetchTags: ($content, params = null, config = null) => {
    return queryContent($content, 'tags', params, config)
  },

  fetchCategory: ($content, slug, params = null, config = null) => {
    return queryContent($content, 'categories', {
      ...(params || {}),
      slug
    }, config)
  },

  fetchCategories: ($content, params = null, config = null) => {
    return queryContent($content, 'categories', params, config)
  },

  allCategories,

  recallNewsData,

  fetchDealers,
  fetchDealer
}
