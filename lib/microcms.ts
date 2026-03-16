// lib/microcms.ts
const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
const apiKey = process.env.MICROCMS_API_KEY

async function microcmsFetch(path: string) {
  const res = await fetch(`https://${serviceDomain}.microcms.io/api/v1${path}`, {
    headers: { "X-MICROCMS-API-KEY": apiKey || "" },
    next: { revalidate: 60 },
  })

  if (!res.ok) {
    throw new Error(`microCMS fetch failed: ${res.status}`)
  }

  return res.json()
}

export async function getArticles(options?: { limit?: number; offset?: number }) {
  const limit = options?.limit ?? 30
  const offset = options?.offset ?? 0
  return microcmsFetch(
    `/articles?fields=id,title,slug,description,thumbnail,publishedAt,category,tag&limit=${limit}&offset=${offset}`
  )
}

export async function getArticleBySlug(slug: string) {
  const data = await microcmsFetch(
    `/articles?filters=slug[equals]${encodeURIComponent(slug)}&limit=1&fields=id,title,slug,description,body,thumbnail,publishedAt,updatedAt,category,tag,author`
  )

  if (!data?.contents?.length) {
    throw new Error("Article not found")
  }

  return data.contents[0]
}

export async function getRelatedArticles(args: {
  categoryId: string
  excludeId: string
  limit?: number
}) {
  const limit = args.limit ?? 3

  const filters = `category[equals]${args.categoryId}[and]id[not_equals]${args.excludeId}`

  const data = await microcmsFetch(
    `/articles?filters=${encodeURIComponent(filters)}&limit=${limit}&fields=id,title,slug,description,thumbnail,category,tag,publishedAt`
  )

  return data?.contents ?? []
}

export async function getTagBySlug(slug: string) {
  const data = await microcmsFetch(
    `/tags?filters=slug[equals]${encodeURIComponent(slug)}&limit=1&fields=id,name,slug`
  )

  if (!data?.contents?.length) {
    throw new Error("Tag not found")
  }

  return data.contents[0]
}

export async function getCategoryBySlug(slug: string) {
  const data = await microcmsFetch(
    `/categories?filters=slug[equals]${encodeURIComponent(slug)}&limit=1&fields=id,name,slug`
  )

  if (!data?.contents?.length) {
    throw new Error("Category not found")
  }

  return data.contents[0]
}

export async function getArticlesByTag(slug: string, options?: { limit?: number; offset?: number }) {
  const tag = await getTagBySlug(slug)
  const limit = options?.limit ?? 30
  const offset = options?.offset ?? 0

  const data = await microcmsFetch(
    `/articles?filters=tag[contains]${tag.id}&limit=${limit}&offset=${offset}&fields=id,title,slug,description,thumbnail,publishedAt,updatedAt,category,tag`
  )

  return { tag, ...data }
}

export async function getArticlesByCategory(slug: string, options?: { limit?: number; offset?: number }) {
  const category = await getCategoryBySlug(slug)
  const limit = options?.limit ?? 30
  const offset = options?.offset ?? 0

  const data = await microcmsFetch(
    `/articles?filters=category[equals]${category.id}&limit=${limit}&offset=${offset}&fields=id,title,slug,description,thumbnail,publishedAt,updatedAt,category,tag`
  )

  return { category, ...data }
}