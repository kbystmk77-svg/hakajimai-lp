// app/design-preview/story-8/page.tsx
// 案8 プルクォート型 — バリエーション比較（全5案）

import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { getStoryBySlug } from "@/lib/stories"
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
} from "lucide-react"

export const metadata: Metadata = {
  title: "案8 バリエーション比較 | プレビュー",
}

const DESIGNS = [
  { id: "1", name: "現行（ベース）",       note: "左ボーダーブロックquote・シンプル白背景" },
  { id: "2", name: "装飾クォートマーク",   note: "大型クォート記号で視覚的フレーミング" },
  { id: "3", name: "ハイライトブロック",   note: "引用をtintedブロックで包む・麻色背景" },
  { id: "4", name: "左ナンバー＋引用",     note: "大型通し番号＋左ボーダー引用" },
  { id: "5", name: "交互背景帯",           note: "全幅帯・中央寄せ・交互背景色" },
]

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
    { label: "離檀料",   value: story.ridanFee },
    { label: "お布施",   value: story.ofuse },
    { label: "石材店費用", value: story.stoneShopCost },
    { label: "見積件数", value: story.estimateCount },
    { label: "行政手続", value: story.paperwork },
    { label: "期間",     value: story.duration },
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

// ── コンパクトヒーロー（案5スタイル h-[260px]） ───────────────
function CompactHero({ story }: { story: S }) {
  return (
    <div className="relative w-full h-[260px] overflow-hidden">
      <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <span className="absolute top-4 right-4 z-10 text-white/60 text-xs">※写真はイメージです</span>
      <div className="absolute bottom-0 left-0 right-0 pb-8 pt-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="border-l-4 border-amber-400 pl-5">
              <p className="text-amber-400 text-xs font-bold tracking-wide mb-3">
                {story.age} · {story.gender} · {story.address}在住
              </p>
              <h2 className="text-white text-xl md:text-2xl font-bold leading-tight mb-3">
                子供たちに、お墓の心配は<br />させたくなかった。
              </h2>
              <div className="flex flex-wrap gap-2 mb-2">
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
              {/* Left number */}
              <div className="w-16 shrink-0 text-right pr-4 pt-1">
                <span className="text-5xl font-black text-gray-100 leading-none">{s.num}</span>
              </div>
              {/* Right content */}
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
          {/* Cost section */}
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
      {/* Cost band */}
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
export default async function Story8IndexPage() {
  const story = getStoryBySlug("story-01")
  if (!story) return null

  const variationComponents = [Variation1, Variation2, Variation3, Variation4, Variation5]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm py-3 px-6 flex gap-3 flex-wrap items-center">
        <Link
          href="/design-preview/story-content"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mr-2 shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />デザイン一覧
        </Link>
        <span className="text-gray-300">|</span>
        {DESIGNS.map((d) => (
          <a
            key={d.id}
            href={`#v${d.id}`}
            className="text-sm text-gray-600 hover:text-primary font-medium whitespace-nowrap px-2 py-1 rounded hover:bg-primary/5"
          >
            V{d.id}: {d.name}
          </a>
        ))}
      </nav>

      {/* Page header */}
      <div className="py-10 px-6 text-center bg-white border-b">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Design Preview</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">案8 プルクォート型 — バリエーション比較</h1>
        <p className="text-gray-500 text-sm mt-2">全5案</p>
      </div>

      {/* Each variation */}
      {DESIGNS.map((d, i) => {
        const VariationComponent = variationComponents[i]
        const sectionBg = i % 2 === 0 ? "bg-gray-100" : "bg-white"
        return (
          <section key={d.id} id={`v${d.id}`} className={`py-16 ${sectionBg}`}>
            <div className="max-w-5xl mx-auto px-6">

              {/* Label badge */}
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center bg-white border border-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  バリエーション {d.id}
                </span>
                <span className="text-gray-800 font-semibold text-sm">{d.name}</span>
                <span className="text-gray-400 text-xs">— {d.note}</span>
              </div>

              {/* Preview card */}
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <CompactHero story={story} />
                <VariationComponent story={story} />
              </div>

              {/* Link to full-page detail */}
              <div className="mt-4 text-right">
                <Link
                  href={`/design-preview/story-8/${d.id}`}
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                >
                  このデザインで詳細を見る →
                </Link>
              </div>
            </div>
          </section>
        )
      })}

      <div className="py-12 bg-gray-50 border-t text-center">
        <p className="text-gray-400 text-sm">案8 バリエーション — 全5案</p>
      </div>

    </div>
  )
}
