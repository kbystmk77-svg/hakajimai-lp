"use client"

import { ArrowRight } from "lucide-react"
import { type FormEvent, useState } from "react"

// TODO: LINE公式アカウント取得後にURLを差し替えてください
const LINE_URL = "https://lin.ee/ULJ8EIO"

function trackLineClick() {
  if (typeof window !== "undefined" && "gtag" in window) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(window as any).gtag("event", "line_button_click", {
      event_category: "engagement",
      event_label: "CTA LINE button",
    })
  }
}

export function Cta() {
  const [methodError, setMethodError] = useState(false)

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
    <section id="contact">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
            まずはお話をお聞かせください
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-primary" />
          <p className="mt-5 text-sm leading-relaxed text-foreground/70 md:text-base">
            墓じまいについてのご不明点やお悩みを、
            <br className="hidden md:block" />
            専門のスタッフが丁寧にお伺いいたします。
            <br />
            ご相談は無料です。
          </p>
        </div>

        {/* Contact form */}
        <div className="mt-12">
          <div className="rounded-xl border border-border bg-background p-8 shadow-sm md:p-10">
            <h3 className="text-lg font-semibold text-foreground">
              無料相談フォーム
            </h3>
            <p className="mt-1 text-sm text-foreground/60">
              以下のフォームにご記入ください。通常1～2営業日（土日祝日休み）以内にご連絡します。
            </p>

            <form className="mt-8 flex flex-col gap-6" action="/api/contact" method="POST" onSubmit={handleSubmit}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="山田 太郎"
                    className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none ring-primary/30 focus:border-primary focus:ring-2 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-medium text-foreground">
                    電話番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="090-1234-5678"
                    className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none ring-primary/30 focus:border-primary focus:ring-2 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="example@email.com"
                  className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none ring-primary/30 focus:border-primary focus:ring-2 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="prefecture" className="text-sm font-medium text-foreground">
                  お墓の所在地（都道府県） <span className="text-red-500">*</span>
                </label>
                <select
                  id="prefecture"
                  name="prefecture"
                  required
                  className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-primary/30 focus:border-primary focus:ring-2 transition-all"
                  defaultValue=""
                >
                  <option value="">選択してください</option>
                  <option value="北海道">北海道</option>
                  <option value="青森県">青森県</option>
                  <option value="岩手県">岩手県</option>
                  <option value="宮城県">宮城県</option>
                  <option value="秋田県">秋田県</option>
                  <option value="山形県">山形県</option>
                  <option value="福島県">福島県</option>
                  <option value="茨城県">茨城県</option>
                  <option value="栃木県">栃木県</option>
                  <option value="群馬県">群馬県</option>
                  <option value="埼玉県">埼玉県</option>
                  <option value="千葉県">千葉県</option>
                  <option value="東京都">東京都</option>
                  <option value="神奈川県">神奈川県</option>
                  <option value="新潟県">新潟県</option>
                  <option value="富山県">富山県</option>
                  <option value="石川県">石川県</option>
                  <option value="福井県">福井県</option>
                  <option value="山梨県">山梨県</option>
                  <option value="長野県">長野県</option>
                  <option value="岐阜県">岐阜県</option>
                  <option value="静岡県">静岡県</option>
                  <option value="愛知県">愛知県</option>
                  <option value="三重県">三重県</option>
                  <option value="滋賀県">滋賀県</option>
                  <option value="京都府">京都府</option>
                  <option value="大阪府">大阪府</option>
                  <option value="兵庫県">兵庫県</option>
                  <option value="奈良県">奈良県</option>
                  <option value="和歌山県">和歌山県</option>
                  <option value="鳥取県">鳥取県</option>
                  <option value="島根県">島根県</option>
                  <option value="岡山県">岡山県</option>
                  <option value="広島県">広島県</option>
                  <option value="山口県">山口県</option>
                  <option value="徳島県">徳島県</option>
                  <option value="香川県">香川県</option>
                  <option value="愛媛県">愛媛県</option>
                  <option value="高知県">高知県</option>
                  <option value="福岡県">福岡県</option>
                  <option value="佐賀県">佐賀県</option>
                  <option value="長崎県">長崎県</option>
                  <option value="熊本県">熊本県</option>
                  <option value="大分県">大分県</option>
                  <option value="宮崎県">宮崎県</option>
                  <option value="鹿児島県">鹿児島県</option>
                  <option value="沖縄県">沖縄県</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-foreground">
                  希望のご相談方法（複数選択可） <span className="text-red-500">*</span>
                </span>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {["オンライン面談", "電話", "メール"].map((method) => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="methods"
                        value={method}
                        className="h-4 w-4 rounded border-border text-primary accent-primary"
                        onChange={() => setMethodError(false)}
                      />
                      <span className="text-sm text-foreground">{method}</span>
                    </label>
                  ))}
                </div>
                {methodError && (
                  <p className="text-xs text-red-500">1つ以上選択してください。</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  ご相談内容 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="墓じまいについてのお悩みやご質問があればお聞かせください。"
                  className="resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-foreground/40 outline-none ring-primary/30 focus:border-primary focus:ring-2 transition-all"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-cta px-10 py-4 text-sm font-semibold text-cta-foreground shadow-md shadow-cta/20 transition-all hover:brightness-110"
                >
                  無料相談を申し込む
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* LINE alternative */}
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
                  <path d="M12 2C6.477 2 2 6.145 2 11.243c0 3.066 1.614 5.792 4.138 7.572V22l3.779-2.076A10.87 10.87 0 0 0 12 20.486c5.523 0 10-4.145 10-9.243S17.523 2 12 2zm1.087 12.47-2.698-2.877-5.267 2.877 5.8-6.154 2.763 2.877 5.202-2.877-5.8 6.154z"/>
                </svg>
                LINEで相談する
              </a>
              <p className="mt-2 text-xs text-foreground/50">気軽にメッセージを送れます</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
