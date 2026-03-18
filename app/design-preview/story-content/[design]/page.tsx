// app/design-preview/story-content/[design]/page.tsx
// 体験談コンテンツデザイン案 フルページプレビュー

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

interface PageProps {
  params: Promise<{ design: string }>
}

const DESIGNS = [
  { id: "1",  name: "案1: ミニマルカード" },
  { id: "2",  name: "案2: タイムライン" },
  { id: "3",  name: "案3: インタビュー形式" },
  { id: "4",  name: "案4: サイドバー（目次付き）" },
  { id: "5",  name: "案5: セクション交互背景" },
  { id: "6",  name: "案6: デコラティブナンバリング" },
  { id: "7",  name: "案7: カラーアクセントカード" },
  { id: "8",  name: "案8: プルクォート型" },
  { id: "9",  name: "案9: 2カラムグリッド" },
  { id: "10", name: "案10: ステップ型" },
]

export function generateStaticParams() {
  return DESIGNS.map((d) => ({ design: d.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { design } = await params
  const info = DESIGNS.find((d) => d.id === design)
  return {
    title: `体験談コンテンツ ${info?.name ?? design} | プレビュー`,
  }
}

// ── 型エイリアス ────────────────────────────────────────────────────

type Story = NonNullable<ReturnType<typeof getStoryBySlug>>

// ── 案5ヒーロー（フルサイズ） ────────────────────────────────────────

function FullHero({ story }: { story: Story }) {
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
              <h1 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-4">
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

// ── 費用グリッド（共通） ──────────────────────────────────────────────

function CostGrid({ story }: { story: Story }) {
  const items = [
    { label: "離檀料", value: story.ridanFee },
    { label: "お布施", value: story.ofuse },
    { label: "石材店費用", value: story.stoneShopCost },
    { label: "見積件数", value: story.estimateCount },
    { label: "行政手続", value: story.paperwork },
    { label: "期間", value: story.duration },
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

// ── 案1: ミニマルカード ──────────────────────────────────────────────

function ContentDesign1({ story }: { story: Story }) {
  return (
    <div className="bg-linen py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />墓じまいを考え始めたきっかけ
            </h2>
            <p className="text-foreground leading-relaxed">{story.triggerEpisode}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />親族との話し合い
            </h2>
            <p className="text-foreground leading-relaxed">{story.familyDiscussion}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />お寺・霊園への連絡
            </h2>
            <p className="text-foreground leading-relaxed">{story.templeReaction}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />費用・手続きについて
            </h2>
            <CostGrid story={story} />
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-500" />一番大変だったこと
            </h2>
            <p className="text-foreground leading-relaxed">{story.hardestPart}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500" />墓じまいを終えて良かった点
            </h2>
            <p className="text-foreground leading-relaxed">{story.goodPoints}</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />もしやり直すなら変えたいこと
            </h2>
            <p className="text-foreground leading-relaxed">{story.ifRedoAgain}</p>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── 案2: タイムライン ────────────────────────────────────────────────

function ContentDesign2({ story }: { story: Story }) {
  const sections = [
    { icon: <MessageSquare className="w-4 h-4 text-primary" />, title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { icon: <Users className="w-4 h-4 text-primary" />, title: "親族との話し合い", body: story.familyDiscussion },
    { icon: <Phone className="w-4 h-4 text-primary" />, title: "お寺・霊園への連絡", body: story.templeReaction },
    { icon: <AlertCircle className="w-4 h-4 text-orange-500" />, title: "一番大変だったこと", body: story.hardestPart },
    { icon: <Heart className="w-4 h-4 text-red-500" />, title: "墓じまいを終えて良かった点", body: story.goodPoints },
    { icon: <Lightbulb className="w-4 h-4 text-yellow-500" />, title: "もしやり直すなら変えたいこと", body: story.ifRedoAgain },
  ]

  return (
    <div className="bg-linen py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">

          <div className="relative">
            <div className="absolute left-[5px] top-0 bottom-0 border-l-2 border-primary/20" />

            {/* Cost section */}
            <div className="relative mb-8 pl-10">
              <div className="absolute left-0 top-5 w-3 h-3 rounded-full bg-primary" />
              <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-primary" />費用・手続きについて
                </h2>
                <CostGrid story={story} />
              </div>
            </div>

            {sections.map((s, i) => (
              <div key={i} className="relative mb-8 pl-10">
                <div className="absolute left-0 top-5 w-3 h-3 rounded-full bg-primary" />
                <div className="bg-white rounded-lg p-6 shadow-sm border border-border">
                  <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                    {s.icon}{s.title}
                  </h2>
                  <p className="text-foreground leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

// ── 案3: インタビュー形式 ────────────────────────────────────────────

function ContentDesign3({ story }: { story: Story }) {
  const sections = [
    { icon: <MessageSquare className="w-5 h-5 text-primary" />, title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { icon: <Users className="w-5 h-5 text-primary" />, title: "親族との話し合い", body: story.familyDiscussion },
    { icon: <Phone className="w-5 h-5 text-primary" />, title: "お寺・霊園への連絡", body: story.templeReaction },
    { icon: <AlertCircle className="w-5 h-5 text-orange-500" />, title: "一番大変だったこと", body: story.hardestPart },
    { icon: <Heart className="w-5 h-5 text-red-500" />, title: "墓じまいを終えて良かった点", body: story.goodPoints },
    { icon: <Lightbulb className="w-5 h-5 text-yellow-500" />, title: "もしやり直すなら変えたいこと", body: story.ifRedoAgain },
  ]

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">

          {sections.map((s, i) => (
            <div key={i} className="py-10 border-b border-gray-100">
              <h2 className="text-xl font-bold text-foreground mb-5 border-l-4 border-primary pl-4 flex items-center gap-2">
                {s.icon}{s.title}
              </h2>
              <p className="text-foreground leading-relaxed text-base">{s.body}</p>
            </div>
          ))}

          <div className="py-10 border-b border-gray-100">
            <h2 className="text-xl font-bold text-foreground mb-5 border-l-4 border-primary pl-4 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />費用・手続きについて
            </h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <CostGrid story={story} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── 案4: サイドバー（目次付き） ──────────────────────────────────────

function ContentDesign4({ story }: { story: Story }) {
  const sections = [
    { id: "trigger", icon: <MessageSquare className="w-4 h-4 text-primary" />, title: "きっかけ", body: story.triggerEpisode },
    { id: "family", icon: <Users className="w-4 h-4 text-primary" />, title: "親族との話し合い", body: story.familyDiscussion },
    { id: "temple", icon: <Phone className="w-4 h-4 text-primary" />, title: "お寺・霊園への連絡", body: story.templeReaction },
    { id: "hardest", icon: <AlertCircle className="w-4 h-4 text-orange-500" />, title: "一番大変だったこと", body: story.hardestPart },
    { id: "good", icon: <Heart className="w-4 h-4 text-red-500" />, title: "良かった点", body: story.goodPoints },
    { id: "redo", icon: <Lightbulb className="w-4 h-4 text-yellow-500" />, title: "やり直すなら", body: story.ifRedoAgain },
  ]

  return (
    <div className="bg-linen py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto flex gap-8 items-start">

          {/* Sidebar */}
          <aside className="hidden md:block w-48 shrink-0 sticky top-24">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-border">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">目次</p>
              <ul className="space-y-2">
                {sections.map((s) => (
                  <li key={s.id} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                    <a href={`#s4-${s.id}`} className="text-xs text-muted-foreground hover:text-primary transition-colors leading-tight">
                      {s.title}
                    </a>
                  </li>
                ))}
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                  <a href="#s4-cost" className="text-xs text-muted-foreground hover:text-primary transition-colors leading-tight">
                    費用・手続き
                  </a>
                </li>
              </ul>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {sections.map((s) => (
              <div key={s.id} id={`s4-${s.id}`} className="bg-white rounded-lg shadow-sm p-5 md:p-6 mb-4 border border-border">
                <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                  {s.icon}{s.title}
                </h2>
                <p className="text-foreground leading-relaxed text-sm">{s.body}</p>
              </div>
            ))}
            <div id="s4-cost" className="bg-white rounded-lg shadow-sm p-5 md:p-6 mb-4 border border-border">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-primary" />費用・手続きについて
              </h2>
              <CostGrid story={story} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── 案5: セクション交互背景 ──────────────────────────────────────────

function ContentDesign5({ story }: { story: Story }) {
  const sections = [
    { bg: "bg-white", icon: <MessageSquare className="w-6 h-6 text-primary" />, title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { bg: "bg-linen", icon: <Users className="w-6 h-6 text-primary" />, title: "親族との話し合い", body: story.familyDiscussion },
    { bg: "bg-white", icon: <Phone className="w-6 h-6 text-primary" />, title: "お寺・霊園への連絡", body: story.templeReaction },
    { bg: "bg-linen", icon: <AlertCircle className="w-6 h-6 text-orange-500" />, title: "一番大変だったこと", body: story.hardestPart },
    { bg: "bg-white", icon: <Heart className="w-6 h-6 text-red-500" />, title: "墓じまいを終えて良かった点", body: story.goodPoints },
    { bg: "bg-linen", icon: <Lightbulb className="w-6 h-6 text-yellow-500" />, title: "もしやり直すなら変えたいこと", body: story.ifRedoAgain },
  ]

  return (
    <div>
      {sections.map((s, i) => (
        <div key={i} className={`${s.bg} py-12 md:py-16`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 border-b-2 border-primary/20 pb-3 mb-6">
                {s.icon}{s.title}
              </h2>
              <p className="text-foreground leading-relaxed text-base">{s.body}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Cost section — distinct band */}
      <div className="bg-primary/5 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-3 border-b-2 border-primary/20 pb-3 mb-6">
              <Wallet className="w-6 h-6 text-primary" />費用・手続きについて
            </h2>
            <CostGrid story={story} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 案6: デコラティブナンバリング ────────────────────────────────────
// 大きな透かし数字を背景に置き、セクションに奥行きを出す

function ContentDesign6({ story }: { story: Story }) {
  const sections = [
    { num: "01", icon: <MessageSquare className="w-5 h-5 text-primary" />, title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { num: "02", icon: <Users className="w-5 h-5 text-primary" />, title: "親族との話し合い", body: story.familyDiscussion },
    { num: "03", icon: <Phone className="w-5 h-5 text-primary" />, title: "お寺・霊園への連絡", body: story.templeReaction },
    { num: "04", icon: <Wallet className="w-5 h-5 text-primary" />, title: "費用・手続きについて", body: null },
    { num: "05", icon: <AlertCircle className="w-5 h-5 text-orange-500" />, title: "一番大変だったこと", body: story.hardestPart },
    { num: "06", icon: <Heart className="w-5 h-5 text-red-500" />, title: "墓じまいを終えて良かった点", body: story.goodPoints },
    { num: "07", icon: <Lightbulb className="w-5 h-5 text-yellow-500" />, title: "もしやり直すなら変えたいこと", body: story.ifRedoAgain },
  ]
  return (
    <div className="bg-linen py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {sections.map((s) => (
            <div key={s.num} className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-10 relative overflow-hidden">
              {/* Decorative number */}
              <span className="absolute -right-2 -top-4 text-[7rem] font-black text-gray-100 leading-none select-none pointer-events-none">
                {s.num}
              </span>
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2 relative">
                {s.icon}{s.title}
              </h2>
              {s.body
                ? <p className="text-foreground leading-relaxed relative">{s.body}</p>
                : <div className="relative"><CostGrid story={story} /></div>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── 案7: カラーアクセントカード ──────────────────────────────────────
// セクションごとに異なるアクセントカラーの上部ボーダーライン

function ContentDesign7({ story }: { story: Story }) {
  const sections = [
    { accent: "border-t-primary",      icon: <MessageSquare className="w-5 h-5 text-primary" />,       title: "墓じまいを考え始めたきっかけ",  body: story.triggerEpisode },
    { accent: "border-t-blue-400",     icon: <Users className="w-5 h-5 text-blue-400" />,               title: "親族との話し合い",              body: story.familyDiscussion },
    { accent: "border-t-purple-400",   icon: <Phone className="w-5 h-5 text-purple-400" />,             title: "お寺・霊園への連絡",            body: story.templeReaction },
    { accent: "border-t-amber-400",    icon: <Wallet className="w-5 h-5 text-amber-500" />,             title: "費用・手続きについて",          body: null },
    { accent: "border-t-orange-400",   icon: <AlertCircle className="w-5 h-5 text-orange-500" />,       title: "一番大変だったこと",            body: story.hardestPart },
    { accent: "border-t-rose-400",     icon: <Heart className="w-5 h-5 text-rose-400" />,               title: "墓じまいを終えて良かった点",    body: story.goodPoints },
    { accent: "border-t-yellow-400",   icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,         title: "もしやり直すなら変えたいこと",  body: story.ifRedoAgain },
  ]
  return (
    <div className="bg-linen py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-5">
          {sections.map((s, i) => (
            <div key={i} className={`bg-white rounded-xl shadow-sm border-t-4 ${s.accent} p-6 md:p-8`}>
              <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                {s.icon}{s.title}
              </h2>
              {s.body
                ? <p className="text-foreground leading-relaxed">{s.body}</p>
                : <CostGrid story={story} />
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── 案8: プルクォート型 ──────────────────────────────────────────────
// 各セクションの冒頭文を大きな引用として引き出し、続きをその下に

function ContentDesign8({ story }: { story: Story }) {
  const firstSentence = (text: string) => {
    const idx = text.indexOf("。")
    return idx !== -1 ? text.slice(0, idx + 1) : text.slice(0, 60) + "…"
  }
  const restSentences = (text: string) => {
    const idx = text.indexOf("。")
    return idx !== -1 ? text.slice(idx + 1).trimStart() : ""
  }
  const sections = [
    { icon: <MessageSquare className="w-5 h-5 text-primary" />, title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { icon: <Users className="w-5 h-5 text-primary" />,         title: "親族との話し合い",              body: story.familyDiscussion },
    { icon: <Phone className="w-5 h-5 text-primary" />,         title: "お寺・霊園への連絡",            body: story.templeReaction },
    { icon: <AlertCircle className="w-5 h-5 text-orange-500" />,title: "一番大変だったこと",            body: story.hardestPart },
    { icon: <Heart className="w-5 h-5 text-red-500" />,         title: "墓じまいを終えて良かった点",    body: story.goodPoints },
    { icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,  title: "もしやり直すなら変えたいこと",  body: story.ifRedoAgain },
  ]
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {sections.map((s, i) => (
            <div key={i} className="py-12 border-b border-gray-100">
              <h2 className="text-base font-bold text-muted-foreground mb-5 flex items-center gap-2 uppercase tracking-wide text-xs">
                {s.icon}{s.title}
              </h2>
              {/* Pull quote */}
              <blockquote className="text-xl md:text-2xl font-bold text-foreground leading-snug mb-6 border-l-4 border-primary pl-6">
                {firstSentence(s.body)}
              </blockquote>
              {restSentences(s.body) && (
                <p className="text-foreground/80 leading-relaxed text-sm">{restSentences(s.body)}</p>
              )}
            </div>
          ))}
          {/* Cost section */}
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

// ── 案9: 2カラムグリッド ─────────────────────────────────────────────
// デスクトップでセクションを2列に並べる。費用は全幅。

function ContentDesign9({ story }: { story: Story }) {
  const sections = [
    { icon: <MessageSquare className="w-5 h-5 text-primary" />,        title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { icon: <Users className="w-5 h-5 text-primary" />,                title: "親族との話し合い",              body: story.familyDiscussion },
    { icon: <Phone className="w-5 h-5 text-primary" />,                title: "お寺・霊園への連絡",            body: story.templeReaction },
    { icon: <AlertCircle className="w-5 h-5 text-orange-500" />,       title: "一番大変だったこと",            body: story.hardestPart },
    { icon: <Heart className="w-5 h-5 text-red-500" />,                title: "墓じまいを終えて良かった点",    body: story.goodPoints },
    { icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,         title: "もしやり直すなら変えたいこと",  body: story.ifRedoAgain },
  ]
  return (
    <div className="bg-linen py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Cost — full width */}
          <div className="bg-white rounded-xl shadow-sm border border-border p-6 md:p-8 mb-6">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Wallet className="w-5 h-5 text-primary" />費用・手続きについて
            </h2>
            <CostGrid story={story} />
          </div>
          {/* 2-column grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {sections.map((s, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-border p-6">
                <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
                  {s.icon}{s.title}
                </h2>
                <p className="text-foreground leading-relaxed text-sm line-clamp-6">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── 案10: ステップ型 ─────────────────────────────────────────────────
// STEP番号付きで墓じまいの旅を時系列で表現

function ContentDesign10({ story }: { story: Story }) {
  const steps = [
    { step: "STEP 01", label: "きっかけ",        icon: <MessageSquare className="w-5 h-5" />, body: story.triggerEpisode,   color: "bg-primary text-white" },
    { step: "STEP 02", label: "親族への相談",    icon: <Users className="w-5 h-5" />,         body: story.familyDiscussion, color: "bg-primary text-white" },
    { step: "STEP 03", label: "寺院・霊園へ連絡", icon: <Phone className="w-5 h-5" />,         body: story.templeReaction,   color: "bg-primary text-white" },
    { step: "STEP 04", label: "費用・手続き",    icon: <Wallet className="w-5 h-5" />,         body: null,                   color: "bg-primary text-white" },
    { step: "STEP 05", label: "苦労したこと",    icon: <AlertCircle className="w-5 h-5" />,   body: story.hardestPart,      color: "bg-orange-500 text-white" },
    { step: "STEP 06", label: "良かったこと",    icon: <Heart className="w-5 h-5" />,          body: story.goodPoints,       color: "bg-rose-500 text-white" },
    { step: "STEP 07", label: "振り返り",        icon: <Lightbulb className="w-5 h-5" />,     body: story.ifRedoAgain,      color: "bg-yellow-500 text-white" },
  ]
  return (
    <div className="bg-linen py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-0">
          {steps.map((s, i) => (
            <div key={i} className="flex gap-0 items-stretch">
              {/* Step indicator */}
              <div className="flex flex-col items-center w-20 shrink-0">
                <div className={`${s.color} rounded-xl px-2 py-3 flex flex-col items-center gap-1 w-16 shadow-sm`}>
                  {s.icon}
                  <span className="text-[10px] font-black leading-tight text-center">{s.step}</span>
                </div>
                {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-primary/20 my-1" />}
              </div>
              {/* Content */}
              <div className="flex-1 pb-6 pt-1 pl-4">
                <div className="bg-white rounded-xl shadow-sm border border-border p-5">
                  <h2 className="text-base font-bold text-foreground mb-3">{s.label}</h2>
                  {s.body
                    ? <p className="text-foreground leading-relaxed text-sm">{s.body}</p>
                    : <CostGrid story={story} />
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── ページ本体 ───────────────────────────────────────────────────────

export default async function StoryContentDesignPage({ params }: PageProps) {
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

      {/* Sticky amber preview bar */}
      <div className="sticky top-0 z-50 bg-amber-50 border-b border-amber-200 py-2 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Link
              href="/design-preview/story-content"
              className="flex items-center gap-1 text-xs text-amber-700 hover:text-amber-900 font-medium"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              案一覧に戻る
            </Link>
            <span className="text-amber-300">|</span>
            <span className="text-xs font-bold text-amber-800">
              {designInfo.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {prevDesign && (
              <Link
                href={`/design-preview/story-content/${prevDesign.id}`}
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
                  href={`/design-preview/story-content/${d.id}`}
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
                href={`/design-preview/story-content/${nextDesign.id}`}
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

        {/* Hero (案5 style, full height) */}
        <FullHero story={story} />

        {/* Content section — design variant */}
        {design === "1"  && <ContentDesign1  story={story} />}
        {design === "2"  && <ContentDesign2  story={story} />}
        {design === "3"  && <ContentDesign3  story={story} />}
        {design === "4"  && <ContentDesign4  story={story} />}
        {design === "5"  && <ContentDesign5  story={story} />}
        {design === "6"  && <ContentDesign6  story={story} />}
        {design === "7"  && <ContentDesign7  story={story} />}
        {design === "8"  && <ContentDesign8  story={story} />}
        {design === "9"  && <ContentDesign9  story={story} />}
        {design === "10" && <ContentDesign10 story={story} />}

        {/* Navigation */}
        <section className="py-8 bg-white border-t border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/stories"
                className="px-4 py-3 bg-white rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow text-sm text-muted-foreground"
              >
                一覧に戻る
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-linen">
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
