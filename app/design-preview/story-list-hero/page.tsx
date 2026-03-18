// app/design-preview/story-list-hero/page.tsx
// 体験談一覧 ヒーローセクション 10案比較

import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { MapPin, ArrowRight, ChevronLeft, Users, Quote, Star, BookOpen, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "体験談一覧 ヒーロー比較 | プレビュー",
}

const STORY_COUNT = 1 // 現在の件数
const REASONS = ["遠方", "後継者不在", "子供に負担をかけたくない", "高齢・管理困難", "費用負担"]

const DESIGNS = [
  { id: "1",  name: "グラデーション＋装飾円（現行）", note: "薄いグラデーション背景＋サークル装飾" },
  { id: "2",  name: "フルブリード写真",               note: "全幅ヒーロー画像＋オーバーレイテキスト" },
  { id: "3",  name: "左テキスト・右写真（分割）",     note: "PC：左テキスト右写真。スマホ：縦積み" },
  { id: "4",  name: "ミニマル・ページタイトル型",     note: "装飾なし。タイトル＋一言のみ" },
  { id: "5",  name: "ダークバナー",                   note: "primary色の全幅バナー。白抜きテキスト" },
  { id: "6",  name: "統計＋キャッチ強調",             note: "件数・理由などの数字を大きく見せる" },
  { id: "7",  name: "フィーチャー引用",               note: "体験者の言葉を大きく引用" },
  { id: "8",  name: "麻色ミニマル",                   note: "linen背景＋センタリング。落ち着いた印象" },
  { id: "9",  name: "タグクラウド型",                 note: "よくある理由タグを背景に散りばめる" },
  { id: "10", name: "写真グリッドモザイク",            note: "複数写真タイル＋オーバーレイで奥行き" },
]

// ── 案1: 現行（グラデーション＋装飾円） ──────────────────────
function Hero1() {
  return (
    <section className="relative bg-gradient-to-b from-primary/10 via-primary/5 to-white py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-64 h-64 border border-primary/20 rounded-full" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border border-primary/10 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full" />
      </div>
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <Users className="w-4 h-4" /><span>{STORY_COUNT}名の方の体験談</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
            墓じまい体験談
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            実際に墓じまいを経験された方々のリアルな声。<br className="hidden md:block" />
            あなたと同じ悩みを抱えていた方の事例が、きっと見つかります。
          </p>
        </div>
      </div>
    </section>
  )
}

