"use client"

import { useState } from "react"
import { Check } from "lucide-react"

const checkItems = [
  "お墓の管理者（寺院・霊園）を確認した",
  "墓じまいについて親族と話し合った",
  "改葬先（納骨堂・樹木葬など）を検討した",
  "必要な行政手続き（改葬許可）を把握している",
  "費用の目安を把握している",
  "離檀料やお布施について確認した",
]

export function Checklist() {
  const [checked, setChecked] = useState<boolean[]>(
    new Array(checkItems.length).fill(false)
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
    <section className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
            墓じまい準備チェックリスト
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-primary" />
          <p className="mt-5 text-sm leading-relaxed text-foreground/70 md:text-base">
            現在の準備状況を確認してみましょう。
            <br />
            分からない項目があっても、私たちがサポートいたします。
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          {checkItems.map((item, index) => (
            <button
              key={index}
              onClick={() => toggleItem(index)}
              className="flex items-center gap-4 rounded-lg border border-border bg-background px-6 py-4 text-left shadow-sm transition-colors hover:bg-secondary"
              type="button"
            >
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                  checked[index]
                    ? "border-primary bg-primary"
                    : "border-border bg-transparent"
                }`}
              >
                {checked[index] && (
                  <Check className="h-4 w-4 text-primary-foreground" />
                )}
              </div>
              <span className="text-sm leading-relaxed text-foreground md:text-base">
                {item}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-foreground/70">
            {checkedCount === 0
              ? "チェックを入れて、現在の準備状況を確認してみてください"
              : checkedCount === checkItems.length
                ? "すべての項目を確認済みです。ご相談の準備が整っています"
                : `${checkItems.length}項目中${checkedCount}項目を確認済みです`}
          </p>
        </div>
      </div>
    </section>
  )
}
