"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

// ─── 型定義 ────────────────────────────────────────────────

type GraveType  = "temple" | "private" | "public" | "unknown"
type GraveSize  = "small" | "medium" | "large_2_3" | "large_3plus" | "unknown"
type BoneCount  = "one" | "two_three" | "four_plus" | "unknown"
type SupplyDest = "existing" | "goushi" | "nossotsu" | "jumoku" | "sankotsu" | "undecided"

export interface DiagnosisState {
  graveType:   GraveType  | null
  graveSize:   GraveSize  | null
  boneCount:   BoneCount  | null
  supplyDest:  SupplyDest | null
  templeAgent: boolean    | null  // Q5: お寺・行政対応代行 +13.2万
  destSupport: boolean    | null  // Q6: 移転先サポート    +3.3万
}

interface BreakdownItem {
  label:         string
  low:           number
  high:          number
  highlighted?:  boolean
  isFixed?:      boolean  // 固定費（low===high）の表示切り替え
  isSupply?:     boolean  // 供養先費用（区切り線を入れる）
}

export interface DiagnosisResult {
  costLow:          number
  costHigh:         number
  breakdown:        BreakdownItem[]
  difficulty:       0 | 1 | 2 | 3
  difficultyDetail: string
  note:             string
}

// ─── 供養先費用テーブル（供養先 × 遺骨数） ──────────────

const SUPPLY_COST: Record<SupplyDest, Record<string, [number, number]>> = {
  existing:  { one: [0,0],   two_three: [0,0],    four_plus: [0,0],    unknown: [0,0],   _null: [0,0]   },
  goushi:    { one: [5,15],  two_three: [10,30],  four_plus: [20,50],  unknown: [5,30],  _null: [5,30]  },
  nossotsu:  { one: [20,50], two_three: [25,60],  four_plus: [30,80],  unknown: [20,60], _null: [20,60] },
  jumoku:    { one: [10,30], two_three: [15,40],  four_plus: [20,50],  unknown: [10,40], _null: [10,40] },
  sankotsu:  { one: [5,15],  two_three: [10,25],  four_plus: [15,40],  unknown: [5,25],  _null: [5,25]  },
  undecided: { one: [10,60], two_three: [15,70],  four_plus: [25,100], unknown: [10,70], _null: [10,70] },
}

const SUPPLY_NOTES: Record<SupplyDest, string> = {
  existing:  "すでにある別のお墓への納骨のため、供養先費用はかかりません",
  goushi:    "合祀永代供養（1体ずつ費用がかかります）",
  nossotsu:  "納骨堂は区画タイプにより幅があります",
  jumoku:    "樹木葬は公園・区画タイプにより異なります",
  sankotsu:  "海洋散骨・山林散骨などにより異なります",
  undecided: "供養先が決まると費用の精度が上がります",
}

// ─── 費用ロジック ────────────────────────────────────────

