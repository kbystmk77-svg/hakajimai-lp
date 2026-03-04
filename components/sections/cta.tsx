"use client"

import { ArrowRight } from "lucide-react"

export function Cta() {
  return (
    <section id="contact">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
            まずはお話をお聞かせくださいください
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
              以下のフォームにご記入ください。担当者よりご連絡いたします。
            </p>

            <form className="mt-8 flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
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
                  type="email"
                  required
                  placeholder="example@email.com"
                  className="rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 outline-none ring-primary/30 focus:border-primary focus:ring-2 transition-all"
                />
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-foreground">
                  希望のご相談方法（複数選択可）
                </span>
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {["オンライン面談", "電話", "メール"].map((method) => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="contact_method"
                        value={method}
                        className="h-4 w-4 rounded border-border text-primary accent-primary"
                      />
                      <span className="text-sm text-foreground">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">
                  ご相談内容
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="墓じまいについてのお悩みやご質問があればお聞かせください。"
                  className="resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-foreground/40 outline-none ring-primary/30 focus:border-primary focus:ring-2 transition-all"
                />
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-cta px-10 py-4 text-sm font-semibold text-cta-foreground shadow-md shadow-cta/20 transition-all hover:brightness-110"
                >
                  無料相談を申し込む
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
