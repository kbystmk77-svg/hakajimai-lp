// app/articles/[slug]/page.tsx

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getArticleBySlug, getRelatedArticles, getArticlesByTag } from "@/lib/microcms"
import type { Metadata } from "next"

type PageProps = {
  params: Promise<{ slug: string }>
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/<\/?[^>]+>/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "")
}

function buildTocAndHtml(html: string) {
  const toc: Array<{ id: string; text: string; level: 2 | 3 }> = []
  const used = new Map<string, number>()

  const out = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, levelStr, attrs, inner) => {
      const level = Number(levelStr) as 2 | 3
      const text = inner.replace(/<[^>]+>/g, "").trim()
      if (!text) return match

      let base = slugify(text) || "section"
      const n = (used.get(base) ?? 0) + 1
      used.set(base, n)
      const id = n === 1 ? base : `${base}-${n}`

      toc.push({ id, text, level })

      // 既に id があれば上書きしない
      if (/\sid\s*=/.test(attrs)) return match

      return `<h${level}${attrs} id="${id}">${inner}</h${level}>`
    }
  )

  return { toc, html: out }
}

function normalizeAuthor(author: any) {
  if (!author) return null
  if (Array.isArray(author)) return author[0] ?? null
  return author
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params

  if (slug === "hakajimai") {
    return {
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const article = await getArticleBySlug(slug)

  const title = `${article.title} | 墓じまいパートナーズ`
  const description = article.description || "墓じまいの手続き・費用・供養方法などをわかりやすく解説します。"
  const urlPath = `/articles/${article.slug}`
  const imageUrl = article?.thumbnail?.url

  return {
    title,
    description,
    alternates: {
      canonical: urlPath,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: urlPath,
      images: imageUrl
        ? [
            {
              url: imageUrl,
            },
          ]
        : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params

  if (slug === "hakajimai") {
    notFound()
  }

  const article = await getArticleBySlug(slug)
  const author = normalizeAuthor(article.author)

  const { toc, html } = buildTocAndHtml(article.body || "")

  const related =
    article?.category?.id
      ? (await getRelatedArticles({
          categoryId: article.category.id,
          excludeId: article.id,
          limit: 10,
        })).filter((a: any) => a.slug !== "hakajimai").slice(0, 3)
      : []

  const tagArticles =
    article?.tag?.length > 0
      ? (await getArticlesByTag(article.tag[0].slug)).contents
          .filter((a: any) => a.id !== article.id && a.slug !== "hakajimai")
          .slice(0, 3)
      : []

  return (
    <main className="max-w-3xl mx-auto py-16">
      {/* パンくず（categoryがある前提） */}
      {article.category?.slug && (
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/">ホーム</Link> /{" "}
          <Link href={`/category/${article.category.slug}`}>
            {article.category.name}
          </Link>
        </nav>
      )}

      {article?.thumbnail?.url && (
        <div className="relative w-full aspect-[16/9] bg-gray-100 border rounded-xl overflow-hidden mb-6">
          <Image
            src={article.thumbnail.url}
            alt={article?.thumbnail?.alt || article?.title || ""}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority={false}
          />
        </div>
      )}

      <h1 className="text-3xl font-bold mb-3">{article.title}</h1>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.description,
            image: article?.thumbnail?.url,
            datePublished: article.publishedAt,
            dateModified: article.updatedAt || article.publishedAt,
            author: author?.name
              ? {
                  "@type": "Person",
                  name: author.name,
                }
              : {
                  "@type": "Organization",
                  name: "墓じまいパートナーズ",
                },
            publisher: {
              "@type": "Organization",
              name: "墓じまいパートナーズ",
            },
          }),
        }}
      />

      <div className="text-sm text-gray-500 mb-6">
        {article.publishedAt && (
          <span>
            公開日：
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>
        )}
        {article.updatedAt && (
          <span className="ml-4">
            更新日：
            {new Date(article.updatedAt).toLocaleDateString()}
          </span>
        )}
        {article.tag?.length > 0 && (
          <span className="ml-4">
            タグ：
            {article.tag.map((t: any) => (
              <Link
                key={t.id}
                href={`/tag/${t.slug}`}
                className="ml-2 underline"
              >
                #{t.name}
              </Link>
            ))}
          </span>
        )}
      </div>

      {author && (
        <section className="mb-8 p-5 border rounded-xl bg-white">
          <div className="flex items-start gap-4">
            {author?.image?.url && (
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={author.image.url}
                  alt={author?.name || "著者"}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>
            )}

            <div className="min-w-0">
              <div className="text-sm text-gray-500 mb-1">この記事を書いた人</div>
              {author?.name && (
                <div className="text-lg font-bold leading-tight">{author.name}</div>
              )}
              {author?.role && (
                <div className="text-sm text-gray-600 mt-1">{author.role}</div>
              )}
              {author?.bio && (
                <p className="text-sm text-gray-700 leading-relaxed mt-3">
                  {author.bio}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {article.description && (
        <p className="mb-8 text-lg leading-relaxed">{article.description}</p>
      )}

      {/* 目次（TOC） */}
      {toc.length > 0 && (
        <section className="mb-10 p-5 border rounded-lg bg-gray-50">
          <div className="font-bold mb-3">目次</div>
          <ul className="space-y-2 text-sm">
            {toc.map((item) => (
              <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
                <a href={`#${item.id}`} className="underline">
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 本文（見出しにid付与済みHTML） */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* 関連記事 */}
      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-bold mb-4">関連記事</h2>

          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {related.map((r: any) => {
              const thumbUrl = r?.thumbnail?.url
              const thumbAlt = r?.thumbnail?.alt || r?.title || ""

              return (
                <li key={r.id}>
                  <Link
                    href={`/articles/${r.slug}`}
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
                        {r.title}
                      </div>

                      {r.description && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {r.description}
                        </p>
                      )}

                      <div className="text-xs text-gray-500 mt-3">
                        {r.publishedAt
                          ? new Date(r.publishedAt).toLocaleDateString()
                          : ""}
                      </div>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {tagArticles.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-bold mb-4">
            「#{article.tag[0].name}」の記事
          </h2>

          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tagArticles.map((r: any) => {
              const thumbUrl = r?.thumbnail?.url
              const thumbAlt = r?.thumbnail?.alt || r?.title || ""

              return (
                <li key={r.id}>
                  <Link
                    href={`/articles/${r.slug}`}
                    className="block border rounded-xl overflow-hidden hover:bg-gray-50 transition"
                  >
                    <div className="relative w-full aspect-[16/9] bg-gray-100 border-b">
                      {thumbUrl ? (
                        <Image
                          src={thumbUrl}
                          alt={thumbAlt}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="text-lg font-semibold leading-snug">
                        {r.title}
                      </div>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {/* CTA */}
      <section className="mt-16 p-6 border rounded-lg bg-gray-50">
        <h2 className="text-xl font-bold mb-2">墓じまい無料相談</h2>
        <p className="mb-4">
          費用や手続きの進め方など、まずは状況を整理するところから一緒にやります。
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded"
        >
          無料相談はこちら
        </Link>
      </section>
    </main>
  )
}