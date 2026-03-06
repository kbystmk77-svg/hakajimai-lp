// app/hakajimai/page.tsx

import Image from "next/image"
import Link from "next/link"
import { getArticleBySlug, getRelatedArticles, getArticlesByTag } from "@/lib/microcms"
import type { Metadata } from "next"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"

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
      <Header showNavLinks={false} />
      <main className="max-w-6xl mx-auto px-6 py-16">
        <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:underline">
            ホーム
        </Link>
        <span className="mx-2">/</span>
        <span>墓じまい完全ガイド</span>
        </nav>
      <section className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-900 mb-4">
              墓じまい完全ガイド
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-slate-900 mb-5">
              {article.title}
            </h1>

            {article.description && (
              <p className="text-base sm:text-lg leading-8 text-slate-600 mb-6">
                {article.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
              {article.publishedAt && (
                <span>
                  公開日：
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              )}
              {article.updatedAt && (
                <span>
                  更新日：
                  {new Date(article.updatedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            {article?.thumbnail?.url && (
              <div className="relative w-full aspect-[16/10] bg-slate-100 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <Image
                  src={article.thumbnail.url}
                  alt={article?.thumbnail?.alt || article?.title || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority={false}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mb-10 p-6 border border-blue-100 rounded-2xl bg-blue-50">
        <div className="font-bold mb-3 text-blue-900">
          このページでわかること
        </div>

        <ul className="list-disc ml-6 space-y-1.5 text-sm text-slate-700">
          <li>墓じまいとは何か</li>
          <li>墓じまいの基本的な流れ</li>
          <li>墓じまいにかかる費用の目安</li>
          <li>墓じまい後の供養方法</li>
        </ul>
      </section>

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

      {article.tag?.length > 0 && (
        <div className="text-sm text-slate-500 mb-6">
          <span className="mr-2">タグ：</span>
          {article.tag.map((t: any) => (
            <Link
              key={t.id}
              href={`/tag/${t.slug}`}
              className="mr-2 inline-flex items-center rounded-full border border-slate-200 px-3 py-1 hover:bg-slate-50 transition"
            >
              #{t.name}
            </Link>
          ))}
        </div>
      )}

      {author && (
        <section className="mb-8 p-5 border border-slate-200 rounded-2xl bg-white shadow-sm">
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
              <div className="text-sm text-slate-500 mb-1">このガイドを監修・執筆した人</div>
              {author?.name && (
                <div className="text-lg font-bold leading-tight text-slate-900">{author.name}</div>
              )}
              {author?.role && (
                <div className="text-sm text-slate-600 mt-1">{author.role}</div>
              )}
              {author?.bio && (
                <p className="text-sm text-slate-700 leading-7 mt-3">
                  {author.bio}
                </p>
              )}
            </div>
          </div>
        </section>
      )}


    <section className="my-12">
    <h2 className="text-2xl font-bold mb-6">
        墓じまいの基本的な流れ
    </h2>

    <div className="grid md:grid-cols-5 gap-4 text-center">
        {[
        "親族の合意",
        "お寺へ相談",
        "改葬許可申請",
        "遺骨取り出し",
        "新しい供養先へ納骨",
        ].map((step, i) => (
        <div
            key={i}
            className="border rounded-lg p-4 bg-white"
        >
            <div className="text-sm text-gray-500 mb-1">
            STEP {i + 1}
            </div>
            <div className="font-semibold">{step}</div>
        </div>
        ))}
    </div>
    </section>


    <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12">

    {/* スマホ目次 */}
    {toc.length > 0 && (
    <details className="lg:hidden mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <summary className="cursor-pointer font-bold text-slate-900">
        目次
        </summary>

        <ul className="mt-4 space-y-2.5 text-sm leading-6 text-slate-700">
        {toc.map((item) => (
            <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
            <a href={`#${item.id}`} className="hover:underline">
                {item.text}
            </a>
            </li>
        ))}
        </ul>
    </details>
    )}

    <article>
        <div
        className="max-w-none text-[17px] leading-8 text-slate-800
        [&_h1]:text-3xl
        [&_h1]:font-bold
        [&_h1]:leading-tight
        [&_h1]:mt-12
        [&_h1]:mb-6
        [&_h2]:text-2xl
        [&_h2]:font-bold
        [&_h2]:leading-tight
        [&_h2]:mt-14
        [&_h2]:mb-6
        [&_h2]:pb-3
        [&_h2]:border-b
        [&_h2]:border-slate-200
        [&_h3]:text-xl
        [&_h3]:font-semibold
        [&_h3]:leading-tight
        [&_h3]:mt-10
        [&_h3]:mb-4
        [&_h4]:text-lg
        [&_h4]:font-semibold
        [&_h4]:leading-tight
        [&_h4]:mt-8
        [&_h4]:mb-3
        [&_p]:my-6
        [&_p]:leading-8
        [&_ul]:my-6
        [&_ul]:pl-6
        [&_ul]:list-disc
        [&_ol]:my-6
        [&_ol]:pl-6
        [&_ol]:list-decimal
        [&_li]:my-2
        [&_li]:leading-8
        [&_a]:text-blue-600
        [&_a]:underline-offset-4
        hover:[&_a]:underline
        [&_strong]:font-semibold
        [&_strong]:text-slate-900
        [&_em]:italic
        [&_blockquote]:my-8
        [&_blockquote]:rounded-r-2xl
        [&_blockquote]:border-l-4
        [&_blockquote]:border-blue-300
        [&_blockquote]:bg-blue-50
        [&_blockquote]:px-5
        [&_blockquote]:py-4
        [&_blockquote]:text-slate-700
        [&_blockquote_p]:my-0
        [&_hr]:my-10
        [&_hr]:border-0
        [&_hr]:border-t
        [&_hr]:border-slate-200
        [&_figure]:my-8
        [&_figure]:mx-0
        [&_figcaption]:mt-3
        [&_figcaption]:text-sm
        [&_figcaption]:leading-6
        [&_figcaption]:text-slate-500
        [&_img]:my-8
        [&_img]:rounded-2xl
        [&_img]:border
        [&_img]:border-slate-200
        [&_img]:shadow-sm
        [&_table]:my-8
        [&_table]:w-full
        [&_table]:border-collapse
        [&_table]:overflow-hidden
        [&_table]:rounded-2xl
        [&_table]:border
        [&_table]:border-slate-200
        [&_thead]:bg-slate-50
        [&_tr]:border-b
        [&_tr]:border-slate-200
        [&_th]:px-4
        [&_th]:py-3
        [&_th]:text-left
        [&_th]:text-sm
        [&_th]:font-semibold
        [&_th]:text-slate-900
        [&_td]:px-4
        [&_td]:py-3
        [&_td]:text-sm
        [&_td]:leading-7
        [&_pre]:my-8
        [&_pre]:overflow-x-auto
        [&_pre]:rounded-2xl
        [&_pre]:bg-slate-900
        [&_pre]:px-5
        [&_pre]:py-4
        [&_pre]:text-sm
        [&_pre]:leading-7
        [&_pre]:text-slate-100
        [&_pre_code]:bg-transparent
        [&_pre_code]:p-0
        [&_pre_code]:text-inherit
        [&_code]:rounded
        [&_code]:bg-slate-100
        [&_code]:px-1.5
        [&_code]:py-0.5
        [&_code]:text-[0.95em]
        [&_code]:text-slate-800
        [&_iframe]:my-8
        [&_iframe]:w-full
        [&_iframe]:rounded-2xl"
        dangerouslySetInnerHTML={{ __html: html }}
        />
    </article>

    {toc.length > 0 && (
        <aside className="hidden lg:block">
        <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="font-bold mb-3">目次</div>

            <ul className="space-y-2 text-sm">
            {toc.map((item) => (
                <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
                <a href={`#${item.id}`} className="hover:underline">
                    {item.text}
                </a>
                </li>
            ))}
            </ul>
        </div>
        </aside>
    )}

    </div>

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

      <section className="mt-16 p-8 border rounded-xl bg-blue-50">
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
      <Footer />
    </div>
  )
}
