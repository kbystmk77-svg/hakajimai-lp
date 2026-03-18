import Image from "next/image";
import { MapPin, ArrowRight, Quote, ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ヒーローデザイン案 | プレビュー",
};

const sd = {
  age: "50代", gender: "男性", address: "東京都",
  graveLocation: "富山県", destination: "東京都",
  reasons: ["遠方", "子供世代に負担をかけたくない"],
};

const designs = [
  { id: "design-1", num: "1", name: "ボトムグラデーション", note: "ベース・下部集約", bg: "bg-gray-100", link: "1" },
  { id: "design-2", num: "2", name: "ミニマル大見出し",    note: "案1ベース・タグ省略・文字大",   bg: "bg-white",    link: "2" },
  { id: "design-3", num: "3", name: "アクセントライン",    note: "案1ベース・左ボーダー強調",     bg: "bg-gray-100", link: "3" },
  { id: "design-4", num: "4", name: "ラベル＋情報バー",   note: "案1ベース・上部ラベル・下部バー", bg: "bg-white",   link: "4" },
  { id: "design-5", num: "5", name: "アクセントライン（属性＋霊園情報）", note: "案3ベース・属性行＋移転先を太字で", bg: "bg-gray-100", link: "5" },
];

// ── 各ヒーローモックアップ ────────────────────────────────────

function MockHero1() {
  return (
    <div className="relative w-full h-[420px] overflow-hidden rounded-2xl shadow-2xl">
      <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
      <PhotoNote />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 px-10 pb-9 pt-6">
        <p className="text-white/50 text-xs mb-2 tracking-wide">墓じまい体験談</p>
        <h2 className="text-white text-3xl font-bold mb-4 leading-tight">
          子供たちに、お墓の心配は<br />させたくなかった。
        </h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {sd.reasons.map((r) => <span key={r} className="bg-white/20 text-white rounded-full text-xs px-3 py-1 backdrop-blur-sm">{r}</span>)}
        </div>
        <div className="flex items-center gap-2 text-white/80 text-sm">
          <MapPin className="w-4 h-4 shrink-0" />
          <span>{sd.graveLocation}<ArrowRight className="w-3 h-3 inline mx-1 opacity-60" />{sd.destination}</span>
        </div>
      </div>
    </div>
  );
}

function MockHero2() {
  return (
    <div className="relative w-full h-[420px] overflow-hidden rounded-2xl shadow-2xl">
      <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
      <PhotoNote />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 px-10 pb-9 pt-6">
        <span className="inline-block bg-white/20 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
          {sd.age} · {sd.gender} · {sd.address}在住
        </span>
        <h2 className="text-white text-4xl font-bold leading-tight mb-4">
          子供たちに、<br />お墓の心配は<br />させたくなかった。
        </h2>
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <MapPin className="w-4 h-4 shrink-0" />
          <span>{sd.graveLocation}<ArrowRight className="w-3 h-3 inline mx-1 opacity-60" />{sd.destination}</span>
        </div>
      </div>
    </div>
  );
}

