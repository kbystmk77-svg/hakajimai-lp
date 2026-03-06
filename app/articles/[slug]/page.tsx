// app/articles/[slug]/page.tsx

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getArticleBySlug, getRelatedArticles, getArticlesByTag } from "@/lib/microcms"
import type { Metadata } from "next"
import { SimpleHeader } from "@/components/sections/simple-header"
import { Footer } from "@/components/sections/footer"
import { GuideCta } from "@/components/guide/guide-cta"
import { Calendar, RefreshCw } from "lucide-react"

type PageProps = {
  params: Promise<{ slug: string }>
}

function slugify(text: string) {
  // HTMLタグを除去し、トリムして、そのまま使用（日本語対応）
  return text
    .replace(/<\/?[^>]+>/g, "")
    .trim()
    .replace(/\s+/g, "-")
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

      const base = slugify(text) || "section"
      const n = (used.get(base) ?? 0) + 1
      used.set(base, n)
      const id = n === 1 ? base : `${base}-${n}`

      toc.push({ id, text, level })

      const cleanedAttrs = attrs.replace(/\sid\s*=\s*(['"]).*?\1/gi, "")

      return `<h${level}${cleanedAttrs} id="${id}">${inner}</h${level}>`
    }
  )

  return { toc, html: out }
}

function normalizeAuthor(author: any) {
  if (!author) return null
  if (Array.isArray(author)) return author[0] ?? null
  return author
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}年${month}月${day}日`
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
    <div className="min-h-screen bg-background">
      <SimpleHeader />

      {/* Hero Section */}
      <section className="relative bg-muted/40 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Text Content */}
            <div className="flex-1">
              {/* Category Badge */}
              {article.category?.name && (
                <Link
                  href={`/category/${article.category.slug}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4 hover:bg-primary/20 transition-colors"
                >
                  {article.category.name}
                </Link>
              )}

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight text-balance">
                {article.title}
              </h1>

              {/* Description */}
              {article.description && (
                <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                  {article.description}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-muted-foreground">
                {article.publishedAt && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>公開：{formatDate(article.publishedAt)}</span>
                  </div>
                )}
                {article.updatedAt && (
                  <div className="flex items-center gap-1.5">
                    <RefreshCw className="h-4 w-4" />
                    <span>更新：{formatDate(article.updatedAt)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail */}
            {article?.thumbnail?.url && (
              <div className="w-full lg:w-80 shrink-0">
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-border shadow-sm">
                  <Image
                    src={article.thumbnail.url}
                    alt={article?.thumbnail?.alt || article?.title || ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 320px"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="relative">
        {/* Breadcrumb */}
        <div className="bg-background border-b border-border">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 py-3">
            <nav className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                ホーム
              </Link>
              {article.category?.slug && (
                <>
                  <span className="mx-2">/</span>
                  <Link
                    href={`/category/${article.category.slug}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {article.category.name}
                  </Link>
                </>
              )}
              <span className="mx-2">/</span>
              <span className="text-foreground font-medium line-clamp-1">{article.title}</span>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 lg:py-12">
          {/* Tags */}
          {article.tag?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-sm text-muted-foreground">タグ：</span>
              {article.tag.map((t: any) => (
                <Link
                  key={t.id}
                  href={`/tag/${t.slug}`}
                  className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  #{t.name}
                </Link>
              ))}
            </div>
          )}

          {/* Author Box */}
          {author && (
            <section className="mb-10 rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
              <div className="flex items-start gap-4">
                {author?.image?.url && (
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-primary/20 bg-muted">
                    <Image
                      src={author.image.url}
                      alt={author?.name || "著者"}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-medium text-primary mb-1">
                    この記事を書いた人
                  </div>
                  {author?.name && (
                    <div className="text-lg font-bold text-foreground">{author.name}</div>
                  )}
                  {author?.role && (
                    <div className="text-sm text-muted-foreground mt-0.5">{author.role}</div>
                  )}
                  {author?.bio && (
                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                      {author.bio}
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* TOC */}
          {toc.length > 0 && (
            <section className="mb-10 rounded-xl border border-border bg-muted/30 p-5 sm:p-6">
              <div className="flex items-center gap-2 font-bold text-foreground mb-4">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                目次
              </div>
              <ul className="space-y-2 text-sm">
                {toc.map((item) => (
                  <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
                    <a
                      href={`#${item.id}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Article Body */}
          <article className="article-content">
            <div
              className="prose-guide"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </article>

          {/* Mid-article CTA */}
          <GuideCta variant="inline" />

          {/* Related Articles */}
          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                関連記事
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r: any) => (
                  <li key={r.id}>
                    <Link
                      href={`/articles/${r.slug}`}
                      className="group block overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md hover:border-primary/30"
                    >
                      <div className="relative aspect-[16/9] bg-muted">
                        {r?.thumbnail?.url ? (
                          <Image
                            src={r.thumbnail.url}
                            alt={r?.thumbnail?.alt || r?.title || ""}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {r.title}
                        </div>
                        {r.publishedAt && (
                          <div className="text-xs text-muted-foreground mt-2">
                            {formatDate(r.publishedAt)}
                          </div>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Tag Articles */}
          {tagArticles.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                「#{article.tag[0].name}」の記事
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tagArticles.map((r: any) => (
                  <li key={r.id}>
                    <Link
                      href={`/articles/${r.slug}`}
                      className="group block overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-md hover:border-primary/30"
                    >
                      <div className="relative aspect-[16/9] bg-muted">
                        {r?.thumbnail?.url ? (
                          <Image
                            src={r.thumbnail.url}
                            alt={r?.thumbnail?.alt || r?.title || ""}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                          {r.title}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Bottom CTA */}
        <GuideCta variant="full" />
      </main>

      {/* Structured Data */}
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
              ? { "@type": "Person", name: author.name }
              : { "@type": "Organization", name: "墓じまいパートナーズ" },
            publisher: { "@type": "Organization", name: "墓じまいパートナーズ" },
          }),
        }}
      />

      <Footer />
    </div>
  )
}
