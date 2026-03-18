// app/design-preview/story-9/page.tsx
// バリエーション4ベース — 費用・手続きセクション 5案比較

import Link from "next/link"
import type { Metadata } from "next"
import { getStoryBySlug } from "@/lib/stories"
import { Wallet, ChevronLeft, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "費用セクション デザイン比較 | プレビュー",
}

const DESIGNS = [
  { id: "1", name: "スペーサーカード",   note: "01-06と同じ左スペーサー配置を保ちつつ bg-primary/5 のカードで囲む",     bg: "bg-gray-50" },
  { id: "2", name: "アンバーバンド",     note: "全幅の帯でページリズムを切る。白背景に対して視覚的なアクセント",         bg: "bg-white" },
  { id: "3", name: "ダークサマリー",     note: "ダーク背景カードで締めくくり感を出す。高コントラスト",                   bg: "bg-gray-50" },
  { id: "4", name: "スタッツグリッド",   note: "数値を大きく見せるスタッツ型。麻色帯でセクションが独立して見える",       bg: "bg-white" },
  { id: "5", name: "ストライプテーブル", note: "ラベル｜値の横並びリスト。01-06と揃えた左スペーサーで行継続感を出す",   bg: "bg-gray-50" },
]

type S = NonNullable<ReturnType<typeof getStoryBySlug>>

const getCostItems = (story: S) => [
  { label: "離檀料",     value: story.ridanFee },
  { label: "お布施",     value: story.ofuse },
  { label: "石材店費用", value: story.stoneShopCost },
  { label: "見積件数",   value: story.estimateCount },
  { label: "行政手続",   value: story.paperwork },
  { label: "期間",       value: story.duration },
]

// ── 01-06の代表行（比較カード用） ────────────────────────────
function SampleRow() {
  return (
    <div className="bg-white border-b border-gray-100 px-6 py-5 flex gap-0">
      <div className="w-16 shrink-0 text-right pr-4">
        <span className="text-4xl font-black text-gray-100 leading-none">06</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">もしやり直すなら変えたいこと</p>
        <p className="text-base font-bold text-foreground leading-snug border-l-2 border-primary pl-3 line-clamp-2">
          もしやり直すなら、石材店への見積もりをもっと早い段階で複数の業者から取っておけばよかったと思っています。
        </p>
      </div>
    </div>
  )
}

function SampleDivider() {
  return (
    <div className="bg-white px-6 py-2 text-center text-xs text-muted-foreground border-b border-gray-100">
      ↑ 01〜06 セクションは全案共通（左ナンバー＋引用スタイル）
    </div>
  )
}

// ── 費用セクション プレビュー ─────────────────────────────────

function CostPreview1({ story }: { story: S }) {
  return (
    <div className="bg-white px-6 py-8 flex gap-0">
      <div className="w-16 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="bg-primary/5 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2 mb-4">
            <Wallet className="w-4 h-4 text-primary" />費用・手続きについて
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {getCostItems(story).map((item) => (
              <div key={item.label} className="p-2.5 bg-white rounded-lg text-center shadow-sm">
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className="font-semibold text-foreground text-xs">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CostPreview2({ story }: { story: S }) {
  return (
    <div className="bg-amber-50 border-t border-amber-100 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2 mb-4">
          <Wallet className="w-4 h-4 text-amber-700" />費用・手続きについて
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {getCostItems(story).map((item) => (
            <div key={item.label} className="p-2.5 bg-white rounded-xl text-center shadow-sm border border-amber-100">
              <p className="text-xs text-amber-700/70 mb-1">{item.label}</p>
              <p className="font-semibold text-foreground text-xs">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CostPreview3({ story }: { story: S }) {
  return (
    <div className="bg-white px-6 py-6">
      <div className="bg-gray-900 rounded-2xl p-6">
        <h3 className="text-xs font-bold text-white/50 flex items-center gap-2 mb-4 uppercase tracking-widest">
          <Wallet className="w-4 h-4" />費用・手続きについて
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {getCostItems(story).map((item) => (
            <div key={item.label} className="p-2.5 bg-white/10 rounded-xl text-center">
              <p className="text-xs text-white/50 mb-1">{item.label}</p>
              <p className="font-semibold text-white text-xs">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CostPreview4({ story }: { story: S }) {
  return (
    <div className="bg-linen px-6 py-8">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-xs font-bold text-muted-foreground flex items-center gap-2 mb-5 uppercase tracking-widest">
          <Wallet className="w-4 h-4 text-primary" />費用・手続きについて
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {getCostItems(story).map((item) => (
            <div key={item.label} className="bg-white rounded-xl p-4 text-center shadow-sm border border-border">
              <p className="text-lg font-black text-primary leading-tight mb-1">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CostPreview5({ story }: { story: S }) {
  return (
    <div className="bg-white px-6 py-8 flex gap-0">
      <div className="w-16 shrink-0" />
      <div className="flex-1 min-w-0">
        <h3 className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mb-4">
          <Wallet className="w-4 h-4" />費用・手続きについて
        </h3>
        <div className="rounded-xl overflow-hidden border border-border">
          {getCostItems(story).map((item, i) => (
            <div
              key={item.label}
              className={`flex items-center justify-between px-4 py-3 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
            >
              <span className="text-xs text-muted-foreground">{item.label}</span>
              <span className="text-xs font-semibold text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const costPreviews = [CostPreview1, CostPreview2, CostPreview3, CostPreview4, CostPreview5]

// ── ページ本体 ───────────────────────────────────────────────
export default async function Story9IndexPage() {
  const story = getStoryBySlug("story-01")
  if (!story) return null

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm py-3 px-6 flex gap-3 flex-wrap items-center">
        <Link
          href="/design-preview"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mr-2 shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />デザイン一覧
        </Link>
        <span className="text-gray-300">|</span>
        {DESIGNS.map((d) => (
          <a
            key={d.id}
            href={`#cost-${d.id}`}
            className="text-sm text-gray-600 hover:text-primary font-medium whitespace-nowrap px-2 py-1 rounded hover:bg-primary/5"
          >
            案{d.id}: {d.name}
          </a>
        ))}
      </nav>

      {/* Page header */}
      <div className="py-10 px-6 text-center bg-white border-b">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Design Preview</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">費用・手続きセクション デザイン比較</h1>
        <p className="text-gray-500 text-sm mt-2">
          01〜06は左ナンバー＋引用スタイルで共通。費用セクションのみ5案を比較。
        </p>
      </div>

      {/* Comparison cards */}
      {DESIGNS.map((d, i) => {
        const CostPreviewComponent = costPreviews[i]
        return (
          <section key={d.id} id={`cost-${d.id}`} className={`py-14 ${d.bg}`}>
            <div className="max-w-3xl mx-auto px-6">

              {/* Label */}
              <div className="flex items-start gap-3 mb-5">
                <span className="inline-flex items-center bg-white border border-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm shrink-0">
                  案 {d.id}
                </span>
                <div>
                  <p className="text-gray-800 font-semibold text-sm">{d.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{d.note}</p>
                </div>
              </div>

              {/* Preview card */}
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <SampleRow />
                <SampleDivider />
                <CostPreviewComponent story={story} />
              </div>

              {/* Link to full page */}
              <div className="mt-4 text-right">
                <Link
                  href={`/design-preview/story-9/${d.id}`}
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                >
                  全ページで確認する
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )
      })}

      <div className="py-12 bg-gray-50 border-t text-center">
        <p className="text-gray-400 text-sm">費用セクション — 全5案</p>
      </div>
    </div>
  )
}