// ── 案2: フルブリード写真 ─────────────────────────────────────
function Hero2() {
  return (
    <section className="relative h-72 md:h-96 overflow-hidden">
      <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      <span className="absolute top-4 right-4 text-white/50 text-xs">※写真はイメージです</span>
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto max-w-6xl px-6 w-full">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur rounded-full text-white text-xs font-medium mb-4">
              <Users className="w-3.5 h-3.5" /><span>{STORY_COUNT}名の体験談を掲載</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              墓じまい体験談
            </h1>
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              遠方・後継者不在・費用負担…<br />
              同じ悩みを乗り越えた方々の声をご紹介します。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── 案3: 左テキスト・右写真（分割） ──────────────────────────
function Hero3() {
  return (
    <section className="bg-white border-b border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-2 gap-0 items-stretch min-h-[300px]">
          <div className="flex flex-col justify-center py-14 pr-0 md:pr-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-primary text-xs font-medium mb-5 w-fit">
              <Users className="w-3.5 h-3.5" />{STORY_COUNT}名の体験談
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              墓じまい体験談
            </h1>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
              実際に墓じまいを経験された方々のリアルな声。
              あなたと同じ悩みを抱えていた方の事例が、きっと見つかります。
            </p>
            <div className="flex flex-wrap gap-2">
              {REASONS.map((r) => (
                <span key={r} className="text-xs bg-secondary text-muted-foreground px-3 py-1 rounded-full">{r}</span>
              ))}
            </div>
          </div>
          <div className="hidden md:block relative overflow-hidden">
            <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
            <span className="absolute top-3 right-3 text-white/50 text-xs">※写真はイメージです</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── 案4: ミニマル・ページタイトル型 ──────────────────────────
function Hero4() {
  return (
    <section className="bg-white border-b border-border py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">Experience Stories</p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">墓じまい体験談</h1>
        <p className="text-muted-foreground text-sm">
          実際に墓じまいを経験された{STORY_COUNT}名の方の声をご紹介します。
        </p>
      </div>
    </section>
  )
}

// ── 案5: ダークバナー ─────────────────────────────────────────
function Hero5() {
  return (
    <section className="bg-primary py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-full text-white text-xs font-medium mb-6">
            <Users className="w-3.5 h-3.5" />{STORY_COUNT}名の体験談
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            墓じまい体験談
          </h1>
          <p className="text-white/75 text-base md:text-lg leading-relaxed">
            遠方・後継者不在・高齢化…さまざまな事情で墓じまいを決断された方々の、
            リアルな体験をご紹介します。
          </p>
        </div>
      </div>
    </section>
  )
}

// ── 案6: 統計＋キャッチ強調 ──────────────────────────────────
function Hero6() {
  const stats = [
    { num: STORY_COUNT.toString(), unit: "件", label: "掲載体験談" },
    { num: "5",  unit: "つ",   label: "の主な理由" },
    { num: "無料", unit: "",   label: "相談受付中" },
  ]
  return (
    <section className="bg-white border-b border-border py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">墓じまい体験談</h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            実際に墓じまいを経験された方々のリアルな声をお届けします。
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="text-center p-5 bg-primary/5 rounded-2xl">
              <p className="text-3xl md:text-4xl font-black text-primary leading-none mb-1">
                {s.num}<span className="text-lg">{s.unit}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── 案7: フィーチャー引用 ─────────────────────────────────────
function Hero7() {
  return (
    <section className="bg-linen py-16 md:py-24 border-b border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-8">墓じまい体験談</p>
          <div className="relative mb-8">
            <Quote className="w-10 h-10 text-primary/15 mx-auto mb-4" />
            <p className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
              子供たちに、お墓の心配は<br />させたくなかった。
            </p>
          </div>
          <p className="text-xs text-muted-foreground mb-8">— 50代男性 · 東京都在住</p>
          <div className="w-px h-10 bg-border mx-auto mb-8" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            このような思いで墓じまいを決断された方々の体験談を、{STORY_COUNT}件掲載しています。
          </p>
        </div>
      </div>
    </section>
  )
}

// ── 案8: 麻色ミニマル ─────────────────────────────────────────
function Hero8() {
  return (
    <section className="bg-linen py-14 md:py-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">墓じまい体験談</p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
            実際に墓じまいを経験した方々の、
            <br className="hidden md:block" />リアルな声をお届けします。
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            遠方のお墓の管理、後継者問題、費用の不安…
            同じ悩みを乗り越えた方々の体験談をご覧ください。
          </p>
        </div>
      </div>
    </section>
  )
}

// ── 案9: タグクラウド背景型 ───────────────────────────────────
const BG_TAGS = [
  "遠方のお墓", "後継者不在", "子供に負担をかけたくない",
  "高齢で管理が困難", "費用が心配", "永代供養にしたい",
  "改葬の手続き", "石材店の選び方", "離檀料",
  "親族の説得", "お寺との交渉", "行政手続き",
  "無縁仏を避けたい", "遠距離の墓参り", "墓じまいの流れ",
]
function Hero9() {
  return (
    <section className="relative bg-white border-b border-border py-20 overflow-hidden">
      {/* 背景タグ */}
      <div className="absolute inset-0 flex flex-wrap gap-3 p-8 opacity-[0.06] pointer-events-none select-none" aria-hidden>
        {[...BG_TAGS, ...BG_TAGS].map((t, i) => (
          <span key={i} className="text-sm font-bold text-foreground bg-foreground/10 px-3 py-1 rounded-full whitespace-nowrap">{t}</span>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-5">墓じまい体験談</h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-8">
            実際に墓じまいを経験された方々のリアルな声。
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {REASONS.map((r) => (
              <span key={r} className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">{r}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── 案10: 写真グリッドモザイク ────────────────────────────────
function Hero10() {
  return (
    <section className="relative overflow-hidden h-72 md:h-96">
      {/* モザイク背景：同じ写真を3枚タイル */}
      <div className="absolute inset-0 grid grid-cols-3 gap-0.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="relative overflow-hidden">
            <Image
              src="/images/story-hero.jpg"
              alt=""
              fill
              className={`object-cover ${i === 1 ? "object-center" : i === 0 ? "object-left" : "object-right"}`}
            />
          </div>
        ))}
      </div>
      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      <span className="absolute top-4 right-4 text-white/40 text-xs z-10">※写真はイメージです</span>
      {/* テキスト */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur rounded-full text-white text-xs font-medium mb-5">
            <Heart className="w-3.5 h-3.5" />{STORY_COUNT}名の体験談を掲載
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            墓じまい体験談
          </h1>
          <p className="text-white/75 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            実際に墓じまいを経験された方々のリアルな声をお届けします。
          </p>
        </div>
      </div>
    </section>
  )
}

const HEROES = [Hero1, Hero2, Hero3, Hero4, Hero5, Hero6, Hero7, Hero8, Hero9, Hero10]

// ── ダミーカードプレビュー（レイアウトの続きを示す） ──────────
function DummyListPreview() {
  return (
    <div className="py-8 px-6 bg-gray-50 border-t border-dashed border-gray-200">
      <p className="text-[10px] text-gray-400 text-center mb-4">↓ 以下、体験談カード（案11レイアウト）が続く</p>
      <div className="flex gap-3 overflow-hidden opacity-40 pointer-events-none">
        {[1, 2, 3].map((i) => (
          <div key={i} className="shrink-0 w-64 bg-white rounded-xl overflow-hidden border border-border shadow-sm">
            <div className="h-32 bg-gray-200 relative overflow-hidden">
              <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
            </div>
            <div className="p-3">
              <div className="h-2.5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-2 bg-gray-100 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── ページ本体 ───────────────────────────────────────────────
export default function StoryListHeroPreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm py-3 px-6 flex gap-2 flex-wrap items-center">
        <Link href="/design-preview" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mr-2 shrink-0">
          <ChevronLeft className="w-4 h-4" />デザイン一覧
        </Link>
        <span className="text-gray-300">|</span>
        {DESIGNS.map((d) => (
          <a key={d.id} href={`#hero-${d.id}`} className="text-xs text-gray-600 hover:text-primary font-medium whitespace-nowrap px-2 py-1 rounded hover:bg-primary/5">
            案{d.id}
          </a>
        ))}
      </nav>

      {/* Page header */}
      <div className="py-10 px-6 text-center bg-white border-b">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Design Preview</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">体験談一覧 ヒーロー比較</h1>
        <p className="text-gray-500 text-sm mt-2">全10案</p>
      </div>

      {/* Each hero */}
      {DESIGNS.map((d, i) => {
        const HeroComponent = HEROES[i]
        return (
          <section key={d.id} id={`hero-${d.id}`} className={`py-14 ${i % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex items-start gap-3 mb-5">
                <span className="inline-flex items-center bg-white border border-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm shrink-0">
                  案 {d.id}
                </span>
                <div>
                  <p className="text-gray-800 font-semibold text-sm">{d.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{d.note}</p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <HeroComponent />
                <DummyListPreview />
              </div>
            </div>
          </section>
        )
      })}

      <div className="py-12 bg-gray-50 border-t text-center">
        <p className="text-gray-400 text-sm">体験談一覧 ヒーロー — 全10案</p>
      </div>
    </div>
  )
}
