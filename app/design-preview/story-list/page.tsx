// app/design-preview/story-list/page.tsx
// 体験談一覧 レイアウト 10案比較（ダミー20件）

import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { MapPin, ArrowRight, ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "体験談一覧 レイアウト比較 | プレビュー",
}

// ── ダミーデータ 20件 ─────────────────────────────────────────
const DUMMY = [
  { id:  1, age: "50代", gender: "男性", address: "東京都",   graveLocation: "富山県", destination: "東京都",   reasons: ["遠方", "子供に負担をかけたくない"],  catchphrase: "子供たちに、お墓の心配はさせたくなかった。" },
  { id:  2, age: "60代", gender: "女性", address: "大阪府",   graveLocation: "山形県", destination: "大阪府",   reasons: ["後継者不在"],                          catchphrase: "継ぐ人がいない。だから、決断しました。" },
  { id:  3, age: "40代", gender: "男性", address: "神奈川県", graveLocation: "青森県", destination: "神奈川県", reasons: ["遠方", "費用負担"],                     catchphrase: "年に一度の帰省が、重荷になっていました。" },
  { id:  4, age: "70代", gender: "女性", address: "愛知県",   graveLocation: "長崎県", destination: "愛知県",   reasons: ["高齢", "管理困難"],                    catchphrase: "足が悪くなって、もうお墓まで行けない。" },
  { id:  5, age: "50代", gender: "女性", address: "福岡県",   graveLocation: "秋田県", destination: "福岡県",   reasons: ["遠方", "後継者不在"],                  catchphrase: "一人っ子だから、全部自分で決めるしかない。" },
  { id:  6, age: "60代", gender: "男性", address: "埼玉県",   graveLocation: "岩手県", destination: "埼玉県",   reasons: ["子供に負担をかけたくない"],            catchphrase: "息子夫婦に、苦労はかけたくなかった。" },
  { id:  7, age: "40代", gender: "女性", address: "千葉県",   graveLocation: "島根県", destination: "千葉県",   reasons: ["遠方", "墓の老朽化"],                  catchphrase: "墓石のひびを見たとき、決心がつきました。" },
  { id:  8, age: "50代", gender: "男性", address: "京都府",   graveLocation: "北海道", destination: "京都府",   reasons: ["遠方", "費用負担"],                    catchphrase: "北海道まで、もう行けなくなっていた。" },
  { id:  9, age: "60代", gender: "女性", address: "兵庫県",   graveLocation: "鹿児島県", destination: "兵庫県", reasons: ["遠方", "後継者不在"],                  catchphrase: "鹿児島のお墓、ずっと気になっていました。" },
  { id: 10, age: "30代", gender: "男性", address: "静岡県",   graveLocation: "沖縄県", destination: "静岡県",   reasons: ["遠方", "費用負担", "子供に負担をかけたくない"], catchphrase: "親の代から先送りにしてきた問題に向き合った。" },
  { id: 11, age: "70代", gender: "男性", address: "広島県",   graveLocation: "宮崎県", destination: "広島県",   reasons: ["高齢", "管理困難"],                    catchphrase: "自分が元気なうちに、けじめをつけたかった。" },
  { id: 12, age: "50代", gender: "女性", address: "宮城県",   graveLocation: "長野県", destination: "宮城県",   reasons: ["後継者不在", "遠方"],                  catchphrase: "兄弟も遠く、頼れる人がいなかった。" },
  { id: 13, age: "60代", gender: "男性", address: "茨城県",   graveLocation: "愛媛県", destination: "茨城県",   reasons: ["費用負担", "管理困難"],                catchphrase: "維持費だけで年に数万円。もう限界でした。" },
  { id: 14, age: "40代", gender: "女性", address: "栃木県",   graveLocation: "大分県", destination: "栃木県",   reasons: ["遠方"],                                catchphrase: "遠い実家のお墓に、罪悪感を感じていた。" },
  { id: 15, age: "50代", gender: "男性", address: "群馬県",   graveLocation: "高知県", destination: "群馬県",   reasons: ["後継者不在", "費用負担"],              catchphrase: "子供は県外。お墓を残しても誰も来られない。" },
  { id: 16, age: "60代", gender: "女性", address: "岡山県",   graveLocation: "新潟県", destination: "岡山県",   reasons: ["遠方", "高齢"],                        catchphrase: "夫が亡くなり、一人ではもう無理でした。" },
  { id: 17, age: "40代", gender: "男性", address: "長野県",   graveLocation: "徳島県", destination: "長野県",   reasons: ["遠方", "管理困難"],                    catchphrase: "転勤族で、ずっとお墓の近くに住めなかった。" },
  { id: 18, age: "50代", gender: "女性", address: "岐阜県",   graveLocation: "山口県", destination: "岐阜県",   reasons: ["後継者不在"],                          catchphrase: "誰も継がないなら、きちんと終わらせたい。" },
  { id: 19, age: "70代", gender: "女性", address: "奈良県",   graveLocation: "佐賀県", destination: "奈良県",   reasons: ["高齢", "遠方", "費用負担"],             catchphrase: "80歳になる前に、自分の手で決めておきたい。" },
  { id: 20, age: "60代", gender: "男性", address: "滋賀県",   graveLocation: "熊本県", destination: "滋賀県",   reasons: ["遠方", "子供に負担をかけたくない"],    catchphrase: "熊本に一度も行けないまま、5年が経っていた。" },
]

