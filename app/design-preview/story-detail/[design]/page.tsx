// app/design-preview/story-detail/[design]/page.tsx
// 体験談詳細ページ ヒーローデザイン別プレビュー

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getStoryBySlug } from "@/lib/stories"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import {
  MapPin,
  User,
  ChevronLeft,
  ChevronRight,
  Building2,
  ArrowRight,
  Wallet,
  MessageSquare,
  Users,
  Phone,
  Heart,
  Lightbulb,
  AlertCircle,
  Quote,
} from "lucide-react"

interface PageProps {
  params: Promise<{ design: string }>
}

const DESIGNS = [
  { id: "1", name: "案1: ボトムグラデーション" },
  { id: "2", name: "案2: ミニマル大見出し" },
  { id: "3", name: "案3: アクセントライン" },
  { id: "4", name: "案4: ラベル＋情報バー" },
  { id: "5", name: "案5: アクセントライン（属性＋霊園情報）" },
]

export function generateStaticParams() {
  return DESIGNS.map((d) => ({ design: d.id }))
}

// ── ヒーローデザイン ──────────────────────────────────────────

type S = ReturnType<typeof getStoryBySlug> & {}

// 共通: 写真注記ラベル
function PhotoNote() {
  return (
    <span className="absolute top-4 right-4 z-10 text-white/60 text-xs">
      ※写真はイメージです
    </span>
  )
}

// 共通: コンテナラッパー
function HeroContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">{children}</div>
    </div>
  )
}

