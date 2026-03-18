// app/design-preview/story-content/page.tsx
// 体験談コンテンツデザイン案 一覧プレビュー

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
  title: "体験談 コンテンツデザイン案 | プレビュー",
}

const DESIGNS = [
  { id: "1",  name: "ミニマルカード",        note: "カード形式・シンプル" },
  { id: "2",  name: "タイムライン",          note: "縦ライン・ドット" },
  { id: "3",  name: "インタビュー形式",      note: "マガジン風・ボーダーレス" },
  { id: "4",  name: "サイドバー（目次付き）", note: "2カラム・スティッキー目次" },
  { id: "5",  name: "セクション交互背景",    note: "交互背景・カードなし" },
  { id: "6",  name: "デコラティブナンバリング", note: "透かし数字・カード" },
  { id: "7",  name: "カラーアクセントカード", note: "セクションごとに異なる上部ボーダー色" },
  { id: "8",  name: "プルクォート型",        note: "冒頭文を大きく引用・続きを小さく" },
  { id: "9",  name: "2カラムグリッド",       note: "デスクトップで2列・費用は全幅" },
  { id: "10", name: "ステップ型",            note: "STEP番号で旅を時系列で表現" },
]

// ── 案5 ヒーロー（コンパクト版 h-[280px]） ──────────────────────────

