// app/design-preview/story-collage/page.tsx
// ヒーローコラージュ背景 10パターン比較

import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "コラージュヒーロー 10パターン | プレビュー",
}

const IMGS = Array.from({ length: 18 }, (_, i) =>
  `/images/story-${String(i + 2).padStart(2, "0")}.jpg`
)

// 共通テキスト（左寄せ）
function LeftText() {
  return (
    <div className="max-w-xl">
      <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
        墓じまい体験談
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
        実際に墓じまいを経験した方々の、
        <br className="hidden md:block" />
        リアルな声をお届けします。
      </h1>
      <p className="text-muted-foreground text-sm leading-relaxed">
        遠方のお墓の管理、後継者問題、費用の不安…
        <br />
        同じ悩みを乗り越えた方々の体験談をご覧ください。
      </p>
    </div>
  )
}

// ── パターン1: 散らしポラロイド ──────────────────────────────
function Pattern1() {
  const items = [
    { i: 1,  top: "-5%",  right: "38%", w: 155, r: 7   },
    { i: 4,  top: "4%",   right: "23%", w: 195, r: -6  },
    { i: 7,  top: "-8%",  right: "11%", w: 170, r: 11  },
    { i: 2,  top: "-4%",  right: "0%",  w: 150, r: -10 },
    { i: 9,  top: "47%",  right: "32%", w: 175, r: -5  },
    { i: 12, top: "42%",  right: "18%", w: 210, r: 8   },
    { i: 15, top: "50%",  right: "2%",  w: 185, r: -4  },
    { i: 6,  top: "78%",  right: "27%", w: 165, r: 10  },
    { i: 16, top: "72%",  right: "10%", w: 185, r: -7  },
  ]
  return (
    <section className="relative overflow-hidden bg-linen py-14 md:py-20 border-b border-border">
      <div className="absolute inset-0 pointer-events-none select-none hidden md:block">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="absolute overflow-hidden rounded-xl shadow-md opacity-70"
            style={{
              top: item.top, right: item.right,
              width: item.w, height: Math.round(item.w * 0.65),
              transform: `rotate(${item.r}deg)`,
            }}
          >
            <Image src={IMGS[item.i]} alt="" fill className="object-cover" sizes="220px" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-linen via-linen/90 to-linen/10 pointer-events-none hidden md:block" />
      <div className="relative z-10 mx-auto max-w-6xl px-6"><LeftText /></div>
    </section>
  )
}

