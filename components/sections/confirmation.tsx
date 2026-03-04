"use client"

import { useState } from "react"
import { Check, ArrowRight } from "lucide-react"
import { smoothScrollTo } from "@/lib/smooth-scroll"

const items = [
  { text: "お墓が遠方にあり、", bold: "立会", after: "ができない" },
  { text: "自分から", bold: "お寺への連絡", after: "するのは抵抗がある" },
  { text: "お寺には", bold: "誠意を持った", after: "対応をしたい" },
  { text: "自分は", bold: "お墓にこだわり", after: "がない" },
  { text: "必要な", bold: "法要などのお布施", after: "は支払いたい" },
  { text: "お寺にとっても", bold: "納得して", after: "もらえるやり方で進めたい" },
]

export function Confirmation() {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(items.length).fill(false)
  )

  const toggleItem = (index: number) => {
    setChecked((prev) => {
      const next = [...prev]
      next[index] = !next[index]
      return next
    })
  }

  const checkedCount = checked.filter(Boolean).length

  return (
    <section>
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        {/* Header with icon */}
        <div className="flex flex-col items-center text-center">
          <p className="text-base font-semibold text-cta md:text-lg">
            2つ以上チェックがつく場合
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
            ぜひ「墓じまいパートナーズ」へご相談ください
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            あてはまる項目をタップしてください
          </p>
        </div>

        {/* Checklist - 2 column grid on desktop */}
        <div className="mt-12 flex flex-col gap-3">
          {items.map((item, i) => {
            const isChecked = checked[i]
            return (
              <button
                key={i}
                type="button"
                onClick={() => toggleItem(i)}
                className={`group relative flex items-center gap-4 rounded-xl border-2 px-5 py-4 text-left transition-all duration-200 ${isChecked
                  ? "border-primary bg-primary/[0.06] shadow-md shadow-primary/10"
                  : "border-border bg-background hover:border-primary/30 hover:shadow-sm"
                  }`}
              >
                {/* Checkbox */}
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${isChecked
                    ? "bg-primary text-primary-foreground scale-110"
                    : "border-2 border-foreground/15 bg-background group-hover:border-primary/40"
                    }`}
                >
                  {isChecked && <Check className="h-4 w-4" strokeWidth={3} />}
                </span>

                {/* Label */}
                <span
                  className={`text-sm leading-relaxed transition-colors md:text-base ${isChecked ? "text-foreground font-medium" : "text-foreground/80"
                    }`}
                >
                  {item.text}
                  <span className="font-bold text-foreground">{item.bold}</span>
                  {item.after}
                </span>
              </button>
            )
          })}
        </div>

        {/* Counter bar */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="flex gap-1.5">
            {items.map((_, i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded-full transition-all duration-300 ${checked[i] ? "bg-primary" : "bg-foreground/10"
                  }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-foreground">
            {checkedCount}
            <span className="font-normal text-muted-foreground"> / {items.length}</span>
          </span>
        </div>

        {/* Result CTA */}
        <div
          className={`mt-8 overflow-hidden transition-all duration-500 ${checkedCount >= 2
            ? "max-h-60 opacity-100"
            : "max-h-0 opacity-0"
            }`}
        >
          <div className="flex flex-col items-center gap-5 rounded-2xl bg-primary/[0.06] border border-primary/20 px-8 py-8 text-center">
            <p className="text-sm leading-relaxed text-foreground/80 md:text-base">
              まずは状況をお聞かせください。最適な進め方をご提案します。
            </p>
            <a
              href="#contact"
              onClick={(e) => smoothScrollTo(e, "#contact")}
              className="inline-flex items-center gap-2 rounded-lg bg-cta px-8 py-3.5 text-sm font-semibold text-cta-foreground shadow-sm transition-all hover:brightness-110"
            >
              無料で相談する
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