function CompactHero({ story }: { story: NonNullable<ReturnType<typeof getStoryBySlug>> }) {
  return (
    <div className="relative w-full h-[280px] overflow-hidden">
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

// ── 費用グリッド（共通） ──────────────────────────────────────────────

function CostGrid({ story }: { story: NonNullable<ReturnType<typeof getStoryBySlug>> }) {
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

function ContentDesign1({ story }: { story: NonNullable<ReturnType<typeof getStoryBySlug>> }) {
  return (
    <div className="bg-linen py-10">
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

function ContentDesign2({ story }: { story: NonNullable<ReturnType<typeof getStoryBySlug>> }) {
  const sections = [
    { icon: <MessageSquare className="w-4 h-4 text-primary" />, title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { icon: <Users className="w-4 h-4 text-primary" />, title: "親族との話し合い", body: story.familyDiscussion },
    { icon: <Phone className="w-4 h-4 text-primary" />, title: "お寺・霊園への連絡", body: story.templeReaction },
    { icon: <AlertCircle className="w-4 h-4 text-orange-500" />, title: "一番大変だったこと", body: story.hardestPart },
    { icon: <Heart className="w-4 h-4 text-red-500" />, title: "墓じまいを終えて良かった点", body: story.goodPoints },
    { icon: <Lightbulb className="w-4 h-4 text-yellow-500" />, title: "もしやり直すなら変えたいこと", body: story.ifRedoAgain },
  ]

  return (
    <div className="bg-linen py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">

          {/* Timeline wrapper */}
          <div className="relative">
            <div className="absolute left-[5px] top-0 bottom-0 border-l-2 border-primary/20" />

            {/* Cost section — before timeline items */}
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

function ContentDesign3({ story }: { story: NonNullable<ReturnType<typeof getStoryBySlug>> }) {
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

          {/* Cost section */}
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

function ContentDesign4({ story }: { story: NonNullable<ReturnType<typeof getStoryBySlug>> }) {
  const sections = [
    { id: "trigger", icon: <MessageSquare className="w-4 h-4 text-primary" />, title: "きっかけ", body: story.triggerEpisode },
    { id: "family", icon: <Users className="w-4 h-4 text-primary" />, title: "親族との話し合い", body: story.familyDiscussion },
    { id: "temple", icon: <Phone className="w-4 h-4 text-primary" />, title: "お寺・霊園への連絡", body: story.templeReaction },
    { id: "hardest", icon: <AlertCircle className="w-4 h-4 text-orange-500" />, title: "一番大変だったこと", body: story.hardestPart },
    { id: "good", icon: <Heart className="w-4 h-4 text-red-500" />, title: "良かった点", body: story.goodPoints },
    { id: "redo", icon: <Lightbulb className="w-4 h-4 text-yellow-500" />, title: "やり直すなら", body: story.ifRedoAgain },
  ]

  return (
    <div className="bg-linen py-10">
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

function ContentDesign5({ story }: { story: NonNullable<ReturnType<typeof getStoryBySlug>> }) {
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

// ── 案6〜10 ──────────────────────────────────────────────────────────

type S = NonNullable<ReturnType<typeof getStoryBySlug>>

function ContentDesign6({ story }: { story: S }) {
  const sections = [
    { num: "01", icon: <MessageSquare className="w-5 h-5 text-primary" />, title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { num: "02", icon: <Users className="w-5 h-5 text-primary" />, title: "親族との話し合い", body: story.familyDiscussion },
    { num: "03", icon: <Phone className="w-5 h-5 text-primary" />, title: "お寺・霊園への連絡", body: story.templeReaction },
    { num: "04", icon: <Wallet className="w-5 h-5 text-primary" />, title: "費用・手続きについて", body: null as string | null },
    { num: "05", icon: <AlertCircle className="w-5 h-5 text-orange-500" />, title: "一番大変だったこと", body: story.hardestPart },
    { num: "06", icon: <Heart className="w-5 h-5 text-red-500" />, title: "墓じまいを終えて良かった点", body: story.goodPoints },
    { num: "07", icon: <Lightbulb className="w-5 h-5 text-yellow-500" />, title: "もしやり直すなら変えたいこと", body: story.ifRedoAgain },
  ]
  return (
    <div className="bg-linen py-12">
      <div className="container mx-auto px-4"><div className="max-w-4xl mx-auto space-y-6">
        {sections.map((s) => (
          <div key={s.num} className="bg-white rounded-2xl shadow-sm border border-border p-6 md:p-10 relative overflow-hidden">
            <span className="absolute -right-2 -top-4 text-[7rem] font-black text-gray-100 leading-none select-none pointer-events-none">{s.num}</span>
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2 relative">{s.icon}{s.title}</h2>
            {s.body ? <p className="text-foreground leading-relaxed relative">{s.body}</p> : <div className="relative"><CostGrid story={story} /></div>}
          </div>
        ))}
      </div></div>
    </div>
  )
}

function ContentDesign7({ story }: { story: S }) {
  const sections = [
    { accent: "border-t-primary",    icon: <MessageSquare className="w-5 h-5 text-primary" />,      title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { accent: "border-t-blue-400",   icon: <Users className="w-5 h-5 text-blue-400" />,              title: "親族との話し合い",             body: story.familyDiscussion },
    { accent: "border-t-purple-400", icon: <Phone className="w-5 h-5 text-purple-400" />,            title: "お寺・霊園への連絡",           body: story.templeReaction },
    { accent: "border-t-amber-400",  icon: <Wallet className="w-5 h-5 text-amber-500" />,            title: "費用・手続きについて",         body: null as string | null },
    { accent: "border-t-orange-400", icon: <AlertCircle className="w-5 h-5 text-orange-500" />,      title: "一番大変だったこと",           body: story.hardestPart },
    { accent: "border-t-rose-400",   icon: <Heart className="w-5 h-5 text-rose-400" />,              title: "墓じまいを終えて良かった点",   body: story.goodPoints },
    { accent: "border-t-yellow-400", icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,        title: "もしやり直すなら変えたいこと", body: story.ifRedoAgain },
  ]
  return (
    <div className="bg-linen py-12">
      <div className="container mx-auto px-4"><div className="max-w-4xl mx-auto space-y-5">
        {sections.map((s, i) => (
          <div key={i} className={`bg-white rounded-xl shadow-sm border-t-4 ${s.accent} p-6 md:p-8`}>
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">{s.icon}{s.title}</h2>
            {s.body ? <p className="text-foreground leading-relaxed">{s.body}</p> : <CostGrid story={story} />}
          </div>
        ))}
      </div></div>
    </div>
  )
}

function ContentDesign8({ story }: { story: S }) {
  const firstSentence = (text: string) => { const i = text.indexOf("。"); return i !== -1 ? text.slice(0, i + 1) : text.slice(0, 60) + "…" }
  const restSentences = (text: string) => { const i = text.indexOf("。"); return i !== -1 ? text.slice(i + 1).trimStart() : "" }
  const sections = [
    { icon: <MessageSquare className="w-5 h-5 text-primary" />,        title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { icon: <Users className="w-5 h-5 text-primary" />,                title: "親族との話し合い",             body: story.familyDiscussion },
    { icon: <Phone className="w-5 h-5 text-primary" />,                title: "お寺・霊園への連絡",           body: story.templeReaction },
    { icon: <AlertCircle className="w-5 h-5 text-orange-500" />,       title: "一番大変だったこと",           body: story.hardestPart },
    { icon: <Heart className="w-5 h-5 text-red-500" />,                title: "墓じまいを終えて良かった点",   body: story.goodPoints },
    { icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,         title: "もしやり直すなら変えたいこと", body: story.ifRedoAgain },
  ]
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4"><div className="max-w-3xl mx-auto">
        {sections.map((s, i) => (
          <div key={i} className="py-12 border-b border-gray-100">
            <h2 className="text-xs font-bold text-muted-foreground mb-5 flex items-center gap-2 uppercase tracking-wide">{s.icon}{s.title}</h2>
            <blockquote className="text-xl font-bold text-foreground leading-snug mb-6 border-l-4 border-primary pl-6">{firstSentence(s.body)}</blockquote>
            {restSentences(s.body) && <p className="text-foreground/80 leading-relaxed text-sm">{restSentences(s.body)}</p>}
          </div>
        ))}
        <div className="py-12 border-b border-gray-100">
          <h2 className="text-xs font-bold text-muted-foreground mb-5 flex items-center gap-2 uppercase tracking-wide"><Wallet className="w-5 h-5 text-primary" />費用・手続きについて</h2>
          <div className="bg-gray-50 rounded-2xl p-6"><CostGrid story={story} /></div>
        </div>
      </div></div>
    </div>
  )
}

function ContentDesign9({ story }: { story: S }) {
  const sections = [
    { icon: <MessageSquare className="w-5 h-5 text-primary" />,   title: "墓じまいを考え始めたきっかけ", body: story.triggerEpisode },
    { icon: <Users className="w-5 h-5 text-primary" />,           title: "親族との話し合い",             body: story.familyDiscussion },
    { icon: <Phone className="w-5 h-5 text-primary" />,           title: "お寺・霊園への連絡",           body: story.templeReaction },
    { icon: <AlertCircle className="w-5 h-5 text-orange-500" />,  title: "一番大変だったこと",           body: story.hardestPart },
    { icon: <Heart className="w-5 h-5 text-red-500" />,           title: "墓じまいを終えて良かった点",   body: story.goodPoints },
    { icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,    title: "もしやり直すなら変えたいこと", body: story.ifRedoAgain },
  ]
  return (
    <div className="bg-linen py-12">
      <div className="container mx-auto px-4"><div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-border p-6 md:p-8 mb-6">
          <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2"><Wallet className="w-5 h-5 text-primary" />費用・手続きについて</h2>
          <CostGrid story={story} />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {sections.map((s, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-border p-6">
              <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">{s.icon}{s.title}</h2>
              <p className="text-foreground leading-relaxed text-sm line-clamp-6">{s.body}</p>
            </div>
          ))}
        </div>
      </div></div>
    </div>
  )
}

function ContentDesign10({ story }: { story: S }) {
  const steps = [
    { step: "STEP 01", label: "きっかけ",         icon: <MessageSquare className="w-5 h-5" />, body: story.triggerEpisode,   color: "bg-primary text-white" },
    { step: "STEP 02", label: "親族への相談",     icon: <Users className="w-5 h-5" />,         body: story.familyDiscussion, color: "bg-primary text-white" },
    { step: "STEP 03", label: "寺院・霊園へ連絡", icon: <Phone className="w-5 h-5" />,         body: story.templeReaction,   color: "bg-primary text-white" },
    { step: "STEP 04", label: "費用・手続き",     icon: <Wallet className="w-5 h-5" />,         body: null as string | null,  color: "bg-primary text-white" },
    { step: "STEP 05", label: "苦労したこと",     icon: <AlertCircle className="w-5 h-5" />,   body: story.hardestPart,      color: "bg-orange-500 text-white" },
    { step: "STEP 06", label: "良かったこと",     icon: <Heart className="w-5 h-5" />,          body: story.goodPoints,       color: "bg-rose-500 text-white" },
    { step: "STEP 07", label: "振り返り",         icon: <Lightbulb className="w-5 h-5" />,     body: story.ifRedoAgain,      color: "bg-yellow-500 text-white" },
  ]
  return (
    <div className="bg-linen py-12">
      <div className="container mx-auto px-4"><div className="max-w-4xl mx-auto space-y-0">
        {steps.map((s, i) => (
          <div key={i} className="flex items-stretch">
            <div className="flex flex-col items-center w-20 shrink-0">
              <div className={`${s.color} rounded-xl px-2 py-3 flex flex-col items-center gap-1 w-16 shadow-sm`}>
                {s.icon}
                <span className="text-[10px] font-black leading-tight text-center">{s.step}</span>
              </div>
              {i < steps.length - 1 && <div className="w-0.5 flex-1 bg-primary/20 my-1" />}
            </div>
            <div className="flex-1 pb-6 pt-1 pl-4">
              <div className="bg-white rounded-xl shadow-sm border border-border p-5">
                <h2 className="text-base font-bold text-foreground mb-3">{s.label}</h2>
                {s.body ? <p className="text-foreground leading-relaxed text-sm">{s.body}</p> : <CostGrid story={story} />}
              </div>
            </div>
          </div>
        ))}
      </div></div>
    </div>
  )
}

// ── ページ本体 ───────────────────────────────────────────────────────

export default function StoryContentPreviewPage() {
  const story = getStoryBySlug("story-01")
  if (!story) return null

  const contentComponents = [ContentDesign1, ContentDesign2, ContentDesign3, ContentDesign4, ContentDesign5, ContentDesign6, ContentDesign7, ContentDesign8, ContentDesign9, ContentDesign10]

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm py-3 px-6 flex gap-3 flex-wrap items-center">
        <Link href="/design-preview" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mr-2 shrink-0">
          <ChevronLeft className="w-4 h-4" />デザイン一覧
        </Link>
        <span className="text-gray-300">|</span>
        {DESIGNS.map((d) => (
          <a
            key={d.id}
            href={`#design-${d.id}`}
            className="text-sm text-gray-600 hover:text-primary font-medium whitespace-nowrap px-2 py-1 rounded hover:bg-primary/5"
          >
            案{d.id}: {d.name}
          </a>
        ))}
      </nav>

      {/* Page header */}
      <div className="py-10 px-6 text-center bg-white border-b">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Design Preview</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">体験談 コンテンツデザイン案</h1>
        <p className="text-gray-500 text-sm mt-2">全10案を比較できます。各案の「このデザインで詳細を見る」から実際のページを確認できます。</p>
      </div>

      {/* Each design */}
      {DESIGNS.map((d, i) => {
        const ContentComponent = contentComponents[i]
        const sectionBg = i % 2 === 0 ? "bg-gray-100" : "bg-white"
        return (
          <section key={d.id} id={`design-${d.id}`} className={`py-16 ${sectionBg}`}>
            <div className="max-w-5xl mx-auto px-6">

              {/* Label badge */}
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center bg-white border border-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  案 {d.id}
                </span>
                <span className="text-gray-800 font-semibold text-sm">{d.name}</span>
                <span className="text-gray-400 text-xs">— {d.note}</span>
              </div>

              {/* Preview card */}
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                {/* Compact hero */}
                <CompactHero story={story} />
                {/* Content section */}
                <ContentComponent story={story} />
              </div>

              {/* Link */}
              <div className="mt-4 text-right">
                <Link
                  href={`/design-preview/story-content/${d.id}`}
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                >
                  このデザインで詳細を見る
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )
      })}

      <div className="py-12 bg-gray-50 border-t text-center">
        <p className="text-gray-400 text-sm">体験談 コンテンツデザイン案 — 全10案</p>
      </div>

    </div>
  )
}