// ── パターン2: びっしりグリッド（隙間なし・回転なし） ────────
function Pattern2() {
  return (
    <section className="relative overflow-hidden bg-linen py-14 md:py-20 border-b border-border">
      <div
        className="absolute top-0 right-0 bottom-0 w-[50%] hidden md:grid pointer-events-none select-none"
        style={{ gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(3, 1fr)" }}
      >
        {IMGS.slice(0, 12).map((src, i) => (
          <div key={i} className="relative overflow-hidden">
            <Image src={src} alt="" fill className="object-cover" sizes="140px" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-linen via-linen/95 to-transparent pointer-events-none hidden md:block" />
      <div className="relative z-10 mx-auto max-w-6xl px-6"><LeftText /></div>
    </section>
  )
}

// ── パターン3: 斜めストリップ ─────────────────────────────────
function Pattern3() {
  const items = [
    { i: 0,  left: "38%", top: "-20%", w: 195, r: -28 },
    { i: 3,  left: "49%", top: "-8%",  w: 190, r: -28 },
    { i: 6,  left: "60%", top: "4%",   w: 188, r: -28 },
    { i: 9,  left: "71%", top: "16%",  w: 192, r: -28 },
    { i: 12, left: "82%", top: "28%",  w: 190, r: -28 },
    { i: 15, left: "93%", top: "40%",  w: 188, r: -28 },
    { i: 1,  left: "43%", top: "32%",  w: 190, r: -28 },
    { i: 4,  left: "54%", top: "44%",  w: 186, r: -28 },
    { i: 7,  left: "65%", top: "56%",  w: 192, r: -28 },
    { i: 10, left: "76%", top: "68%",  w: 188, r: -28 },
  ]
  return (
    <section className="relative overflow-hidden bg-linen py-14 md:py-20 border-b border-border">
      <div className="absolute inset-0 pointer-events-none select-none hidden md:block">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="absolute overflow-hidden rounded-lg shadow-md opacity-65"
            style={{
              left: item.left, top: item.top,
              width: item.w, height: Math.round(item.w * 0.65),
              transform: `rotate(${item.r}deg)`,
            }}
          >
            <Image src={IMGS[item.i]} alt="" fill className="object-cover" sizes="200px" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-linen via-linen/88 to-linen/20 pointer-events-none hidden md:block" />
      <div className="relative z-10 mx-auto max-w-6xl px-6"><LeftText /></div>
    </section>
  )
}

// ── パターン4: 重ね合わせ（大小混在・重なり多め） ────────────
function Pattern4() {
  const items = [
    { i: 0,  top: "8%",   right: "26%", w: 275, r: -3  },
    { i: 5,  top: "-10%", right: "6%",  w: 315, r: 6   },
    { i: 10, top: "38%",  right: "18%", w: 255, r: -8  },
    { i: 15, top: "52%",  right: "-2%", w: 285, r: 4   },
    { i: 3,  top: "18%",  right: "43%", w: 195, r: 10  },
    { i: 8,  top: "62%",  right: "36%", w: 215, r: -5  },
  ]
  return (
    <section className="relative overflow-hidden bg-linen py-14 md:py-20 border-b border-border">
      <div className="absolute inset-0 pointer-events-none select-none hidden md:block">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="absolute overflow-hidden rounded-xl shadow-lg opacity-65"
            style={{
              top: item.top, right: item.right,
              width: item.w, height: Math.round(item.w * 0.65),
              transform: `rotate(${item.r}deg)`,
              zIndex: idx,
            }}
          >
            <Image src={IMGS[item.i]} alt="" fill className="object-cover" sizes="320px" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-linen via-linen/92 to-linen/15 pointer-events-none hidden md:block" />
      <div className="relative z-10 mx-auto max-w-6xl px-6"><LeftText /></div>
    </section>
  )
}

// ── パターン5: 上下バンド（テキスト中央サンドイッチ） ────────
function Pattern5() {
  return (
    <section
      className="relative overflow-hidden bg-linen border-b border-border"
      style={{ minHeight: 320 }}
    >
      {/* 上バンド */}
      <div className="absolute top-0 left-0 right-0 h-24 hidden md:flex pointer-events-none select-none opacity-55">
        {IMGS.slice(0, 9).map((src, i) => (
          <div key={i} className="relative flex-1 overflow-hidden">
            <Image src={src} alt="" fill className="object-cover" sizes="150px" />
          </div>
        ))}
      </div>
      {/* 下バンド */}
      <div className="absolute bottom-0 left-0 right-0 h-24 hidden md:flex pointer-events-none select-none opacity-55">
        {IMGS.slice(9, 18).map((src, i) => (
          <div key={i} className="relative flex-1 overflow-hidden">
            <Image src={src} alt="" fill className="object-cover" sizes="150px" />
          </div>
        ))}
      </div>
      {/* 上下フェード */}
      <div className="absolute inset-0 bg-gradient-to-b from-linen/70 via-transparent to-linen/70 pointer-events-none hidden md:block" />
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-24 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
            墓じまい体験談
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
            実際に墓じまいを経験した方々の、
            <br />
            リアルな声をお届けします。
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            遠方のお墓の管理、後継者問題、費用の不安…
            <br />
            同じ悩みを乗り越えた方々の体験談をご覧ください。
          </p>
        </div>
      </div>
    </section>
  )
}

// ── パターン6: フルモザイク全面（6×3グリッド＋オーバーレイ） ──
function Pattern6() {
  return (
    <section className="relative overflow-hidden border-b border-border py-16 md:py-24">
      <div
        className="absolute inset-0 grid pointer-events-none select-none"
        style={{ gridTemplateColumns: "repeat(6, 1fr)", gridTemplateRows: "repeat(3, 1fr)" }}
      >
        {IMGS.slice(0, 18).map((src, i) => (
          <div key={i} className="relative overflow-hidden">
            <Image src={src} alt="" fill className="object-cover" sizes="200px" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-foreground/72" />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="max-w-xl">
          <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">
            墓じまい体験談
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
            実際に墓じまいを経験した方々の、
            <br className="hidden md:block" />
            リアルな声をお届けします。
          </h1>
          <p className="text-white/75 text-sm leading-relaxed">
            遠方のお墓の管理、後継者問題、費用の不安…
            <br />
            同じ悩みを乗り越えた方々の体験談をご覧ください。
          </p>
        </div>
      </div>
    </section>
  )
}

// ── パターン7: ポラロイド白枠 ─────────────────────────────────
function Pattern7() {
  const items = [
    { i: 2,  top: "4%",   right: "39%", w: 150, r: 8   },
    { i: 5,  top: "-8%",  right: "25%", w: 175, r: -7  },
    { i: 8,  top: "2%",   right: "11%", w: 168, r: 12  },
    { i: 11, top: "-6%",  right: "-1%", w: 158, r: -11 },
    { i: 0,  top: "48%",  right: "34%", w: 160, r: -6  },
    { i: 14, top: "44%",  right: "19%", w: 190, r: 5   },
    { i: 17, top: "52%",  right: "3%",  w: 172, r: -3  },
    { i: 6,  top: "77%",  right: "27%", w: 158, r: 9   },
  ]
  return (
    <section className="relative overflow-hidden bg-linen py-14 md:py-20 border-b border-border">
      <div className="absolute inset-0 pointer-events-none select-none hidden md:block">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="absolute bg-white shadow-xl opacity-75"
            style={{
              top: item.top, right: item.right,
              width: item.w + 16,
              padding: "7px 7px 0",
              transform: `rotate(${item.r}deg)`,
            }}
          >
            <div
              className="relative overflow-hidden"
              style={{ width: item.w, height: Math.round(item.w * 0.65) }}
            >
              <Image src={IMGS[item.i]} alt="" fill className="object-cover" sizes="200px" />
            </div>
            <div style={{ height: 22 }} />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-linen via-linen/90 to-linen/10 pointer-events-none hidden md:block" />
      <div className="relative z-10 mx-auto max-w-6xl px-6"><LeftText /></div>
    </section>
  )
}

// ── パターン8: 細密タイル（極小タイル、右半分） ───────────────
function Pattern8() {
  const tiles = [...IMGS, ...IMGS].slice(0, 35)
  return (
    <section className="relative overflow-hidden bg-linen py-14 md:py-20 border-b border-border">
      <div
        className="absolute top-0 right-0 bottom-0 w-[52%] hidden md:grid pointer-events-none select-none opacity-80"
        style={{ gridTemplateColumns: "repeat(7, 1fr)", gridTemplateRows: "repeat(5, 1fr)" }}
      >
        {tiles.map((src, i) => (
          <div key={i} className="relative overflow-hidden">
            <Image src={src} alt="" fill className="object-cover" sizes="80px" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-linen via-linen/95 to-transparent pointer-events-none hidden md:block" />
      <div className="relative z-10 mx-auto max-w-6xl px-6"><LeftText /></div>
    </section>
  )
}

// ── パターン9: 縦3列（フルハイト帯） ─────────────────────────
function Pattern9() {
  return (
    <section className="relative overflow-hidden bg-linen py-14 md:py-20 border-b border-border">
      <div className="absolute top-0 right-0 bottom-0 hidden md:flex pointer-events-none select-none" style={{ width: "52%" }}>
        {/* 左列: 上下2枚 */}
        <div className="flex flex-col flex-1 opacity-60">
          <div className="relative flex-1 overflow-hidden">
            <Image src={IMGS[2]} alt="" fill className="object-cover" sizes="200px" />
          </div>
          <div className="relative flex-1 overflow-hidden">
            <Image src={IMGS[8]} alt="" fill className="object-cover" sizes="200px" />
          </div>
        </div>
        {/* 中央列: 上下3枚 */}
        <div className="flex flex-col flex-1 opacity-70">
          <div className="relative overflow-hidden" style={{ flex: 1.2 }}>
            <Image src={IMGS[5]} alt="" fill className="object-cover" sizes="200px" />
          </div>
          <div className="relative overflow-hidden" style={{ flex: 0.9 }}>
            <Image src={IMGS[11]} alt="" fill className="object-cover" sizes="200px" />
          </div>
          <div className="relative overflow-hidden" style={{ flex: 1 }}>
            <Image src={IMGS[14]} alt="" fill className="object-cover" sizes="200px" />
          </div>
        </div>
        {/* 右列: 上下2枚 */}
        <div className="flex flex-col flex-1 opacity-60">
          <div className="relative overflow-hidden" style={{ flex: 0.85 }}>
            <Image src={IMGS[0]} alt="" fill className="object-cover" sizes="200px" />
          </div>
          <div className="relative overflow-hidden" style={{ flex: 1.15 }}>
            <Image src={IMGS[16]} alt="" fill className="object-cover" sizes="200px" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-linen via-linen/92 to-transparent pointer-events-none hidden md:block" />
      <div className="relative z-10 mx-auto max-w-6xl px-6"><LeftText /></div>
    </section>
  )
}

// ── パターン10: 千鳥格子（ブリック配置・回転なし） ───────────
function Pattern10() {
  const rowH = 37  // % each row
  const imgW = 185
  // row1: right端から左へ並ぶ
  const row1 = [0, 3, 6, 9].map((i, col) => ({
    i, top: `-5%`, right: `${col * 17}%`, w: imgW, r: 0,
  }))
  // row2: 半コマずらし
  const row2 = [1, 4, 7, 10].map((i, col) => ({
    i, top: `${rowH - 5}%`, right: `${col * 17 - 8}%`, w: imgW, r: 0,
  }))
  // row3
  const row3 = [2, 5, 8, 11].map((i, col) => ({
    i, top: `${rowH * 2 - 5}%`, right: `${col * 17}%`, w: imgW, r: 0,
  }))
  const all = [...row1, ...row2, ...row3]
  return (
    <section className="relative overflow-hidden bg-linen py-14 md:py-20 border-b border-border">
      <div className="absolute inset-0 pointer-events-none select-none hidden md:block">
        {all.map((item, idx) => (
          <div
            key={idx}
            className="absolute overflow-hidden rounded-md shadow-sm opacity-62"
            style={{
              top: item.top, right: item.right,
              width: item.w, height: Math.round(item.w * 0.65),
            }}
          >
            <Image src={IMGS[item.i]} alt="" fill className="object-cover" sizes="200px" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-linen via-linen/90 to-linen/15 pointer-events-none hidden md:block" />
      <div className="relative z-10 mx-auto max-w-6xl px-6"><LeftText /></div>
    </section>
  )
}

// ── パターン6 オーバーレイ5段階 ──────────────────────────────

function MosaicGrid() {
  return (
    <div
      className="absolute inset-0 grid pointer-events-none select-none"
      style={{ gridTemplateColumns: "repeat(6, 1fr)", gridTemplateRows: "repeat(3, 1fr)" }}
    >
      {IMGS.slice(0, 18).map((src, i) => (
        <div key={i} className="relative overflow-hidden">
          <Image src={src} alt="" fill className="object-cover" sizes="200px" />
        </div>
      ))}
    </div>
  )
}

function MosaicText({ white = true }: { white?: boolean }) {
  return (
    <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-24">
      <div className="max-w-xl">
        <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${white ? "text-white/60" : "text-primary"}`}>
          墓じまい体験談
        </p>
        <h1 className={`text-3xl md:text-4xl font-bold mb-5 leading-tight ${white ? "text-white" : "text-foreground"}`}>
          実際に墓じまいを経験した方々の、
          <br className="hidden md:block" />
          リアルな声をお届けします。
        </h1>
        <p className={`text-sm leading-relaxed ${white ? "text-white/75" : "text-muted-foreground"}`}>
          遠方のお墓の管理、後継者問題、費用の不安…
          <br />
          同じ悩みを乗り越えた方々の体験談をご覧ください。
        </p>
      </div>
    </div>
  )
}

// 6-A: 濃いめ（現行 /72）
function Pattern6A() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <MosaicGrid />
      <div className="absolute inset-0 bg-foreground/72" />
      <MosaicText />
    </section>
  )
}

// 6-B: 中くらい（/55）
function Pattern6B() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <MosaicGrid />
      <div className="absolute inset-0 bg-foreground/55" />
      <MosaicText />
    </section>
  )
}

// 6-C: 薄め（/38）
function Pattern6C() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <MosaicGrid />
      <div className="absolute inset-0 bg-foreground/38" />
      <MosaicText />
    </section>
  )
}

// 6-D: リネン（linen/80）温かみのある白っぽいオーバーレイ
function Pattern6D() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <MosaicGrid />
      <div className="absolute inset-0 bg-linen/82" />
      <MosaicText white={false} />
    </section>
  )
}

// 6-E: グラデーション（左:濃 → 右:薄）
function Pattern6E() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <MosaicGrid />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/55 to-foreground/20" />
      <MosaicText />
    </section>
  )
}

// ──────────────────────────────────────────────────────────────

const OVERLAY_PATTERNS = [
  { id: "6-A", name: "濃いめ（現行）",       note: "オーバーレイ /72 — 写真はほぼ見えない",           component: Pattern6A },
  { id: "6-B", name: "中くらい",             note: "オーバーレイ /55 — 写真がうっすら透ける",          component: Pattern6B },
  { id: "6-C", name: "薄め",                 note: "オーバーレイ /38 — 写真がかなり見える",            component: Pattern6C },
  { id: "6-D", name: "リネン（明るい）",     note: "linen /82 — 温かみある白系。テキストは暗色",       component: Pattern6D },
  { id: "6-E", name: "グラデーション",       note: "左:濃 → 右:薄 — 写真が右側に向けて浮き出る",      component: Pattern6E },
]

const PATTERNS = [
  { id: 1,  name: "散らしポラロイド",        note: "角度・位置バラバラ。現在に近いスタイル",           component: Pattern1 },
  { id: 2,  name: "びっしりグリッド",        note: "隙間ゼロ・回転なし。整然と詰め込んだ印象",         component: Pattern2 },
  { id: 3,  name: "斜めストリップ",          note: "画像を斜め方向に並べたダイナミックな配置",         component: Pattern3 },
  { id: 4,  name: "重ね合わせ（大写し）",    note: "大きめ画像が複数重なる。迫力重視",                 component: Pattern4 },
  { id: 5,  name: "上下バンド",              note: "上下に細い写真帯。テキストがセンターに浮かぶ",     component: Pattern5 },
  { id: 6,  name: "フルモザイク＋オーバーレイ", note: "全面を写真タイルで埋めて暗めのオーバーレイ",   component: Pattern6 },
  { id: 7,  name: "ポラロイド白枠",          note: "白い枠付きで写真展・ウォール風",                  component: Pattern7 },
  { id: 8,  name: "細密タイル",              note: "小さいタイルを大量に敷き詰め",                    component: Pattern8 },
  { id: 9,  name: "縦3列帯",                note: "高さいっぱいの帯を3列。落ち着いた縦分割",          component: Pattern9 },
  { id: 10, name: "千鳥格子",               note: "レンガ積み風オフセット配置。均等だが動きがある",   component: Pattern10 },
]

function DummyCards() {
  return (
    <div className="py-6 px-6 bg-gray-50 border-t border-dashed border-gray-200">
      <p className="text-[10px] text-gray-400 text-center mb-3">↓ 体験談カードが続く</p>
      <div className="flex gap-3 overflow-hidden opacity-30 pointer-events-none">
        {[IMGS[0], IMGS[3], IMGS[6]].map((src, i) => (
          <div key={i} className="shrink-0 w-60 bg-white rounded-xl overflow-hidden border border-border shadow-sm">
            <div className="h-28 relative overflow-hidden">
              <Image src={src} alt="" fill className="object-cover" sizes="240px" />
            </div>
            <div className="p-3 space-y-1.5">
              <div className="h-2.5 bg-gray-200 rounded w-3/4" />
              <div className="h-2 bg-gray-100 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function StoryCollagePreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm py-3 px-6 flex gap-2 flex-wrap items-center">
        <Link
          href="/design-preview"
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mr-2 shrink-0"
        >
          <ChevronLeft className="w-4 h-4" />デザイン一覧
        </Link>
        <span className="text-gray-300">|</span>
        {PATTERNS.map((p) => (
          <a
            key={p.id}
            href={`#pattern-${p.id}`}
            className="text-xs text-gray-600 hover:text-primary font-medium whitespace-nowrap px-2 py-1 rounded hover:bg-primary/5"
          >
            {p.id}. {p.name}
          </a>
        ))}
      </nav>

      {/* Page header */}
      <div className="py-10 px-6 text-center bg-white border-b">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Design Preview</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">コラージュヒーロー 10パターン</h1>
        <p className="text-gray-400 text-sm mt-2">体験談写真を背景に散りばめたヒーローバリエーション比較</p>
      </div>

      {/* 6番オーバーレイ比較 */}
      <div className="py-10 bg-primary/5 border-b">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-flex items-center bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm shrink-0">
              6番 オーバーレイ比較
            </span>
            <p className="text-gray-500 text-sm">フルモザイクのオーバーレイ濃度・色 5パターン</p>
          </div>
          <div className="space-y-8">
            {OVERLAY_PATTERNS.map((p, i) => {
              const HeroComponent = p.component
              return (
                <div key={p.id} id={`overlay-${p.id}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <span className="inline-flex items-center bg-white border border-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm shrink-0">
                      {p.id}
                    </span>
                    <div>
                      <p className="text-gray-800 font-semibold text-sm">{p.name}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{p.note}</p>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                    <HeroComponent />
                    <DummyCards />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Each pattern */}
      {PATTERNS.map((p, i) => {
        const HeroComponent = p.component
        return (
          <section
            key={p.id}
            id={`pattern-${p.id}`}
            className={`py-12 ${i % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
          >
            <div className="max-w-5xl mx-auto px-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="inline-flex items-center bg-white border border-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm shrink-0">
                  {p.id}
                </span>
                <div>
                  <p className="text-gray-800 font-semibold text-sm">{p.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{p.note}</p>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <HeroComponent />
                <DummyCards />
              </div>
            </div>
          </section>
        )
      })}

      <div className="py-10 bg-gray-50 border-t text-center">
        <p className="text-gray-400 text-sm">コラージュヒーロー — 全10パターン</p>
      </div>
    </div>
  )
}
