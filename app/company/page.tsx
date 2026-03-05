import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "会社概要 | 墓じまいパートナーズ",
  description:
    "墓じまいパートナーズの運営会社情報です。",
}

const rows = [
  { label: "サービス名", value: "墓じまいパートナーズ" },
  { label: "運営会社", value: "株式会社リバーズエッジ" },
  { label: "代表者", value: "代表取締役 小林玉喜" },
  {
    label: "所在地",
    value: "〒115-0045\n東京都北区赤羽1-7-9 赤羽第一葉山ビル4F",
  },
  {
    label: "メールアドレス",
    value: "contact@hakajimai-partners.jp",
    href: "mailto:contact@hakajimai-partners.jp",
  },
  {
    label: "事業内容",
    value: "墓じまいに関する相談受付・手続きサポート・業者紹介サービス",
  },
] as const

export default function CompanyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-xl font-bold text-foreground"
          >
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
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            会社概要
          </h1>

          <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-sm md:text-base">
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    className={
                      i !== rows.length - 1
                        ? "border-b border-border"
                        : undefined
                    }
                  >
                    <th className="w-1/3 bg-muted/40 px-5 py-4 text-left font-medium text-foreground align-top">
                      {row.label}
                    </th>
                    <td className="px-5 py-4 text-muted-foreground whitespace-pre-line">
                      {"href" in row && row.href ? (
                        <a
                          href={row.href}
                          className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
                        >
                          {row.value}
                        </a>
                      ) : (
                        row.value
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-16 border-t border-border pt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              トップページに戻る
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