type Story = typeof DUMMY[number]

const DESIGNS = [
  { id: "1",  name: "3列グリッド（現行）",       note: "標準3カラム。端数は左寄り" },
  { id: "2",  name: "2列グリッド（大カード）",   note: "カードが大きく読みやすい" },
  { id: "3",  name: "横スクロール S",             note: "コンパクト幅で一覧性高い" },
  { id: "4",  name: "横スクロール L",             note: "ゆったり幅で写真が映える" },
  { id: "5",  name: "フィーチャー＋3列",         note: "1件目大・残り3列グリッド" },
  { id: "6",  name: "リスト形式",                 note: "横長カード。情報が見やすい" },
  { id: "7",  name: "交互マガジン",               note: "1大＋2小を交互に並べる" },
  { id: "8",  name: "4列コンパクト",             note: "一覧性最高。カード枚数多め向け" },
  { id: "9",  name: "縦長2列",                   note: "縦長カードで写真インパクト大" },
  { id: "10", name: "横スクロール＋下グリッド",         note: "ピックアップ＋残りグリッド" },
  { id: "11", name: "横スクロール＋リスト（PC2列）", note: "ピックアップ＋残りをリスト形式に" },
]

// ── 共通カードパーツ ──────────────────────────────────────────

function CardImage({ h = "h-40" }: { h?: string }) {
  return (
    <div className={`relative ${h} overflow-hidden`}>
      <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  )
}

function CardOverlay({ story }: { story: Story }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-3">
      <p className="text-white/70 text-[10px] mb-0.5">{story.age} · {story.gender} · {story.address}在住</p>
      <p className="text-white text-xs font-bold leading-snug line-clamp-2">{story.catchphrase}</p>
    </div>
  )
}

function CardBody({ story, compact = false }: { story: Story; compact?: boolean }) {
  return (
    <div className={compact ? "p-3" : "p-4"}>
      <div className="flex flex-wrap gap-1 mb-2">
        {story.reasons.map((r) => (
          <span key={r} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{r}</span>
        ))}
      </div>
      <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
        <MapPin className="w-3 h-3 shrink-0" />
        <span>{story.graveLocation}<ArrowRight className="w-2.5 h-2.5 inline mx-0.5 opacity-50" />{story.destination}</span>
      </div>
    </div>
  )
}

// ── 案1: 3列グリッド（現行） ─────────────────────────────────
function Layout1() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {DUMMY.map((s) => (
        <div key={s.id} className="bg-white rounded-xl overflow-hidden border border-border shadow-sm">
          <div className="relative h-40 overflow-hidden">
            <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <CardOverlay story={s} />
          </div>
          <CardBody story={s} />
        </div>
      ))}
    </div>
  )
}