function computeResult(s: DiagnosisState): DiagnosisResult {
  const breakdown: BreakdownItem[] = []

  // Q5 だけで「おまかせ」に
  const fullyDelegated = s.templeAgent === true
  let diff = 1
  if (s.graveType  === "temple")                                  diff++
  if (s.graveSize  === "large_2_3" || s.graveSize === "large_3plus") diff++
  if (s.boneCount  === "four_plus")                               diff++

  // ① 石材の撤去・処分・整地工事
  const stoneMap: Record<string, [number, number]> = {
    small:      [12, 22],
    medium:     [20, 35],
    large_2_3:  [30, 50],
    large_3plus:[45, 70],
    unknown:    [20, 35],
    _null:      [20, 35],
  }
  const [sL, sH] = stoneMap[s.graveSize ?? "_null"]
  breakdown.push({ label: "石材の撤去・処分・整地工事", low: sL, high: sH })

  // ② お寺・霊園への費用
  if (s.graveType === "temple") {
    breakdown.push({ label: "お寺への離檀料", low: 0, high: 20, highlighted: true })
  } else if (s.graveType === "private") {
    breakdown.push({ label: "霊園への解約・手続き費", low: 3, high: 8 })
  } else if (s.graveType === null || s.graveType === "unknown") {
    breakdown.push({ label: "墓地関連費（形態で変動）", low: 3, high: 15 })
  }
  // 公営霊園：行政手続き費に含めるため個別行なし

  // ③ お布施（閉眼供養・魂抜き）
  breakdown.push({ label: "お布施（閉眼供養・魂抜き）", low: 3, high: 10 })

  // ④ 遺骨の取り出し・移送費（体数の費用への影響は軽微）
  const boneMap: Record<string, [number, number]> = {
    one: [2,4], two_three: [3,6], four_plus: [4,8], unknown: [3,6], _null: [3,6],
  }
  const [bL, bH] = boneMap[s.boneCount ?? "_null"]
  breakdown.push({ label: "遺骨の取り出し・移送費", low: bL, high: bH })

  // ⑤ 書類・行政手続き費
  breakdown.push({ label: "書類・行政手続き費", low: 1, high: 3 })

  // ⑥ 弊社サービス費（選択時のみ）
  if (s.templeAgent === true) {
    breakdown.push({ label: "お寺・行政対応代行サポート（弊社）", low: 13.2, high: 13.2, isFixed: true })
  }
  if (s.destSupport === true) {
    breakdown.push({ label: "移転先ご紹介・サポート（弊社）", low: 3.3, high: 3.3, isFixed: true })
  }

  // ⑦ 新しい供養先の費用（合計に含む）
  const destKey = s.boneCount ?? "_null"
  const [supL, supH]: [number, number] = s.supplyDest
    ? SUPPLY_COST[s.supplyDest][destKey] ?? SUPPLY_COST[s.supplyDest]["_null"]
    : [10, 60]   // 未選択時はやや広いデフォルト
  const supplyNote = s.supplyDest ? SUPPLY_NOTES[s.supplyDest]
    : "供養先を選ぶと費用の精度が上がります"

  breakdown.push({
    label:       "新しい供養先の費用",
    low:         supL,
    high:        supH,
    highlighted: s.supplyDest !== "existing" && supH > 0,
    isSupply:    true,
    // ↑ isAdditional は削除 → 合計に含める
  } as BreakdownItem & { _note: string; _note_val: string })

  // 合計（全項目を合算）
  const rawLow  = breakdown.reduce((sum, i) => sum + i.low,  0)
  const rawHigh = breakdown.reduce((sum, i) => sum + i.high, 0)
  const costLow  = Math.max(20, Math.round(rawLow  / 5) * 5)
  const costHigh = Math.max(costLow + 10, Math.round(rawHigh / 5) * 5)

  const difficulty = (fullyDelegated ? 0 : Math.min(3, Math.max(1, diff))) as 0 | 1 | 2 | 3

  const difficultyDetail =
    difficulty === 0 ? "手続きはすべて弊社が代行します。ご本人の対応はほぼ不要です" :
    difficulty === 1 ? (
      s.graveType === "public"
        ? "石材店１社＋自治体への返還申請が主な作業です"
        : "石材店への依頼と墓地の解約手続きが主な作業です"
    ) :
    difficulty === 2 ? (
      s.graveType === "temple"
        ? "お寺への離檀交渉＋石材店の選定・見積が必要です"
        : "石材店の選定・見積と墓地への解約申請が必要です"
    ) :
    // difficulty === 3
    s.graveType === "temple"
      ? "お寺・石材店・移転先の3者との調整が発生します"
      : "石材店への見積・大量遺骨の移送など複数の手続きが重なります"

  const note =
    fullyDelegated              ? "手続きの代行はすべて弊社スタッフが担当します" :
    s.graveType === "temple"    ? "お寺への離檀の打診から始めるのがスムーズです" :
    s.graveSize === "large_2_3" || s.graveSize === "large_3plus" || s.boneCount === "four_plus"
                                ? "石材店に現地確認・見積を依頼することをおすすめします" :
    s.graveType !== null && s.graveType !== "unknown"
                                ? "霊園への解約申請と石材店の手配から進められます" :
                                  "詳細は無料相談でご確認いただけます"

  // supplyNote を breakdown item に後付け（型を汚さないため別管理）
  ;(breakdown[breakdown.length - 1] as any)._supplyNote = supplyNote

  return { costLow, costHigh, breakdown, difficulty, difficultyDetail, note }
}

// ─── 難易度バッジ ─────────────────────────────────────────

