// app/tag/[slug]/page.tsx
import Image from "next/image"
import Link from "next/link"
import { getArticlesByTag } from "@/lib/microcms"
import Pagination from "@/components/Pagination"

const PER_PAGE = 30

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export default async function TagPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { page } = await searchParams
  const currentPage = Math.max(1, parseInt(page || "1", 10))
  const offset = (currentPage - 1) * PER_PAGE

  const data = await getArticlesByTag(slug, { limit: PER_PAGE, offset })

  const tagName = data.tag?.name || slug
  const articles = data.contents || []
  const totalCount: number = data.totalCount || 0

  return (
    <main className="max-w-5xl mx-auto py-16 px-4">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-3">#{tagName}</h1>
        <p className="text-gray-600">「{tagName}」に関する記事一覧です。</p>
      </header>

      {articles.length === 0 && (
        <p className="text-gray-500">記事がまだありません。</p>
      )}

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
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
        basePath={`/tag/${slug}`}
      />
    </main>
  )
}
