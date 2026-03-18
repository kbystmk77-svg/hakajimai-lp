import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { stories, getStoryBySlug, getAllStorySlugs } from "@/lib/stories"
import { getArticles } from "@/lib/microcms"
import { SimpleHeader } from "@/components/sections/simple-header"
import { Footer } from "@/components/sections/footer"
import {
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Wallet,
  MessageSquare,
  Users,
  Phone,
  Heart,
  Lightbulb,
  AlertCircle,
  BookOpen,
  Mail,
} from "lucide-react"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllStorySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const story = getStoryBySlug(slug)

  if (!story) {
    return { title: "体験談が見つかりません" }
  }

  return {
    title: `${story.age}${story.gender}の墓じまい体験談「${story.catchphrase}」`,
    description: story.triggerEpisode.substring(0, 160),
  }
}

// ── ユーティリティ ────────────────────────────────────────────
const firstSentence = (text: string) => {
  const i = text.indexOf("。")
  return i !== -1 ? text.slice(0, i + 1) : text
}
const restSentences = (text: string) => {
  const i = text.indexOf("。")
  return i !== -1 ? text.slice(i + 1).trimStart() : ""
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { slug } = await params
  const story = getStoryBySlug(slug)

  if (!story) notFound()

  const currentIndex = stories.findIndex((s) => s.slug === slug)
  const prevStory = currentIndex > 0 ? stories[currentIndex - 1] : null
  const nextStory = currentIndex < stories.length - 1 ? stories[currentIndex + 1] : null
  const otherStories = stories.filter((s) => s.slug !== slug)

  // microCMS記事（失敗時はスキップ）
  let recommendedArticles: Array<{
    id: string
    slug: string
    title: string
    description?: string
    thumbnail?: { url: string }
    category?: { name: string }
  }> = []
  try {
    const data = await getArticles({ limit: 4, orders: "publishedAt" })
    recommendedArticles = (data?.contents ?? [])
      .filter((a: { slug: string }) => a.slug !== "hakajimai")
      .slice(0, 3)
  } catch {
    // 記事が取得できない場合はセクションを非表示
  }

  const sections = [
    { num: "01", icon: <MessageSquare className="w-4 h-4" />, title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { num: "02", icon: <Users className="w-4 h-4" />,         title: "親族との話し合い",             body: story.familyDiscussion },
    { num: "03", icon: <Phone className="w-4 h-4" />,         title: "お寺・霊園への連絡",           body: story.templeReaction },
    { num: "04", icon: <AlertCircle className="w-4 h-4" />,   title: "一番大変だったこと",           body: story.hardestPart },
    { num: "05", icon: <Heart className="w-4 h-4" />,         title: "墓じまいを終えて良かった点",   body: story.goodPoints },
    { num: "06", icon: <Lightbulb className="w-4 h-4" />,     title: "もしやり直すなら変えたいこと", body: story.ifRedoAgain },
  ]

  const costItems = [
    { label: "離檀料",     value: story.ridanFee },
    { label: "お布施",     value: story.ofuse },
    { label: "石材店費用", value: story.stoneShopCost },
    { label: "見積件数",   value: story.estimateCount },
    { label: "移転先費用", value: story.destinationCost },
    { label: "期間",       value: story.duration },
  ]

  return (
    <>
      <SimpleHeader />
      <main className="bg-linen min-h-screen">

        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground overflow-hidden">
              <Link href="/" className="hover:text-primary shrink-0 whitespace-nowrap">ホーム</Link>
              <span className="shrink-0">/</span>
              <Link href="/stories" className="hover:text-primary shrink-0 whitespace-nowrap">体験談一覧</Link>
              <span className="shrink-0">/</span>
              <span className="text-foreground min-w-0 truncate">{story.age}{story.gender}の墓じまい体験談「{story.catchphrase}」</span>
            </nav>
          </div>
        </div>

        {/* Hero — 案5スタイル */}
        {story.heroImage && (
          <div className="relative w-full h-[320px] md:h-[420px] lg:h-[500px] overflow-hidden">
            <Image
              src={story.heroImage}
              alt={`${story.age}${story.gender}の墓じまい体験談`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <span className="absolute top-4 right-4 z-10 text-white/60 text-xs">※写真はイメージです</span>
            <div className="absolute bottom-0 left-0 right-0 pb-10 pt-6">
              <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                  <div className="border-l-4 border-amber-400 pl-5">
                    <p className="text-amber-400 text-xs font-bold tracking-wide mb-3">
                      {story.age} · {story.gender} · {story.address}在住
                    </p>
                    <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3">
                      {story.catchphrase}
                    </h1>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {story.reasons.map((r) => (
                        <span key={r} className="bg-white/20 text-white rounded-full text-xs px-3 py-1">{r}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-white text-sm font-bold">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span>
                        {story.graveLocation}（{story.cemeteryType}）
                        <ArrowRight className="w-3 h-3 inline mx-1 opacity-60" />
                        {story.destination}（{story.destinationType}）
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 01〜06 — 左ナンバー＋引用スタイル */}
        <div className="bg-white pt-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {sections.map((s, i) => (
                <div key={i} className="py-10 border-b border-gray-100 flex gap-0">
                  <div className="w-16 shrink-0 text-right pr-4 pt-1">
                    <span className="text-5xl font-black text-gray-100 leading-none">{s.num}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mb-3">
                      {s.icon}{s.title}
                    </h2>
                    <blockquote className="text-xl font-bold text-foreground leading-snug mb-4 border-l-2 border-primary pl-4">
                      {firstSentence(s.body)}
                    </blockquote>
                    {restSentences(s.body) && (
                      <p className="text-sm text-foreground/80 leading-relaxed">{restSentences(s.body)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 費用・手続き — スタッツグリッド */}
        <div className="bg-linen py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-sm font-bold text-foreground flex items-center justify-center gap-2 mb-8">
                <Wallet className="w-4 h-4 text-primary" />費用・手続きについて
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {costItems.map((item) => (
                  <div key={item.label} className="bg-white rounded-xl p-5 text-center shadow-sm border border-border">
                    <p className="text-xl font-black text-primary leading-tight mb-1">{item.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mt-6">
                本ページの体験談は、当サイト（墓じまいパートナーズ）が墓じまい経験者を対象に実施したアンケート調査の回答をもとに掲載しています。<br />
                ※個人が特定されないよう一部内容の編集や、明らかな誤字・表現の修正を行っています。
              </p>
            </div>
          </div>
        </div>

        {/* 前後ナビゲーション */}
        <div className="py-8 bg-white border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto grid grid-cols-3 items-center gap-4">
              <div className="flex justify-start">
                {prevStory && (
                  <Link
                    href={`/stories/${prevStory.slug}`}
                    className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow text-sm"
                  >
                    <ChevronLeft className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">前の体験談</span>
                  </Link>
                )}
              </div>
              <div className="flex justify-center">
                <Link
                  href="/stories"
                  className="px-4 py-3 bg-white rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow text-sm text-muted-foreground"
                >
                  一覧に戻る
                </Link>
              </div>
              <div className="flex justify-end">
                {nextStory && (
                  <Link
                    href={`/stories/${nextStory.slug}`}
                    className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow text-sm"
                  >
                    <span className="text-muted-foreground">次の体験談</span>
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 他の体験談 */}
        {otherStories.length > 0 && (
          <section className="py-14 bg-linen border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-8">
                  他の体験談を読む
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {otherStories.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/stories/${s.slug}`}
                      className="group bg-white rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow"
                    >
                      {s.heroImage && (
                        <div className="relative h-36 overflow-hidden">
                          <Image src={s.heroImage} alt="" fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="text-white/70 text-xs mb-1">{s.age} · {s.gender} · {s.address}在住</p>
                            <p className="text-white text-sm font-bold leading-snug line-clamp-2">{s.catchphrase}</p>
                          </div>
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {s.reasons.map((r) => (
                            <span key={r} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{r}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>
                            {s.graveLocation}
                            <ArrowRight className="w-3 h-3 inline mx-1 opacity-50" />
                            {s.destination}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* おすすめのノウハウ記事 */}
        {recommendedArticles.length > 0 && (
          <section className="py-14 bg-white border-t border-border">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />おすすめのノウハウ記事
                  </h2>
                  <Link href="/articles" className="text-xs text-primary hover:underline font-medium flex items-center gap-1">
                    記事一覧 <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recommendedArticles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/articles/${article.slug}`}
                      className="group bg-white rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow"
                    >
                      {article.thumbnail?.url ? (
                        <div className="relative h-36 overflow-hidden bg-gray-100">
                          <Image
                            src={article.thumbnail.url}
                            alt={article.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : (
                        <div className="h-36 bg-primary/5 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-primary/30" />
                        </div>
                      )}
                      <div className="p-4">
                        {article.category && (
                          <p className="text-xs text-primary font-semibold mb-1.5">{article.category.name}</p>
                        )}
                        <p className="text-sm font-bold text-foreground leading-snug line-clamp-3 group-hover:text-primary transition-colors">
                          {article.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* LP CTA */}
        <section className="py-16 md:py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-4">墓じまいパートナーズ</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              墓じまいの悩み、相談してください
            </h2>
            <p className="text-white/80 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              自身で対応するのは難しいけど、お寺と良好な関係のまま墓じまいをしたい。<br />
              そんなご家族のお手伝いをいたします。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
              >
                サービスについて詳しく
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
              >
                <Mail className="w-4 h-4" />
                無料相談はこちら
              </Link>
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </>
  )
}
