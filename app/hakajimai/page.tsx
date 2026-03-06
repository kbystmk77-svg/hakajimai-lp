// app/hakajimai/page.tsx

import Image from "next/image"
import Link from "next/link"
import { getArticleBySlug, getRelatedArticles, getArticlesByTag } from "@/lib/microcms"
import type { Metadata } from "next"
import { SimpleHeader } from "@/components/sections/simple-header"
import { Footer } from "@/components/sections/footer"
import { TableOfContents } from "@/components/guide/table-of-contents"
import { GuideHero } from "@/components/guide/guide-hero"
import { GuideCta } from "@/components/guide/guide-cta"

function slugify(text: string) {
  // HTMLタグを除去し、トリムして、そのまま使用（日本語対応）
  return text
    .replace(/<\/?[^>]+>/g, "")
    .trim()
    .replace(/\s+/g, "-")  // スペースをハイフンに
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

export async function generateMetadata(): Promise<Metadata> {
  const article = await getArticleBySlug("hakajimai")

  const title = `${article.title} | 墓じまいパートナーズ`
  const description =
    article.description || "墓じまいの手続き・費用・供養方法などをわかりやすく解説します。"
  const imageUrl = article?.thumbnail?.url

  return {
    title,
    description,
    alternates: {
      canonical: "/hakajimai",
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: "/hakajimai",
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function HakajimaiPage() {
  const article = await getArticleBySlug("hakajimai")
  const author = normalizeAuthor(article.author)

  const { toc, html } = buildTocAndHtml(article.body || "")

  const related =
    article?.category?.id
      ? await getRelatedArticles({
        categoryId: article.category.id,
        excludeId: article.id,
        limit: 3,
      })
      : []

  const tagArticles =
    article?.tag?.length > 0
      ? (await getArticlesByTag(article.tag[0].slug)).contents
        .filter((a: any) => a.id !== article.id)
        .slice(0, 3)
      : []

  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />

      {/* Hero Section */}
      <GuideHero
        title={article.title}
        description={article.description}
        thumbnailUrl={article?.thumbnail?.url}
        thumbnailAlt={article?.thumbnail?.alt || article?.title || ""}
        publishedAt={article.publishedAt}
        updatedAt={article.updatedAt}
      />

      <main className="relative">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3">
            <nav className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                ホーム
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground font-medium">墓じまい完全ガイド</span>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Article Content */}
            <div className="flex-1 min-w-0">
              {/* What you'll learn box */}
              <section className="mb-10 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-foreground">このガイドでわかること</h2>
                </div>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  {[
                    "墓じまいとは何か",
                    "墓じまいの基本的な流れ",
                    "墓じまいにかかる費用の目安",
                    "墓じまい後の供養方法",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg className="h-5 w-5 text-cta shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Mobile TOC */}
              <div className="lg:hidden mb-8">
                <TableOfContents toc={toc} />
              </div>

              {/* Flow Steps */}
              <section className="mb-12">
                <h2 className="text-xl sm:text-2xl font-bold mb-6">
                  墓じまいの基本ステップ
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { step: "親族の合意" },
                    { step: "お寺への相談" },
                    { step: "新たな供養先の決定" },
                    { step: "石材店に見積・契約" },
                    { step: "行政手続" },
                    { step: "閉眼供養" },
                    { step: "遺骨の取出し・墓石の撤去" },
                    { step: "新しい供養先に納骨" },
                  ].map((item, i) => (
                    <div key={i} className="relative">
                      <div className="flex flex-col items-center rounded-xl border border-border bg-card p-3 sm:p-4 text-center transition-shadow hover:shadow-md h-full">
                        {/* Placeholder Image */}
                        <div className="w-full aspect-[4/3] rounded-lg bg-muted mb-3 flex items-center justify-center overflow-hidden">
                          <Image
                            src="/placeholder.svg?height=120&width=160"
                            alt={item.step}
                            width={160}
                            height={120}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="text-xs text-primary font-semibold mb-1">
                          STEP {i + 1}
                        </div>
                        <div className="text-sm font-semibold text-foreground leading-tight">
                          {item.step}
                        </div>
                      </div>
                      {/* Arrow for desktop - show after every item except last and every 4th */}
                      {i < 7 && i !== 3 && (
                        <div className="hidden sm:block absolute top-1/2 -right-2 transform -translate-y-1/2 text-muted-foreground z-10">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

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
                        このガイドを監修・執筆した人
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

              {/* Article Body */}
              <article className="guide-content">
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
                                {new Date(r.publishedAt).toLocaleDateString()}
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

            {/* Desktop Sidebar TOC */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24">
                <TableOfContents toc={toc} />

                {/* Sidebar CTA */}
                <GuideCta variant="sidebar" />
              </div>
            </aside>
          </div>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "墓じまいとは何ですか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "墓じまいとは、現在あるお墓を整理し、遺骨を別の場所へ移して供養することを指します。",
                },
              },
              {
                "@type": "Question",
                name: "墓じまいの費用はいくらくらいですか？",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "墓石撤去費用や供養費用などを含め、一般的には20万円〜50万円程度になるケースが多いです。",
                },
              },
            ],
          }),
        }}
      />

      <Footer />
    </div>
  )
}
