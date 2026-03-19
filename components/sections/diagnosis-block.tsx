"use client"

import { useState } from "react"
import { DiagnosisSimulator } from "./diagnosis-simulator"
import type { DiagnosisState, DiagnosisResult } from "./diagnosis-simulator"
import { Cta } from "./cta"
import { ShareFamilyButton } from "@/components/share-family-button"

const GRAVE_TYPE_LABELS: Record<string, string> = {
  temple: "寺院墓地", private: "民間霊園", public: "公営霊園", unknown: "わからない",
}
const GRAVE_SIZE_LABELS: Record<string, string> = {
  small: "1㎡未満", medium: "1〜2㎡", large_2_3: "2〜3㎡", large_3plus: "3㎡以上", unknown: "わからない",
}
const BONE_COUNT_LABELS: Record<string, string> = {
  one: "1体", two_three: "2〜3体", four_plus: "4体以上", unknown: "わからない",
}
const SUPPLY_DEST_LABELS: Record<string, string> = {
  existing: "すでにある別のお墓", goushi: "永代供養（合祀）", nossotsu: "納骨堂",
  jumoku: "樹木葬・自然葬", sankotsu: "散骨", undecided: "まだ決めていない",
}

function buildSummary(state: DiagnosisState, result: DiagnosisResult): string {
  const parts: string[] = []
  if (state.graveType)   parts.push(`形態：${GRAVE_TYPE_LABELS[state.graveType] ?? state.graveType}`)
  if (state.graveSize)   parts.push(`大きさ：${GRAVE_SIZE_LABELS[state.graveSize] ?? state.graveSize}`)
  if (state.boneCount)   parts.push(`遺骨数：${BONE_COUNT_LABELS[state.boneCount] ?? state.boneCount}`)
  if (state.supplyDest)  parts.push(`供養先：${SUPPLY_DEST_LABELS[state.supplyDest] ?? state.supplyDest}`)
  if (state.templeAgent !== null)  parts.push(`代行依頼：${state.templeAgent ? "あり" : "なし（自分で）"}`)
  if (state.destSupport !== null)  parts.push(`移転先サポート：${state.destSupport ? "あり" : "なし（自分で）"}`)
  parts.push(`見積：${result.costLow}万〜${result.costHigh}万円`)
  return parts.join(" / ")
}

export function DiagnosisBlock() {
  const [diagData, setDiagData] = useState<{ state: DiagnosisState; result: DiagnosisResult } | null>(null)

  const extraFields: Record<string, string> = { source: "lp-diagnosis" }
  if (diagData) {
    extraFields.diagnosis_summary = buildSummary(diagData.state, diagData.result)
  }

  return (
    <>
      {/* 診断シミュレーター */}
      <div className="bg-linen" id="simulation">
        <div className="mx-auto max-w-xl px-6 pt-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary/50">
            無料シミュレーター
          </p>
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            墓じまい費用10秒見積り
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/65 md:text-base">
            お墓の形態・大きさ・遺骨の数を選ぶだけで、
            <br className="hidden sm:block" />
            費用の目安と進め方のポイントがすぐにわかります。
          </p>
        </div>
        <DiagnosisSimulator
          onStateChange={(state, result) => {
            if (result) setDiagData({ state, result })
            else setDiagData(null)
          }}
        />
      </div>

      {/* CTA（シミュレーター選択内容をhiddenフィールドで送信） */}
      <div className="bg-linen">
        <Cta extraFields={extraFields} />
        <ShareFamilyButton locationTag="after_cta" />
      </div>
    </>
  )
}