const DIFFICULTY_INFO = {
  0: { label: "おまかせ", colorClass: "text-sky-700 bg-sky-50 border-sky-200" },
  1: { label: "★☆☆",   colorClass: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  2: { label: "★★☆",   colorClass: "text-amber-700 bg-amber-50 border-amber-200" },
  3: { label: "★★★",   colorClass: "text-rose-700 bg-rose-50 border-rose-200" },
} as const

// ─── カウントアップ hook ──────────────────────────────────

function useCountUp(target: number, duration = 380) {
  const [display, setDisplay] = useState(target)
  const displayRef = useRef(target)
  const animRef    = useRef<number | null>(null)

  useEffect(() => {
    const from = displayRef.current
    if (from === target) return
    if (animRef.current) cancelAnimationFrame(animRef.current)
    const startTime = performance.now()
    function tick(now: number) {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      const current  = Math.round(from + (target - from) * eased)
      displayRef.current = current
      setDisplay(current)
      if (progress < 1) animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [target, duration])

  return display
}

// ─── 固定バー ─────────────────────────────────────────────

function StickyBar({ result, isComplete, visible }: {
  result: DiagnosisResult | null; isComplete: boolean; visible: boolean
}) {
  const [dismissed, setDismissed] = useState(false)
  const low  = useCountUp(result?.costLow  ?? 0)
  const high = useCountUp(result?.costHigh ?? 0)
  const diff = result ? DIFFICULTY_INFO[result.difficulty] : null

  // 新しい結果が来たら再表示
  const prevResultRef = useRef(result)
  useEffect(() => {
    if (result !== prevResultRef.current) {
      prevResultRef.current = result
      setDismissed(false)
    }
  }, [result])

  function scrollToResult() {
    document.getElementById("result-card")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const show = visible && !dismissed

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{ transform: show ? "translateY(0)" : "translateY(110%)", transition: "transform 0.3s ease-out" }}
    >
      <div
        className="border-t border-border shadow-[0_-4px_16px_rgba(0,0,0,0.1)]"
        style={{ backgroundColor: "#ffffff", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="mx-auto max-w-xl px-4 pt-3 pb-3">
          {/* 金額・難易度エリア：タップで内訳にスクロール */}
          <div className="flex items-start gap-2">
            <button
              type="button"
              onClick={scrollToResult}
              className="flex min-w-0 flex-1 cursor-pointer items-start justify-between gap-3 text-left"
            >
              <div className="min-w-0">
                <p className="text-[11px] text-foreground/50">
                  費用の目安
                  {result && <span className="ml-1.5 text-primary/60">↑ 内訳を見る</span>}
                </p>
                <p className="text-xl font-bold tabular-nums leading-tight text-foreground">
                  {result ? <>{low}万〜{high}万円</> : <span className="text-foreground/30">選択すると表示</span>}
                </p>
                {result && (
                  <p className="mt-0.5 truncate text-[11px] text-foreground/50">{result.difficultyDetail}</p>
                )}
              </div>
              {diff && (
                <span className={cn("mt-1 shrink-0 rounded-full border px-2.5 py-1 text-xs font-semibold", diff.colorClass)}>
                  難易度 {diff.label}
                </span>
              )}
            </button>
            {/* 閉じるボタン */}
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="shrink-0 cursor-pointer rounded-full p-3 text-foreground/30 transition-colors hover:text-foreground/60"
              aria-label="閉じる"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4 fill-current" aria-hidden="true">
                <path d="M4.22 4.22a.75.75 0 0 1 1.06 0L8 6.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L9.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 0 1-1.06-1.06L6.94 8 4.22 5.28a.75.75 0 0 1 0-1.06z"/>
              </svg>
            </button>
          </div>
          {isComplete && (
            <div className="mt-3">
              <a href="#contact" className="block w-full rounded-xl bg-cta py-3 text-center text-sm font-semibold text-cta-foreground shadow-sm shadow-cta/20 transition-all hover:brightness-110">
                この内容で詳しく相談する
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── 選択肢ボタン ─────────────────────────────────────────

interface OptionItem { value: string; label: string; sub?: string }

function OptionButton({ option, selected, onClick }: { option: OptionItem; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full cursor-pointer rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all",
        selected
          ? "border-primary bg-primary text-primary-foreground shadow-sm"
          : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/[0.04]",
      )}
    >
      <span className="block leading-tight">{option.label}</span>
      {option.sub && (
        <span className={cn("mt-0.5 block text-[11px]", selected ? "text-primary-foreground/70" : "text-foreground/50")}>
          {option.sub}
        </span>
      )}
    </button>
  )
}

// ─── 質問ブロック ─────────────────────────────────────────

function QuestionSection({
  number, label, hint, options, selected, onSelect, oddLastFull = true,
}: {
  number: number; label: string; hint?: string; options: OptionItem[]
  selected: string | null; onSelect: (v: string) => void; oddLastFull?: boolean
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {number}
        </span>
        <div>
          <h2 className="text-sm font-semibold leading-snug text-foreground">{label}</h2>
          {hint && <p className="mt-0.5 text-[11px] text-foreground/50">{hint}</p>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt, i) => {
          const isLastOdd = oddLastFull && options.length % 2 !== 0 && i === options.length - 1
          return (
            <div key={opt.value} className={cn(isLastOdd && "col-span-2")}>
              <OptionButton option={opt} selected={selected === opt.value} onClick={() => onSelect(opt.value)} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── 結果カード ──────────────────────────────────────────

function formatRange(item: BreakdownItem): string {
  if (item.low === 0 && item.high === 0) return "費用なし"
  if (item.isFixed) return `${item.low}万円`
  return `${item.low}万〜${item.high}万円`
}

function ResultCard({ result, isComplete }: { result: DiagnosisResult; isComplete: boolean }) {
  const low  = useCountUp(result.costLow)
  const high = useCountUp(result.costHigh)
  const diff = DIFFICULTY_INFO[result.difficulty]

  const regularItems = result.breakdown
  const supplyItem   = null  // 別枠なし・通常行として表示

  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
      <p className="mb-5 text-xs font-semibold uppercase tracking-wide text-primary/50">
        {isComplete ? "あなたのケースの目安" : "現在の入力に基づく目安（回答途中）"}
      </p>

      {/* 総額 + 難易度 */}
      <div className="border-b border-border pb-5">
        <div className="mb-1 flex items-center justify-between gap-2">
          <p className="text-xs text-foreground/50">費用の目安（合計）</p>
          <span className={cn("shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-semibold", diff.colorClass)}>
            難易度 {diff.label}
          </span>
        </div>
        <p className="text-3xl font-bold tabular-nums text-foreground">{low}万〜{high}万円</p>
        <p className="mt-1.5 text-[11px] leading-snug text-foreground/55">{result.difficultyDetail}</p>
      </div>

      {/* 費用内訳 */}
      <div className="mt-4">
        <p className="mb-3 text-xs font-semibold text-foreground/50">費用の内訳イメージ</p>
        <div className="space-y-1.5">
          {regularItems.map((item) => {
            const supplyNote = item.isSupply ? (item as any)._supplyNote as string | undefined : undefined
            return (
              <div key={item.label} className={cn(
                "rounded-lg border px-3 py-2 text-sm",
                item.isFixed  ? "border-primary/20 bg-primary/[0.05]" :
                item.isSupply ? "border-emerald-200/80 bg-emerald-50/60" :
                                "border-border/60 bg-muted/30",
              )}>
                <div className="flex items-center justify-between">
                  <span className="text-foreground/80">
                    {item.label}
                  </span>
                  <span className={cn("ml-2 shrink-0 tabular-nums font-medium",
                    item.low === 0 && item.high === 0 ? "text-foreground/50" : "text-foreground"
                  )}>
                    {formatRange(item)}
                  </span>
                </div>
                {supplyNote && (
                  <p className="mt-0.5 text-[11px] text-foreground/50">{supplyNote}</p>
                )}
              </div>
            )
          })}
        </div>

        <p className="mt-2 text-[11px] text-foreground/40">
          ※ 内訳はあくまで目安です。実際の費用はお墓の状態・地域・業者により異なります。
        </p>
      </div>

      {/* ポイント */}
      <div className="mt-4 rounded-xl border border-border/60 bg-background px-4 py-3">
        <p className="mb-1 text-xs font-medium text-foreground/50">進め方のポイント</p>
        <p className="text-sm text-foreground">{result.note}</p>
      </div>
    </div>
  )
}

// ─── メインコンポーネント ──────────────────────────────────

export function DiagnosisSimulator({
  onStateChange,
}: {
  onStateChange?: (state: DiagnosisState, result: DiagnosisResult | null) => void
} = {}) {
  const [state, setState] = useState<DiagnosisState>({
    graveType: null, graveSize: null, boneCount: null,
    supplyDest: null, templeAgent: null, destSupport: null,
  })

  const answeredMain = [state.graveType, state.graveSize, state.boneCount].filter(v => v !== null).length
  const hasAny     = answeredMain >= 2
  const isComplete = answeredMain >= 3
  const result     = hasAny ? computeResult(state) : null

  useEffect(() => {
    onStateChange?.(state, result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  return (
    <>
      <section className={cn("px-4 py-12 md:py-16", hasAny && "pb-36 md:pb-40")}>
        <div className="mx-auto max-w-xl space-y-4">

          {/* Q1: 形態 */}
          <QuestionSection
            number={1} label="お墓の形態を教えてください"
            options={[
              { value: "temple",  label: "寺院墓地" },
              { value: "private", label: "民間霊園" },
              { value: "public",  label: "公営霊園" },
              { value: "unknown", label: "わからない" },
            ]}
            selected={state.graveType}
            onSelect={(v) => setState((s) => ({ ...s, graveType: v as GraveType }))}
          />

          {/* Q2: 大きさ */}
          <QuestionSection
            number={2} label="お墓の大きさはどのくらいですか"
            options={[
              { value: "small",      label: "1㎡未満" },
              { value: "medium",     label: "1〜2㎡" },
              { value: "large_2_3",  label: "2〜3㎡" },
              { value: "large_3plus",label: "3㎡以上" },
              { value: "unknown",    label: "わからない" },
            ]}
            selected={state.graveSize}
            onSelect={(v) => setState((s) => ({ ...s, graveSize: v as GraveSize }))}
          />

          {/* Q3: 遺骨数 */}
          <QuestionSection
            number={3} label="お骨（遺骨）はいくつありますか"
            hint="供養先の費用は体数によって増減します"
            options={[
              { value: "one",       label: "1体" },
              { value: "two_three", label: "2〜3体" },
              { value: "four_plus", label: "4体以上" },
              { value: "unknown",   label: "わからない" },
            ]}
            selected={state.boneCount}
            onSelect={(v) => setState((s) => ({ ...s, boneCount: v as BoneCount }))}
          />

          {/* Q4: 供養先 */}
          <QuestionSection
            number={4} label="新しい供養先の候補はありますか"
            hint="選ぶと供養先費用の目安が絞られます"
            options={[
              { value: "existing",  label: "すでにある別のお墓" },
              { value: "goushi",    label: "永代供養（合祀）" },
              { value: "nossotsu",  label: "納骨堂" },
              { value: "jumoku",    label: "樹木葬・自然葬" },
              { value: "sankotsu",  label: "散骨" },
              { value: "undecided", label: "まだ決めていない" },
            ]}
            selected={state.supplyDest}
            onSelect={(v) => setState((s) => ({ ...s, supplyDest: v as SupplyDest }))}
          />

          {/* Q5: お寺・行政代行 */}
          <QuestionSection
            number={5} label="お寺との調整・書類のサポート・石材店への見積等を弊社に依頼しますか"
            hint="依頼すると手続きの複雑さが「おまかせ」になります（+13.2万円）"
            options={[
              { value: "yes", label: "依頼する",          sub: "+13.2万円" },
              { value: "no",  label: "自分で行う / 未定" },
            ]}
            selected={state.templeAgent === null ? null : state.templeAgent ? "yes" : "no"}
            onSelect={(v) => setState((s) => ({ ...s, templeAgent: v === "yes" }))}
            oddLastFull={false}
          />

          {/* Q6: 移転先サポート */}
          <QuestionSection
            number={6} label="移転先（供養先）のご紹介・サポートを依頼しますか"
            hint="依頼する場合は費用に3.3万円が加算されます"
            options={[
              { value: "yes", label: "依頼する",          sub: "+3.3万円" },
              { value: "no",  label: "自分で行う / 未定" },
            ]}
            selected={state.destSupport === null ? null : state.destSupport ? "yes" : "no"}
            onSelect={(v) => setState((s) => ({ ...s, destSupport: v === "yes" }))}
            oddLastFull={false}
          />

          {/* 結果カード */}
          {result && (
            <>
              <div className="flex justify-center py-2">
                <ArrowDown className="h-5 w-5 text-primary/30" />
              </div>
              <div id="result-card">
                <ResultCard result={result} isComplete={isComplete} />
              </div>
              {isComplete && (
                <div className="pt-2 text-center">
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-cta px-8 py-4 text-sm font-semibold text-cta-foreground shadow-md shadow-cta/20 transition-all hover:brightness-110">
                    この内容で詳しく相談する
                    <ChevronDown className="h-4 w-4" />
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <StickyBar result={result} isComplete={isComplete} visible={hasAny} />
    </>
  )
}
