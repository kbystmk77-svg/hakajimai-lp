"use client"

import { ArrowRight } from "lucide-react"
import { type FormEvent, useState } from "react"

const LINE_URL = "https://lin.ee/ULJ8EIO"

function trackLineClick() {
  if (typeof window !== "undefined" && "gtag" in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).gtag("event", "line_button_click", {
      event_category: "engagement",
      event_label: "Diagnosis CTA LINE button",
    })
  }
}

const CALL_TIMES = ["午前（10時〜12時）", "午後（13時〜17時）", "夕方以降（17時〜19時）", "いつでも可"]

const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
  "岐阜県", "静岡県", "愛知県", "三重県",
  "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
  "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県",
  "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
]

export function DiagnosisCta() {
  const [methodError, setMethodError] = useState(false)
  const [selectedMethods, setSelectedMethods] = useState<string[]>([])
  const phoneSelected = selectedMethods.includes("電話")

  function toggleMethod(method: string) {
    setSelectedMethods((prev) =>
      prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method],
    )
    setMethodError(false)
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget
    const checked = form.querySelectorAll<HTMLInputElement>('input[name="methods"]:checked')
    if (checked.length === 0) {
      e.preventDefault()
      setMethodError(true)
      return
    }
    setMethodError(false)
  }

  return (
    <section>
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        {/* 見出し */}
        <div className="text-center">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            より詳しい見積と進め方を<br className="sm:hidden" />ご相談ください
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-primary" />
          <p className="mt-5 text-sm leading-relaxed text-foreground/70 md:text-base">
            シミュレーターの結果をもとに、専門スタッフが
            <br className="hidden md:block" />
            あなたのケースに合った進め方を丁寧にご説明します。
            <br />
            ご相談は無料です。
          </p>
        </div>

        {/* フォーム */}
        <div className="mt-12">
          <div className="rounded-xl border border-border bg-background p-8 shadow-sm md:p-10">
            <h3 className="text-lg font-semibold text-foreground">無料相談フォーム</h3>
            <p className="mt-1 text-sm text-foreground/60">
              以下のフォームにご記入ください。通常1～2営業日（土日祝日休み）以内にご連絡します。
            </p>

            <form
              className="mt-8 flex flex-col gap-6"
              action="/api/contact"
              method="POST"
              onSubmit={handleSubmit}
            >
              {/* 流入元（管理用） */}
              <input type="hidden" name="source" value="lp-diagnosis" />

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="diag-name" className="text-sm font-medium text-foreground">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="diag-name"
                    name="name"
                    type="text"
                    required
                    placeholder="山田 太郎"
                    className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none ring-primary/30 transition-all focus:border-primary focus:ring-2"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="diag-phone" className="text-sm font-medium text-foreground">
                    電話番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="diag-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="090-1234-5678"
                    className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none ring-primary/30 transition-all focus:border-primary focus:ring-2"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="diag-email" className="text-sm font-medium text-foreground">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  id="diag-email"
                  name="email"
                  type="email"
                  required
                  placeholder="example@email.com"
                  className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none ring-primary/30 transition-all focus:border-primary focus:ring-2"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="diag-prefecture" className="text-sm font-medium text-foreground">
                  お墓の所在地（都道府県） <span className="text-red-500">*</span>
                </label>
                <select
                  id="diag-prefecture"
                  name="prefecture"
                  required
                  defaultValue=""
                  className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-primary/30 transition-all focus:border-primary focus:ring-2"
                >
                  <option value="">選択してください</option>
                  {PREFECTURES.map((pref) => (
                    <option key={pref} value={pref}>{pref}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-foreground">
                  希望のご相談方法（複数選択可） <span className="text-red-500">*</span>
                </span>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {["オンライン面談", "電話", "メール"].map((method) => (
                    <label key={method} className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        name="methods"
                        value={method}
                        checked={selectedMethods.includes(method)}
                        className="h-4 w-4 rounded border-border accent-primary"
                        onChange={() => toggleMethod(method)}
                      />
                      <span className="text-sm text-foreground">{method}</span>
                    </label>
                  ))}
                </div>
                {methodError && (
                  <p className="text-xs text-red-500">1つ以上選択してください。</p>
                )}
                {phoneSelected && (
                  <div className="mt-1 rounded-lg border border-primary/20 bg-primary/[0.04] px-5 py-4">
                    <p className="mb-3 text-sm font-medium text-foreground">
                      電話がつながりやすい時間帯を教えてください
                    </p>
                    <div className="flex flex-wrap gap-x-5 gap-y-2.5">
                      {CALL_TIMES.map((t) => (
                        <label key={t} className="flex cursor-pointer items-center gap-2">
                          <input
                            type="radio"
                            name="callTime"
                            value={t}
                            className="h-4 w-4 border-border accent-primary"
                          />
                          <span className="text-sm text-foreground">{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="diag-message" className="text-sm font-medium text-foreground">
                  ご相談内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="diag-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="シミュレーターの結果を見てのご質問や、具体的なお悩みをお聞かせください。"
                  className="resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-foreground/40 outline-none ring-primary/30 transition-all focus:border-primary focus:ring-2"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-cta px-10 py-4 text-sm font-semibold text-cta-foreground shadow-md shadow-cta/20 transition-all hover:brightness-110"
                >
                  この内容で詳しく相談する
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* LINE代替 */}
        <div className="mt-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-foreground/40">または</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <div className="mt-6 text-center">
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackLineClick}
            className="inline-flex cursor-pointer items-center gap-2.5 rounded-lg px-10 py-4 text-sm font-semibold text-white shadow-md transition-all hover:brightness-110"
            style={{ backgroundColor: "#06C755" }}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.145 2 11.243c0 3.066 1.614 5.792 4.138 7.572V22l3.779-2.076A10.87 10.87 0 0 0 12 20.486c5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.087 12.47-2.698-2.877-5.267 2.877 5.8-6.154 2.763 2.877 5.202-2.877-5.8 6.154z" />
            </svg>
            LINEで相談する
          </a>
          <p className="mt-2 text-xs text-foreground/50">気軽にメッセージを送れます</p>
        </div>
      </div>
    </section>
  )
}