function MockHero3() {
  return (
    <div className="relative w-full h-[420px] overflow-hidden rounded-2xl shadow-2xl">
      <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
      <PhotoNote />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 px-10 pb-9 pt-6">
        <div className="border-l-4 border-amber-400 pl-5">
          <p className="text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">STORY 01</p>
          <h2 className="text-white text-3xl font-bold leading-tight mb-4">
            子供たちに、お墓の心配は<br />させたくなかった。
          </h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {sd.reasons.map((r) => <span key={r} className="bg-white/20 text-white rounded-full text-xs px-3 py-1 backdrop-blur-sm">{r}</span>)}
          </div>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{sd.graveLocation}<ArrowRight className="w-3 h-3 inline mx-1 opacity-60" />{sd.destination}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockHero4() {
  return (
    <div className="relative w-full h-[420px] overflow-hidden rounded-2xl shadow-2xl">
      <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
      <PhotoNote />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-black/40" />
      <div className="absolute top-0 left-0 right-0 pt-6 px-10">
        <span className="text-white/60 text-xs tracking-widest uppercase">墓じまい体験談 — No.01</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 px-10 pb-9">
        <h2 className="text-white text-3xl font-bold leading-tight mb-4">
          子供たちに、お墓の心配は<br />させたくなかった。
        </h2>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur rounded-full px-4 py-1.5 text-white text-xs">
            <MapPin className="w-3.5 h-3.5" />
            <span>{sd.graveLocation}<ArrowRight className="w-3 h-3 inline mx-1 opacity-70" />{sd.destination}</span>
          </div>
          {sd.reasons.map((r) => <span key={r} className="bg-white/10 backdrop-blur text-white/90 rounded-full text-xs px-3 py-1.5 border border-white/20">{r}</span>)}
        </div>
      </div>
    </div>
  );
}

function MockHero5() {
  return (
    <div className="relative w-full h-[420px] overflow-hidden rounded-2xl shadow-2xl">
      <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
      <PhotoNote />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 px-10 pb-9 pt-6">
        <div className="border-l-4 border-amber-400 pl-5">
          <p className="text-amber-400 text-xs font-bold tracking-wide mb-3">
            {sd.age} · {sd.gender} · {sd.address}在住
          </p>
          <h2 className="text-white text-3xl font-bold leading-tight mb-4">
            子供たちに、お墓の心配は<br />させたくなかった。
          </h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {sd.reasons.map((r) => <span key={r} className="bg-white/20 text-white rounded-full text-xs px-3 py-1 backdrop-blur-sm">{r}</span>)}
          </div>
          <div className="flex items-center gap-2 text-white text-sm font-bold">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>富山県（公営霊園）<ArrowRight className="w-3 h-3 inline mx-1 opacity-60" />東京都（永代供養墓）</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhotoNote() {
  return (
    <span className="absolute top-4 right-4 z-10 text-white/60 text-xs">
      ※写真はイメージです
    </span>
  )
}

const MOCKS = [MockHero1, MockHero2, MockHero3, MockHero4, MockHero5];

// ─────────────────────────────────────────────────────────────

export default function StoryDesignsPreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm py-3 px-6 flex gap-3 flex-wrap items-center">
        <a href="/design-preview" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mr-2 shrink-0">
          <ChevronLeft className="w-4 h-4" />デザイン一覧
        </a>
        <span className="text-gray-300">|</span>
        {designs.map((d) => (
          <a key={d.id} href={`#${d.id}`} className="text-sm text-gray-600 hover:text-primary font-medium whitespace-nowrap px-2 py-1 rounded hover:bg-primary/5">
            案{d.num}: {d.name}
          </a>
        ))}
      </nav>

      {/* Page Header */}
      <div className="py-10 px-6 text-center bg-white border-b">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Design Preview</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">体験談ページ ヒーローデザイン案</h1>
        <p className="text-gray-500 text-sm mt-2">全6案を比較できます。各案の「詳細を見る」から実際のページを確認できます。</p>
      </div>

      {designs.map((d, i) => {
        const MockComponent = MOCKS[i];
        return (
          <section key={d.id} id={d.id} className={`py-12 ${d.bg}`}>
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-5">
                <span className="inline-flex items-center bg-white border border-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                  案 {d.num}
                </span>
                <span className="text-gray-800 font-semibold text-sm">{d.name}</span>
                <span className="text-gray-400 text-xs">— {d.note}</span>
              </div>
              <MockComponent />
              <div className="mt-4 text-right">
                <a
                  href={`/design-preview/story-detail/${d.link}`}
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
                >
                  このデザインで詳細を見る
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>
        );
      })}

      <div className="py-12 bg-gray-50 border-t text-center">
        <p className="text-gray-400 text-sm">ヒーローデザイン案 — 全5案</p>
      </div>
    </div>
  );
}
