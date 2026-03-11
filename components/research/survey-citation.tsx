"use client"

import { useState } from "react"
import { Copy, Check, ImageDown } from "lucide-react"

export function SurveyCitation() {
  const [copied, setCopied] = useState(false)

  const citationText =
    `墓じまいパートナーズ「墓じまい実態調査2026」（2026年3月）https://hakajimai-partners.jp/research/hakajimai-survey-2026`

  const handleCopy = () => {
    navigator.clipboard.writeText(citationText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <section className="bg-[#f8fafc] py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            調査データのご利用について
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1e3a5f]" />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8">
          {/* Usage terms */}
          <div className="mb-6">
            <h3 className="mb-3 text-base font-semibold text-foreground">
              ご利用条件
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-green-600">✓</span>
                本ページへのリンクを掲載した上で出典を明記いただければ、ブログ・メディア・SNS等での引用・転載が可能です
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-green-600">✓</span>
                グラフ・図表はスクリーンショットしてそのままご利用いただけます
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-red-500">✗</span>
                リンクなしでの引用・転載はご遠慮ください
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 font-bold text-red-500">✗</span>
                データの改ざん・誤解を招く形での引用はご遠慮ください
              </li>
            </ul>
          </div>

          {/* Citation text */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-foreground">
              引用文のコピー
            </h3>
            <div className="flex items-stretch gap-2">
              <div className="flex-1 rounded-lg border border-border bg-[#f8fafc] px-4 py-3 text-sm text-muted-foreground break-all">
                {citationText}
              </div>
              <button
                onClick={handleCopy}
                className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#1e3a5f] px-4 py-3 text-sm font-medium text-white transition-all hover:bg-[#1e3a5f]/90"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    コピー済
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    コピー
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Graph image note */}
          <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#1e3a5f]/5 p-4">
            <ImageDown className="mt-0.5 h-5 w-5 shrink-0 text-[#1e3a5f]" />
            <p className="text-sm text-muted-foreground">
              グラフ画像をご利用の場合は、画像の近くに本ページへのリンクと
              <span className="font-medium text-foreground">
                「墓じまいパートナーズ「墓じまい実態調査2026」より」
              </span>
              の記載をお願いします。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
