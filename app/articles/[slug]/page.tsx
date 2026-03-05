import { getArticle } from "@/lib/microcms"

export default async function ArticlePage({ params }: any) {
  const article = await getArticle(params.slug)

  return (
    <main className="max-w-3xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-6">{article.title}</h1>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: article.body }}
      />
    </main>
  )
}