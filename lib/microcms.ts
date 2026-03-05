const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN
const apiKey = process.env.MICROCMS_API_KEY

export async function getArticles() {
  const res = await fetch(
    `https://${serviceDomain}.microcms.io/api/v1/articles`,
    {
      headers: {
        "X-MICROCMS-API-KEY": apiKey || "",
      },
      next: { revalidate: 60 },
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch articles")
  }

  return res.json()
}

export async function getArticle(id: string) {
  const res = await fetch(
    `https://${serviceDomain}.microcms.io/api/v1/articles/${id}`,
    {
      headers: {
        "X-MICROCMS-API-KEY": apiKey || "",
      },
      next: { revalidate: 60 },
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch article")
  }

  return res.json()
}