import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "送信完了 | 墓じまいパートナーズ",
  description: "お問い合わせありがとうございました。担当者より折り返しご連絡いたします。",
}

export default function ThanksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Simplified header for thanks page */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 text-xl font-bold text-foreground">
            <svg
              className="h-9 w-9 shrink-0"
              viewBox="0 0 100 100"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                className="text-primary"
                d="M52 8 C30 4, 10 18, 8 42 C6 60, 16 76, 32 84 C44 90, 52 92, 58 88 C62 86, 60 78, 64 72 C68 66, 78 66, 84 60 C92 52, 94 36, 86 22 C78 10, 66 10, 52 8Z"
              />
            </svg>
            墓じまいパートナーズ
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center">
        <div className="bg-linen">
          <div className="mx-auto max-w-2xl px-6 py-24 text-center md:py-32">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cta/10">
              <CheckCircle className="h-10 w-10 text-cta" aria-hidden="true" />
            </div>

            <h1 className="text-2xl font-bold text-foreground md:text-3xl text-balance">
              送信ありがとうございました
            </h1>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              お問い合わせ内容を確認のうえ、<br className="hidden sm:inline" />
              担当者より折り返しご連絡いたします。
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              通常、1~2営業日（土日祝日お休み）以内にご連絡いたします。
            </p>

            <div className="mt-10">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                トップページに戻る
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