// 案1: ボトムグラデーション（ベース）
function HeroDesign1({ story }: { story: S }) {
  return (
    <div className="relative w-full h-[320px] md:h-[420px] lg:h-[500px] overflow-hidden">
      <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" priority />
      <PhotoNote />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 pb-10 pt-6">
        <HeroContainer>
          <p className="text-white/50 text-xs mb-2 tracking-wide">墓じまい体験談</p>
          <h1 className="text-white text-3xl md:text-4xl font-bold mb-4 leading-tight">
            子供たちに、お墓の心配は<br />させたくなかった。
          </h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {story.reasons.map((r) => (
              <span key={r} className="bg-white/20 text-white rounded-full text-xs px-3 py-1 backdrop-blur-sm">{r}</span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{story.graveLocation}<ArrowRight className="w-3 h-3 inline mx-1 opacity-60" />{story.destination}</span>
          </div>
        </HeroContainer>
      </div>
    </div>
  )
}

// 案2: ミニマル大見出し（案1ベース・タグなし・文字大きめ）
function HeroDesign2({ story }: { story: S }) {
  return (
    <div className="relative w-full h-[320px] md:h-[420px] lg:h-[500px] overflow-hidden">
      <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" priority />
      <PhotoNote />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 pb-10 pt-6">
        <HeroContainer>
          <span className="inline-block bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
            {story.age} · {story.gender} · {story.address}在住
          </span>
          <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight mb-5">
            子供たちに、<br />お墓の心配は<br />させたくなかった。
          </h1>
          <div className="flex items-center gap-2 text-white/70 text-sm">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{story.graveLocation}<ArrowRight className="w-3 h-3 inline mx-1 opacity-60" />{story.destination}</span>
          </div>
        </HeroContainer>
      </div>
    </div>
  )
}

// 案3: アクセントライン（案1ベース・左ボーダー強調）
function HeroDesign3({ story }: { story: S }) {
  return (
    <div className="relative w-full h-[320px] md:h-[420px] lg:h-[500px] overflow-hidden">
      <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" priority />
      <PhotoNote />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 pb-10 pt-6">
        <HeroContainer>
          <div className="border-l-4 border-amber-400 pl-5">
            <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">STORY 01</p>
            <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-4">
              子供たちに、お墓の心配は<br />させたくなかった。
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {story.reasons.map((r) => (
                <span key={r} className="bg-white/20 text-white rounded-full text-xs px-3 py-1 backdrop-blur-sm">{r}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{story.graveLocation}<ArrowRight className="w-3 h-3 inline mx-1 opacity-60" />{story.destination}</span>
            </div>
          </div>
        </HeroContainer>
      </div>
    </div>
  )
}

// 案4: ラベル＋情報バー（案1ベース・上部にラベル・下部に要点行）
function HeroDesign4({ story }: { story: S }) {
  return (
    <div className="relative w-full h-[320px] md:h-[420px] lg:h-[500px] overflow-hidden">
      <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" priority />
      <PhotoNote />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/40" />
      {/* Top label */}
      <div className="absolute top-0 left-0 right-0 pt-6">
        <HeroContainer>
          <span className="text-white/60 text-xs tracking-widest uppercase">墓じまい体験談 — No.01</span>
        </HeroContainer>
      </div>
      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 pb-10">
        <HeroContainer>
          <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-5">
            子供たちに、お墓の心配は<br />させたくなかった。
          </h1>
          {/* Info bar */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur rounded-full px-4 py-1.5 text-white text-xs">
              <MapPin className="w-3.5 h-3.5" />
              <span>{story.graveLocation}<ArrowRight className="w-3 h-3 inline mx-1 opacity-70" />{story.destination}</span>
            </div>
            {story.reasons.map((r) => (
              <span key={r} className="bg-white/10 backdrop-blur text-white/90 rounded-full text-xs px-3 py-1.5 border border-white/20">{r}</span>
            ))}
          </div>
        </HeroContainer>
      </div>
    </div>
  )
}

// 案5: アクセントライン（属性表示＋霊園情報付き）
function HeroDesign5({ story }: { story: S }) {
  return (
    <div className="relative w-full h-[320px] md:h-[420px] lg:h-[500px] overflow-hidden">
      <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" priority />
      <PhotoNote />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 pb-10 pt-6">
        <HeroContainer>
          <div className="border-l-4 border-amber-400 pl-5">
            <p className="text-amber-400 text-xs font-bold tracking-wide mb-3">
              {story.age} · {story.gender} · {story.address}在住
            </p>
            <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-4">
              子供たちに、お墓の心配は<br />させたくなかった。
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {story.reasons.map((r) => (
                <span key={r} className="bg-white/20 text-white rounded-full text-xs px-3 py-1 backdrop-blur-sm">{r}</span>
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
        </HeroContainer>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────

export default async function StoryDetailPreviewPage({ params }: PageProps) {
  const { design } = await params
  const story = getStoryBySlug("story-01")
  const designInfo = DESIGNS.find((d) => d.id === design)

  if (!story || !designInfo) notFound()

  const currentIdx = DESIGNS.findIndex((d) => d.id === design)
  const prevDesign = currentIdx > 0 ? DESIGNS[currentIdx - 1] : null
  const nextDesign = currentIdx < DESIGNS.length - 1 ? DESIGNS[currentIdx + 1] : null

  return (
    <>
      <Header />

      {/* Preview indicator bar */}
      <div className="sticky top-0 z-50 bg-amber-50 border-b border-amber-200 py-2 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Link
              href="/design-preview/story-designs"
              className="flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 font-medium"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              案一覧に戻る
            </Link>
            <span className="text-amber-300">|</span>
            <span className="text-xs font-bold text-amber-800">
              案 {design}：{designInfo.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {prevDesign && (
              <Link
                href={`/design-preview/story-detail/${prevDesign.id}`}
                className="text-xs text-amber-700 hover:text-amber-900 flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                案 {prevDesign.id}
              </Link>
            )}
            <div className="flex gap-1">
              {DESIGNS.map((d) => (
                <Link
                  key={d.id}
                  href={`/design-preview/story-detail/${d.id}`}
                  className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold transition-colors ${
                    d.id === design
                      ? "bg-amber-600 text-white"
                      : "bg-amber-100 text-amber-600 hover:bg-amber-200"
                  }`}
                >
                  {d.id}
                </Link>
              ))}
            </div>
            {nextDesign && (
              <Link
                href={`/design-preview/story-detail/${nextDesign.id}`}
                className="text-xs text-amber-700 hover:text-amber-900 flex items-center gap-1"
              >
                案 {nextDesign.id}
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <main className="bg-linen min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">ホーム</Link>
              <span>/</span>
              <Link href="/stories" className="hover:text-primary">体験談一覧</Link>
              <span>/</span>
              <span className="text-foreground">体験談 {story.id}</span>
            </nav>
          </div>
        </div>

        {/* Hero — design variant */}
        {design === "1" && <HeroDesign1 story={story} />}
        {design === "2" && <HeroDesign2 story={story} />}
        {design === "3" && <HeroDesign3 story={story} />}
        {design === "4" && <HeroDesign4 story={story} />}
        {design === "5" && <HeroDesign5 story={story} />}

        {/* Story Content */}
        <article className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Header Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white text-2xl font-bold">
                    {story.id}
                  </span>
                  <div>
                    <p className="text-xl font-bold text-foreground">体験談 {story.id}</p>
                    <p className="text-muted-foreground">{story.age} {story.gender}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg mb-6">
                  <User className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">お住まい</p>
                    <p className="font-medium text-foreground">{story.address}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-xs text-muted-foreground mb-3">改葬の流れ</p>
                  <div className="flex flex-col md:flex-row items-stretch gap-4">
                    <div className="flex-1 p-5 bg-secondary/50 rounded-lg border-2 border-secondary">
                      <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />元のお墓
                      </p>
                      <p className="text-lg font-bold text-foreground">{story.graveLocation}</p>
                      <p className="text-sm text-muted-foreground mt-1">{story.cemeteryType}</p>
                    </div>
                    <div className="flex items-center justify-center md:py-0 py-2">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">
                        <ArrowRight className="w-5 h-5 md:rotate-0 rotate-90" />
                      </div>
                    </div>
                    <div className="flex-1 p-5 bg-primary/10 rounded-lg border-2 border-primary/30">
                      <p className="text-xs text-primary mb-2 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />移転先
                      </p>
                      <p className="text-lg font-bold text-foreground">{story.destination}</p>
                      <p className="text-sm text-primary font-medium mt-1">{story.destinationType}</p>
                      <p className="text-xs text-muted-foreground mt-2">費用: {story.destinationCost}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">墓じまいを検討した理由</p>
                  <div className="flex flex-wrap gap-2">
                    {story.reasons.map((reason, index) => (
                      <span key={index} className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-lg text-sm">
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />墓じまいを考え始めたきっかけ
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">{story.triggerEpisode}</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />親族との話し合い
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">{story.familyDiscussion}</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />お寺・霊園への連絡
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">{story.templeReaction}</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-primary" />費用・手続きについて
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { label: "離檀料", value: story.ridanFee },
                    { label: "お布施", value: story.ofuse },
                    { label: "石材店費用", value: story.stoneShopCost },
                    { label: "見積件数", value: story.estimateCount },
                    { label: "行政手続", value: story.paperwork },
                    { label: "期間", value: story.duration },
                  ].map((item) => (
                    <div key={item.label} className="p-4 bg-secondary/30 rounded-lg text-center">
                      <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />一番大変だったこと
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">{story.hardestPart}</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />墓じまいを終えて良かった点
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">{story.goodPoints}</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />もしやり直すなら変えたいこと
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">{story.ifRedoAgain}</p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-4">
                <Link
                  href="/stories"
                  className="px-4 py-3 bg-white rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow text-sm text-muted-foreground"
                >
                  一覧に戻る
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">墓じまいについてお悩みですか？</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              墓じまいパートナーズでは、専門スタッフが無料でご相談を承っております。お気軽にお問い合わせください。
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              無料相談はこちら
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
