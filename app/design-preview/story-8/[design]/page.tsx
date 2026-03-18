// app/design-preview/story-8/[design]/page.tsx
// 案8 プルクォート型 — バリエーション別フルページプレビュー

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { getStoryBySlug } from "@/lib/stories"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import {
  MapPin,
  ArrowRight,
  MessageSquare,
  Users,
  Phone,
  Wallet,
  AlertCircle,
  Heart,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

// ── 型・定数 ─────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ design: string }>
}

const DESIGNS = [
  { id: "1", name: "バリエーション1: 現行ベース" },
  { id: "2", name: "バリエーション2: 装飾クォートマーク" },
  { id: "3", name: "バリエーション3: ハイライトブロック" },
  { id: "4", name: "バリエーション4: 左ナンバー＋引用" },
  { id: "5", name: "バリエーション5: 交互背景帯" },
]

export function generateStaticParams() {
  return DESIGNS.map((d) => ({ design: d.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { design } = await params
  const info = DESIGNS.find((d) => d.id === design)
  return {
    title: info ? `案8 ${info.name} | プレビュー` : "案8 プレビュー",
  }
}

// ── 型エイリアス ──────────────────────────────────────────────
type S = NonNullable<ReturnType<typeof getStoryBySlug>>

// ── ユーティリティ ────────────────────────────────────────────
const firstSentence = (text: string) => {
  const i = text.indexOf("。")
  return i !== -1 ? text.slice(0, i + 1) : text
}
const restSentences = (text: string) => {
  const i = text.indexOf("。")
  return i !== -1 ? text.slice(i + 1).trimStart() : ""
}

// ── 費用グリッド（共通） ──────────────────────────────────────
function CostGrid({ story }: { story: S }) {
  const items = [
    { label: "離檀料",    value: story.ridanFee },
    { label: "お布施",    value: story.ofuse },
    { label: "石材店費用", value: story.stoneShopCost },
    { label: "見積件数",  value: story.estimateCount },
    { label: "行政手続",  value: story.paperwork },
    { label: "期間",      value: story.duration },
  ]
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map((item) => (
        <div key={item.label} className="p-3 bg-secondary/30 rounded-lg text-center">
          <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
          <p className="font-semibold text-foreground text-sm">{item.value}</p>
        </div>
      ))}
    </div>
  )
}

// ── フルヒーロー（案5スタイル） ───────────────────────────────
function FullHero({ story }: { story: S }) {
  return (
    <div className="relative w-full h-[320px] md:h-[420px] lg:h-[500px] overflow-hidden">
      <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" priority />
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
                子供たちに、お墓の心配は<br />させたくなかった。
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
  )
}

// ── バリエーション1: 現行（ベース） ──────────────────────────
function Variation1({ story }: { story: S }) {
  const sections = [
    { icon: <MessageSquare className="w-5 h-5 text-primary" />,   title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { icon: <Users className="w-5 h-5 text-primary" />,           title: "親族との話し合い",             body: story.familyDiscussion },
    { icon: <Phone className="w-5 h-5 text-primary" />,           title: "お寺・霊園への連絡",           body: story.templeReaction },
    { icon: <AlertCircle className="w-5 h-5 text-orange-500" />,  title: "一番大変だったこと",           body: story.hardestPart },
    { icon: <Heart className="w-5 h-5 text-red-500" />,           title: "墓じまいを終えて良かった点",   body: story.goodPoints },
    { icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,    title: "もしやり直すなら変えたいこと", body: story.ifRedoAgain },
  ]
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {sections.map((s, i) => (
            <div key={i} className="py-12 border-b border-gray-100">
              <h2 className="text-xs font-bold text-muted-foreground mb-5 flex items-center gap-2 uppercase tracking-wide">
                {s.icon}{s.title}
              </h2>
              <blockquote className="text-xl font-bold text-foreground leading-snug mb-6 border-l-4 border-primary pl-6">
                {firstSentence(s.body)}
              </blockquote>
              {restSentences(s.body) && (
                <p className="text-foreground/80 leading-relaxed text-sm">{restSentences(s.body)}</p>
              )}
            </div>
          ))}
          <div className="py-12 border-b border-gray-100">
            <h2 className="text-xs font-bold text-muted-foreground mb-5 flex items-center gap-2 uppercase tracking-wide">
              <Wallet className="w-5 h-5 text-primary" />費用・手続きについて
            </h2>
            <div className="bg-gray-50 rounded-2xl p-6">
              <CostGrid story={story} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── バリエーション2: 装飾クォートマーク ──────────────────────
function Variation2({ story }: { story: S }) {
  const sections = [
    { icon: <MessageSquare className="w-5 h-5 text-primary" />,   title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { icon: <Users className="w-5 h-5 text-primary" />,           title: "親族との話し合い",             body: story.familyDiscussion },
    { icon: <Phone className="w-5 h-5 text-primary" />,           title: "お寺・霊園への連絡",           body: story.templeReaction },
    { icon: <AlertCircle className="w-5 h-5 text-orange-500" />,  title: "一番大変だったこと",           body: story.hardestPart },
    { icon: <Heart className="w-5 h-5 text-red-500" />,           title: "墓じまいを終えて良かった点",   body: story.goodPoints },
    { icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,    title: "もしやり直すなら変えたいこと", body: story.ifRedoAgain },
  ]
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {sections.map((s, i) => (
            <div key={i} className="py-12 border-b border-gray-100">
              <h2 className="text-sm font-bold text-muted-foreground mb-4 flex items-center gap-2">
                {s.icon}{s.title}
              </h2>
              <span className="text-6xl text-primary/20 font-serif leading-none block mb-2 select-none">&ldquo;</span>
              <p className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-2">
                {firstSentence(s.body)}
              </p>
              <span className="text-6xl text-primary/20 font-serif leading-none text-right block mb-6 select-none">&rdquo;</span>
              {restSentences(s.body) && (
                <p className="text-sm text-foreground/80 leading-relaxed">{restSentences(s.body)}</p>
              )}
            </div>
          ))}
          <div className="py-12 border-b border-gray-100">
            <h2 className="text-sm font-bold text-muted-foreground mb-4 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />費用・手続きについて
            </h2>
            <div className="bg-gray-50 rounded-2xl p-6">
              <CostGrid story={story} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── バリエーション3: ハイライトブロック ──────────────────────
function Variation3({ story }: { story: S }) {
  const sections = [
    { icon: <MessageSquare className="w-5 h-5 text-primary" />,   title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { icon: <Users className="w-5 h-5 text-primary" />,           title: "親族との話し合い",             body: story.familyDiscussion },
    { icon: <Phone className="w-5 h-5 text-primary" />,           title: "お寺・霊園への連絡",           body: story.templeReaction },
    { icon: <AlertCircle className="w-5 h-5 text-orange-500" />,  title: "一番大変だったこと",           body: story.hardestPart },
    { icon: <Heart className="w-5 h-5 text-red-500" />,           title: "墓じまいを終えて良かった点",   body: story.goodPoints },
    { icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,    title: "もしやり直すなら変えたいこと", body: story.ifRedoAgain },
  ]
  return (
    <div className="bg-linen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {sections.map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-6 md:p-8 mb-5 shadow-sm border border-border">
              <h2 className="text-base font-bold flex items-center gap-2 mb-5">
                {s.icon}
                <span className="text-foreground">{s.title}</span>
              </h2>
              <div className="bg-primary/5 rounded-xl p-5 mb-5">
                <p className="text-xl font-bold text-foreground leading-snug">{firstSentence(s.body)}</p>
              </div>
              {restSentences(s.body) && (
                <p className="text-foreground leading-relaxed text-sm">{restSentences(s.body)}</p>
              )}
            </div>
          ))}
          <div className="bg-white rounded-xl p-6 md:p-8 mb-5 shadow-sm border border-border">
            <h2 className="text-base font-bold flex items-center gap-2 mb-5">
              <Wallet className="w-5 h-5 text-primary" />
              <span className="text-foreground">費用・手続きについて</span>
            </h2>
            <CostGrid story={story} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── バリエーション4: 左ナンバー＋引用 ────────────────────────
function Variation4({ story }: { story: S }) {
  const sections = [
    { num: "01", icon: <MessageSquare className="w-4 h-4" />, title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { num: "02", icon: <Users className="w-4 h-4" />,         title: "親族との話し合い",             body: story.familyDiscussion },
    { num: "03", icon: <Phone className="w-4 h-4" />,         title: "お寺・霊園への連絡",           body: story.templeReaction },
    { num: "04", icon: <AlertCircle className="w-4 h-4" />,   title: "一番大変だったこと",           body: story.hardestPart },
    { num: "05", icon: <Heart className="w-4 h-4" />,         title: "墓じまいを終えて良かった点",   body: story.goodPoints },
    { num: "06", icon: <Lightbulb className="w-4 h-4" />,     title: "もしやり直すなら変えたいこと", body: story.ifRedoAgain },
  ]
  return (
    <div className="bg-white">
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
          <div className="py-10 border-b border-gray-100 flex gap-0">
            <div className="w-16 shrink-0 text-right pr-4 pt-1">
              <span className="text-5xl font-black text-gray-100 leading-none">07</span>
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mb-3">
                <Wallet className="w-4 h-4" />費用・手続きについて
              </h2>
              <CostGrid story={story} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── バリエーション5: 交互背景帯 ──────────────────────────────
function Variation5({ story }: { story: S }) {
  const sections = [
    { bg: "bg-white",  icon: <MessageSquare className="w-4 h-4" />, title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { bg: "bg-linen",  icon: <Users className="w-4 h-4" />,         title: "親族との話し合い",             body: story.familyDiscussion },
    { bg: "bg-white",  icon: <Phone className="w-4 h-4" />,         title: "お寺・霊園への連絡",           body: story.templeReaction },
    { bg: "bg-linen",  icon: <AlertCircle className="w-4 h-4" />,   title: "一番大変だったこと",           body: story.hardestPart },
    { bg: "bg-white",  icon: <Heart className="w-4 h-4" />,         title: "墓じまいを終えて良かった点",   body: story.goodPoints },
    { bg: "bg-linen",  icon: <Lightbulb className="w-4 h-4" />,     title: "もしやり直すなら変えたいこと", body: story.ifRedoAgain },
  ]
  return (
    <div>
      {sections.map((s, i) => (
        <div key={i} className={`${s.bg} py-14 md:py-16`}>
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-sm font-bold text-muted-foreground flex items-center justify-center gap-2 mb-6">
                {s.icon}{s.title}
              </h2>
              <div className="w-8 h-0.5 bg-primary/30 mx-auto mb-6" />
              <p className="text-center text-2xl md:text-3xl font-bold text-foreground leading-snug mb-6 max-w-2xl mx-auto">
                {firstSentence(s.body)}
              </p>
              {restSentences(s.body) && (
                <p className="text-center text-sm text-foreground/80 leading-relaxed max-w-xl mx-auto">
                  {restSentences(s.body)}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="bg-primary/5 py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-sm font-bold text-muted-foreground flex items-center justify-center gap-2 mb-6">
              <Wallet className="w-4 h-4" />費用・手続きについて
            </h2>
            <div className="w-8 h-0.5 bg-primary/30 mx-auto mb-6" />
            <CostGrid story={story} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── ページ本体 ───────────────────────────────────────────────
export default async function Story8DesignPage({ params }: PageProps) {
  const { design } = await params
  const story = getStoryBySlug("story-01")
  const designInfo = DESIGNS.find((d) => d.id === design)

  if (!story || !designInfo) notFound()

  const currentIdx = DESIGNS.findIndex((d) => d.id === design)
  const prevDesign = currentIdx > 0 ? DESIGNS[currentIdx - 1] : null
  const nextDesign = currentIdx < DESIGNS.length - 1 ? DESIGNS[currentIdx + 1] : null

  const variationMap: Record<string, React.ComponentType<{ story: S }>> = {
    "1": Variation1,
    "2": Variation2,
    "3": Variation3,
    "4": Variation4,
    "5": Variation5,
  }
  const ContentVariation = variationMap[design]

  return (
    <>
      <Header />

      {/* Sticky amber preview bar */}
      <div className="sticky top-0 z-50 bg-amber-50 border-b border-amber-200 py-2 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Link
              href="/design-preview/story-8"
              className="flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 font-medium"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              バリエーション一覧
            </Link>
            <span className="text-amber-300">|</span>
            <span className="text-xs font-bold text-amber-800">{designInfo.name}</span>
          </div>
          <div className="flex items-center gap-2">
            {prevDesign && (
              <Link
                href={`/design-preview/story-8/${prevDesign.id}`}
                className="text-xs text-amber-700 hover:text-amber-900 flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                V{prevDesign.id}
              </Link>
            )}
            <div className="flex gap-1">
              {DESIGNS.map((d) => (
                <Link
                  key={d.id}
                  href={`/design-preview/story-8/${d.id}`}
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
                href={`/design-preview/story-8/${nextDesign.id}`}
                className="text-xs text-amber-700 hover:text-amber-900 flex items-center gap-1"
              >
                V{nextDesign.id}
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
              <span className="text-foreground">体験談{story.id}</span>
            </nav>
          </div>
        </div>

        {/* Full hero */}
        <FullHero story={story} />

        {/* Content variation */}
        {ContentVariation && <ContentVariation story={story} />}

        {/* Navigation */}
        <div className="py-10 bg-white border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto flex items-center justify-between gap-4 flex-wrap">
              <Link
                href="/design-preview/story-8"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary font-medium"
              >
                <ChevronLeft className="w-4 h-4" />
                バリエーション一覧に戻る
              </Link>
              <div className="flex gap-1">
                {DESIGNS.map((d) => (
                  <Link
                    key={d.id}
                    href={`/design-preview/story-8/${d.id}`}
                    className={`w-8 h-8 rounded-full text-xs flex items-center justify-center font-bold transition-colors ${
                      d.id === design
                        ? "bg-primary text-white"
                        : "bg-secondary text-muted-foreground hover:bg-primary/20 hover:text-primary"
                    }`}
                  >
                    {d.id}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