// ── 案2: 2列グリッド（大カード） ─────────────────────────────
function Layout2() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {DUMMY.map((s) => (
        <div key={s.id} className="bg-white rounded-xl overflow-hidden border border-border shadow-sm">
          <div className="relative h-52 overflow-hidden">
            <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-white/70 text-xs mb-1">{s.age} · {s.gender} · {s.address}在住</p>
              <p className="text-white text-sm font-bold leading-snug line-clamp-2">{s.catchphrase}</p>
            </div>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {s.reasons.map((r) => (
                <span key={r} className="text-xs bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">{r}</span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{s.graveLocation}<ArrowRight className="w-3 h-3 inline mx-1 opacity-50" />{s.destination}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── 案3: 横スクロール S ───────────────────────────────────────
function Layout3() {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "thin" }}>
      {DUMMY.map((s) => (
        <div key={s.id} className="shrink-0 w-52 snap-start bg-white rounded-xl overflow-hidden border border-border shadow-sm">
          <div className="relative h-36 overflow-hidden">
            <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <CardOverlay story={s} />
          </div>
          <CardBody story={s} compact />
        </div>
      ))}
    </div>
  )
}

// ── 案4: 横スクロール L ───────────────────────────────────────
function Layout4() {
  return (
    <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "thin" }}>
      {DUMMY.map((s) => (
        <div key={s.id} className="shrink-0 w-80 snap-start bg-white rounded-xl overflow-hidden border border-border shadow-sm">
          <div className="relative h-52 overflow-hidden">
            <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white/70 text-xs mb-1">{s.age} · {s.gender} · {s.address}在住</p>
              <p className="text-white text-sm font-bold leading-snug line-clamp-2">{s.catchphrase}</p>
            </div>
          </div>
          <div className="p-4">
            <div className="flex flex-wrap gap-1.5 mb-2">
              {s.reasons.map((r) => (
                <span key={r} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{r}</span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{s.graveLocation}<ArrowRight className="w-3 h-3 inline mx-1 opacity-50" />{s.destination}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── 案5: フィーチャー＋3列 ────────────────────────────────────
function Layout5() {
  const [first, ...rest] = DUMMY
  return (
    <div className="space-y-4">
      {/* フィーチャーカード */}
      <div className="bg-white rounded-xl overflow-hidden border border-border shadow-sm">
        <div className="relative h-72 overflow-hidden">
          <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <p className="text-amber-400 text-xs font-bold mb-2">{first.age} · {first.gender} · {first.address}在住</p>
            <p className="text-white text-2xl font-bold leading-snug mb-3">{first.catchphrase}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {first.reasons.map((r) => (
                <span key={r} className="text-xs bg-white/20 text-white px-3 py-1 rounded-full">{r}</span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 text-white/80 text-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>{first.graveLocation}<ArrowRight className="w-3 h-3 inline mx-1 opacity-50" />{first.destination}</span>
            </div>
          </div>
        </div>
      </div>
      {/* 残りグリッド */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((s) => (
          <div key={s.id} className="bg-white rounded-xl overflow-hidden border border-border shadow-sm">
            <div className="relative h-36 overflow-hidden">
              <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <CardOverlay story={s} />
            </div>
            <CardBody story={s} compact />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 案6: リスト形式 ───────────────────────────────────────────
function Layout6() {
  return (
    <div className="space-y-3">
      {DUMMY.map((s) => (
        <div key={s.id} className="bg-white rounded-xl overflow-hidden border border-border shadow-sm flex">
          <div className="relative w-36 shrink-0 overflow-hidden">
            <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
          </div>
          <div className="flex-1 p-4 min-w-0">
            <p className="text-xs text-muted-foreground mb-1">{s.age} · {s.gender} · {s.address}在住</p>
            <p className="text-sm font-bold text-foreground leading-snug mb-2 line-clamp-2">{s.catchphrase}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {s.reasons.map((r) => (
                <span key={r} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{r}</span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <MapPin className="w-3 h-3 shrink-0" />
              <span>{s.graveLocation}<ArrowRight className="w-2.5 h-2.5 inline mx-1 opacity-50" />{s.destination}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── 案7: 交互マガジン（1大＋2小） ────────────────────────────
function Layout7() {
  const rows: Story[][] = []
  for (let i = 0; i < DUMMY.length; i += 3) rows.push(DUMMY.slice(i, i + 3))

  return (
    <div className="space-y-4">
      {rows.map((row, ri) => {
        const isEven = ri % 2 === 0
        const [big, ...smalls] = isEven ? row : [...row].reverse()
        const displayBig = isEven ? big : row[row.length - 1]
        const displaySmalls = isEven ? row.slice(1) : row.slice(0, row.length - 1)
        return (
          <div key={ri} className={`flex gap-4 ${!isEven ? "flex-row-reverse" : ""}`}>
            {/* 大カード */}
            <div className="flex-[2] bg-white rounded-xl overflow-hidden border border-border shadow-sm">
              <div className="relative h-56 overflow-hidden">
                <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white/70 text-xs mb-1">{displayBig.age} · {displayBig.gender}</p>
                  <p className="text-white text-sm font-bold leading-snug line-clamp-2">{displayBig.catchphrase}</p>
                </div>
              </div>
              <CardBody story={displayBig} />
            </div>
            {/* 小カード */}
            <div className="flex-1 flex flex-col gap-4">
              {displaySmalls.map((s) => (
                <div key={s.id} className="flex-1 bg-white rounded-xl overflow-hidden border border-border shadow-sm">
                  <div className="relative h-24 overflow-hidden">
                    <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-white text-[11px] font-bold line-clamp-2">{s.catchphrase}</p>
                    </div>
                  </div>
                  <CardBody story={s} compact />
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── 案8: 4列コンパクト ────────────────────────────────────────
function Layout8() {
  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      {DUMMY.map((s) => (
        <div key={s.id} className="bg-white rounded-lg overflow-hidden border border-border shadow-sm">
          <div className="relative h-28 overflow-hidden">
            <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <p className="text-white/60 text-[9px]">{s.age} · {s.gender}</p>
              <p className="text-white text-[10px] font-bold line-clamp-2 leading-tight">{s.catchphrase}</p>
            </div>
          </div>
          <div className="p-2">
            <div className="flex flex-wrap gap-1 mb-1.5">
              {s.reasons.slice(0, 1).map((r) => (
                <span key={r} className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">{r}</span>
              ))}
              {s.reasons.length > 1 && (
                <span className="text-[9px] text-muted-foreground">+{s.reasons.length - 1}</span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
              <MapPin className="w-2.5 h-2.5 shrink-0" />
              <span className="truncate">{s.graveLocation}→{s.destination}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── 案9: 縦長2列 ─────────────────────────────────────────────
function Layout9() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {DUMMY.map((s) => (
        <div key={s.id} className="bg-white rounded-xl overflow-hidden border border-border shadow-sm">
          <div className="relative h-64 overflow-hidden">
            <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-amber-400 text-xs font-bold mb-1.5">{s.age} · {s.gender} · {s.address}在住</p>
              <p className="text-white text-base font-bold leading-snug mb-2">{s.catchphrase}</p>
              <div className="flex flex-wrap gap-1.5">
                {s.reasons.map((r) => (
                  <span key={r} className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full">{r}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="px-5 py-3 flex items-center gap-1.5 text-xs text-muted-foreground border-t border-border">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-primary" />
            <span>{s.graveLocation}（→{s.destination}）</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// ── 案10: 横スクロール＋下グリッド ───────────────────────────
function Layout10() {
  const pickup = DUMMY.slice(0, 5)
  const rest   = DUMMY.slice(5)
  return (
    <div className="space-y-8">
      {/* ピックアップ横スクロール */}
      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">ピックアップ</p>
        <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory" style={{ scrollbarWidth: "thin" }}>
          {pickup.map((s) => (
            <div key={s.id} className="shrink-0 w-72 snap-start bg-white rounded-xl overflow-hidden border border-border shadow-sm">
              <div className="relative h-48 overflow-hidden">
                <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-amber-400 text-xs font-bold mb-1">{s.age} · {s.gender}</p>
                  <p className="text-white text-sm font-bold leading-snug line-clamp-2">{s.catchphrase}</p>
                </div>
              </div>
              <CardBody story={s} />
            </div>
          ))}
        </div>
      </div>
      {/* 残りグリッド */}
      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">すべての体験談</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((s) => (
            <div key={s.id} className="bg-white rounded-xl overflow-hidden border border-border shadow-sm">
              <div className="relative h-36 overflow-hidden">
                <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <CardOverlay story={s} />
              </div>
              <CardBody story={s} compact />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── 案11: 横スクロール＋リスト形式（PC2列・スマホ1列） ────────
function Layout11() {
  const pickup = DUMMY.slice(0, 5)
  const rest   = DUMMY.slice(5)
  return (
    <div className="space-y-8">
      {/* ピックアップ横スクロール */}
      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">ピックアップ</p>
        <div className="flex gap-5 overflow-x-auto pb-3 snap-x snap-mandatory" style={{ scrollbarWidth: "thin" }}>
          {pickup.map((s) => (
            <div key={s.id} className="shrink-0 w-80 snap-start bg-white rounded-xl overflow-hidden border border-border shadow-sm">
              <div className="relative h-52 overflow-hidden">
                <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-amber-400 text-xs font-bold mb-1">{s.age} · {s.gender} · {s.address}在住</p>
                  <p className="text-white text-sm font-bold leading-snug line-clamp-2">{s.catchphrase}</p>
                </div>
              </div>
              <CardBody story={s} />
            </div>
          ))}
        </div>
      </div>
      {/* リスト形式（PC2列・スマホ1列） */}
      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">すべての体験談</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {rest.map((s) => (
            <div key={s.id} className="bg-white rounded-xl overflow-hidden border border-border shadow-sm flex">
              <div className="relative w-36 shrink-0 overflow-hidden">
                <Image src="/images/story-hero.jpg" alt="" fill className="object-cover" />
              </div>
              <div className="flex-1 p-4 min-w-0">
                <p className="text-xs text-muted-foreground mb-1">{s.age} · {s.gender} · {s.address}在住</p>
                <p className="text-sm font-bold text-foreground leading-snug mb-2 line-clamp-2">{s.catchphrase}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {s.reasons.map((r) => (
                    <span key={r} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{r}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{s.graveLocation}<ArrowRight className="w-2.5 h-2.5 inline mx-1 opacity-50" />{s.destination}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const LAYOUTS = [Layout1, Layout2, Layout3, Layout4, Layout5, Layout6, Layout7, Layout8, Layout9, Layout10, Layout11]

// ── ページ本体 ───────────────────────────────────────────────
export default function StoryListPreviewPage() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Sticky nav */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm py-3 px-6 flex gap-2 flex-wrap items-center">
        <Link href="/design-preview" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mr-2 shrink-0">
          <ChevronLeft className="w-4 h-4" />デザイン一覧
        </Link>
        <span className="text-gray-300">|</span>
        {DESIGNS.map((d) => (
          <a key={d.id} href={`#layout-${d.id}`} className="text-xs text-gray-600 hover:text-primary font-medium whitespace-nowrap px-2 py-1 rounded hover:bg-primary/5">
            案{d.id}
          </a>
        ))}
      </nav>

      {/* Page header */}
      <div className="py-10 px-6 text-center bg-white border-b">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-2">Design Preview</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">体験談一覧 レイアウト比較</h1>
        <p className="text-gray-500 text-sm mt-2">ダミー20件 · 全11案</p>
      </div>

      {/* Each layout */}
      {DESIGNS.map((d, i) => {
        const LayoutComponent = LAYOUTS[i]
        return (
          <section key={d.id} id={`layout-${d.id}`} className={`py-14 ${i % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
            <div className="max-w-5xl mx-auto px-6">
              {/* Label */}
              <div className="flex items-start gap-3 mb-6">
                <span className="inline-flex items-center bg-white border border-gray-200 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm shrink-0">
                  案 {d.id}
                </span>
                <div>
                  <p className="text-gray-800 font-semibold text-sm">{d.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{d.note}</p>
                </div>
              </div>
              {/* Layout preview */}
              <LayoutComponent />
            </div>
          </section>
        )
      })}

      <div className="py-12 bg-gray-50 border-t text-center">
        <p className="text-gray-400 text-sm">体験談一覧 レイアウト — 全11案</p>
      </div>
    </div>
  )
}
