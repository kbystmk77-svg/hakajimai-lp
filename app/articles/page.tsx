import Link from "next/link"
import { getArticles } from "@/lib/microcms"

export default async function ArticlesPage() {
  const data = await getArticles()

  return (
    <main className="max-w-3xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8">記事一覧</h1>

      <ul className="space-y-4">
        {data.contents.map((article: any) => (
          <li key={article.id}>
            <Link
              href={`/articles/${article.id}`}
              className="text-blue-600 underline"
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}