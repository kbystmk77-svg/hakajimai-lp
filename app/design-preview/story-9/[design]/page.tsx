// app/design-preview/story-9/[design]/page.tsx
// バリエーション4ベース — 費用・手続きセクション 5案

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
  { id: "1", name: "スペーサーカード",   note: "配置を揃えたまま背景カードで区別" },
  { id: "2", name: "アンバーバンド",     note: "全幅の帯で視覚的に切り分け" },
  { id: "3", name: "ダークサマリー",     note: "ダークカードで引き締める" },
  { id: "4", name: "スタッツグリッド",   note: "数値を大きく・麻色背景で目立たせる" },
  { id: "5", name: "ストライプテーブル", note: "ラベル｜値の横並びテーブルリスト" },
]

export function generateStaticParams() {
  return DESIGNS.map((d) => ({ design: d.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { design } = await params
  const info = DESIGNS.find((d) => d.id === design)
  return {
    title: info ? `費用セクション ${info.name} | プレビュー` : "費用セクション プレビュー",
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

// ── 費用データ ────────────────────────────────────────────────
const getCostItems = (story: S) => [
  { label: "離檀料",     value: story.ridanFee },
  { label: "お布施",     value: story.ofuse },
  { label: "石材店費用", value: story.stoneShopCost },
  { label: "見積件数",   value: story.estimateCount },
  { label: "行政手続",   value: story.paperwork },
  { label: "期間",       value: story.duration },
]

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

// ── 01〜06 共通ナンバードセクション ──────────────────────────
function NumberedSections({ story }: { story: S }) {
  const sections = [
    { num: "01", icon: <MessageSquare className="w-4 h-4" />, title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { num: "02", icon: <Users className="w-4 h-4" />,         title: "親族との話し合い",             body: story.familyDiscussion },
    { num: "03", icon: <Phone className="w-4 h-4" />,         title: "お寺・霊園への連絡",           body: story.templeReaction },
    { num: "04", icon: <AlertCircle className="w-4 h-4" />,   title: "一番大変だったこと",           body: story.hardestPart },
    { num: "05", icon: <Heart className="w-4 h-4" />,         title: "墓じまいを終えて良かった点",   body: story.goodPoints },
    { num: "06", icon: <Lightbulb className="w-4 h-4" />,     title: "もしやり直すなら変えたいこと", body: story.ifRedoAgain },
  ]
  return (
    <>
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
    </>
  )
}

// ── 費用セクション 案1: スペーサーカード ─────────────────────
// 01-06と同じ左スペーサー配置を保ちつつ、bg-primary/5 のカードで囲む
function CostSection1({ story }: { story: S }) {
  return (
    <div className="py-10 border-b border-gray-100 flex gap-0">
      <div className="w-16 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="bg-primary/5 rounded-2xl p-6">
          <h2 className="text-sm font-bold text-foreground flex items-center gap-2 mb-5">
            <Wallet className="w-4 h-4 text-primary" />費用・手続きについて
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {getCostItems(story).map((item) => (
              <div key={item.label} className="p-3 bg-white rounded-lg text-center shadow-sm">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 費用セクション 案2: アンバーバンド ───────────────────────
// 全幅のアンバー帯でページリズムを切る
function CostSection2({ story }: { story: S }) {
  return (
    <div className="bg-amber-50 border-y border-amber-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-base font-bold text-amber-900 flex items-center gap-2 mb-6">
            <Wallet className="w-5 h-5 text-amber-700" />費用・手続きについて
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {getCostItems(story).map((item) => (
              <div key={item.label} className="p-3 bg-white rounded-xl text-center shadow-sm border border-amber-100">
                <p className="text-xs text-amber-700/70 mb-1">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 費用セクション 案3: ダークサマリー ──────────────────────
// ダーク背景カードで締めくくりの重みを出す
function CostSection3({ story }: { story: S }) {
  return (
    <div className="py-10 border-b border-gray-100">
      <div className="bg-gray-900 rounded-2xl p-8">
        <h2 className="text-xs font-bold text-white/50 flex items-center gap-2 mb-6 uppercase tracking-widest">
          <Wallet className="w-4 h-4" />費用・手続きについて
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {getCostItems(story).map((item) => (
            <div key={item.label} className="p-3 bg-white/10 rounded-xl text-center">
              <p className="text-xs text-white/50 mb-1">{item.label}</p>
              <p className="font-semibold text-white text-sm">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── 費用セクション 案4: スタッツグリッド ────────────────────
// 数値を大きく見せるスタッツ型、麻色背景で帯として分離
function CostSection4({ story }: { story: S }) {
  return (
    <div className="bg-linen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xs font-bold text-muted-foreground flex items-center gap-2 mb-8 uppercase tracking-widest">
            <Wallet className="w-4 h-4 text-primary" />費用・手続きについて
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {getCostItems(story).map((item) => (
              <div key={item.label} className="bg-white rounded-xl p-5 text-center shadow-sm border border-border">
                <p className="text-xl font-black text-primary leading-tight mb-1">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 費用セクション 案5: ストライプテーブル ───────────────────
// ラベル｜値の横並びテーブルリスト、左スペーサーで01-06と揃える
function CostSection5({ story }: { story: S }) {
  return (
    <div className="py-10 border-b border-gray-100 flex gap-0">
      <div className="w-16 shrink-0" />
      <div className="flex-1 min-w-0">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mb-5">
          <Wallet className="w-4 h-4" />費用・手続きについて
        </h2>
        <div className="rounded-xl overflow-hidden border border-border">
          {getCostItems(story).map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center justify-between px-5 py-3.5 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span className="text-sm font-semibold text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── バリエーション コンポーネント ─────────────────────────────

function Variation1({ story }: { story: S }) {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <NumberedSections story={story} />
          <CostSection1 story={story} />
        </div>
      </div>
    </div>
  )
}

function Variation2({ story }: { story: S }) {
  return (
    <>
      <div className="bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <NumberedSections story={story} />
          </div>
        </div>
      </div>
      <CostSection2 story={story} />
    </>
  )
}

function Variation3({ story }: { story: S }) {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <NumberedSections story={story} />
          <CostSection3 story={story} />
        </div>
      </div>
    </div>
  )
}

function Variation4({ story }: { story: S }) {
  return (
    <>
      <div className="bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <NumberedSections story={story} />
          </div>
        </div>
      </div>
      <CostSection4 story={story} />
    </>
  )
}

function Variation5({ story }: { story: S }) {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <NumberedSections story={story} />
          <CostSection5 story={story} />
        </div>
      </div>
    </div>
  )
}

// ── ページ本体 ───────────────────────────────────────────────
export default async function Story9DesignPage({ params }: PageProps) {
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
              href="/design-preview/story-9"
              className="flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 font-medium"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              比較一覧
            </Link>
            <span className="text-amber-300">|</span>
            <span className="text-xs font-bold text-amber-800">{designInfo.name}</span>
            <span className="text-xs text-amber-600">— {designInfo.note}</span>
          </div>
          <div className="flex items-center gap-2">
            {prevDesign && (
              <Link
                href={`/design-preview/story-9/${prevDesign.id}`}
                className="text-xs text-amber-700 hover:text-amber-900 flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                前
              </Link>
            )}
            <div className="flex gap-1">
              {DESIGNS.map((d) => (
                <Link
                  key={d.id}
                  href={`/design-preview/story-9/${d.id}`}
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
                href={`/design-preview/story-9/${nextDesign.id}`}
                className="text-xs text-amber-700 hover:text-amber-900 flex items-center gap-1"
              >
                次
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

        {/* Bottom navigation */}
        <div className="py-10 bg-white border-t border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto flex items-center justify-between gap-4 flex-wrap">
              <Link
                href="/design-preview/story-9"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary font-medium"
              >
                <ChevronLeft className="w-4 h-4" />
                比較一覧に戻る
              </Link>
              <div className="flex gap-1">
                {DESIGNS.map((d) => (
                  <Link
                    key={d.id}
                    href={`/design-preview/story-9/${d.id}`}
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
