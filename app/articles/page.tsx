//app\articles\page.tsx

import Image from "next/image"
import Link from "next/link"
import { getArticles } from "@/lib/microcms"
import Pagination from "@/components/Pagination"

const PER_PAGE = 30

type SearchParams = Promise<{ page?: string }>

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { page } = await searchParams
  const currentPage = Math.max(1, parseInt(page || "1", 10))
  const offset = (currentPage - 1) * PER_PAGE

  const data = await getArticles({ limit: PER_PAGE, offset })
  const articles = (data.contents || []).filter((article: any) => article.slug !== "hakajimai")
  const totalCount: number = data.totalCount || 0

  return (
    <main className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">記事一覧</h1>

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article: any) => {
          const thumbUrl = article?.thumbnail?.url
          const thumbAlt = article?.thumbnail?.alt || article?.title || ""

          return (
            <li key={article.id}>
              <Link
                href={`/articles/${article.slug}`}
                className="block border rounded-xl overflow-hidden hover:bg-gray-50 transition"
              >
                <div className="relative w-full aspect-[16/9] bg-gray-100 border-b">
                  {thumbUrl ? (
                    <Image
                      src={thumbUrl}
                      alt={thumbAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      priority={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="text-lg font-semibold leading-snug">
                    {article.title}
                  </div>

                  {article.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {article.description}
                    </p>
                  )}

                  <div className="text-xs text-gray-500 mt-3">
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString()
                      : ""}
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        perPage={PER_PAGE}
        basePath="/articles"
      />
    </main>
  )
}
