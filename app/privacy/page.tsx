import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/sections/footer"

export const metadata: Metadata = {
  title: "プライバシーポリシー | 墓じまいパートナーズ",
  description:
    "墓じまいパートナーズのプライバシーポリシーです。個人情報の取り扱いについてご確認ください。",
}

const sections = [
  {
    title: "1. 個人情報の取得",
    body: "当サービスでは、相談フォーム等を通じて以下の情報を取得する場合があります。",
    list: [
      "氏名",
      "電話番号",
      "メールアドレス",
      "墓所所在地",
      "相談内容",
      "その他サービス提供に必要な情報",
    ],
  },
  {
    title: "2. 個人情報の利用目的",
    body: "取得した個人情報は以下の目的で利用します。",
    list: ["相談対応", "サービス提供", "連絡および案内", "サービス改善"],
  },
  {
    title: "3. 第三者提供",
    body: "取得した個人情報は、以下の場合を除き第三者へ提供することはありません。",
    list: ["本人の同意がある場合", "法令に基づく場合"],
  },
  {
    title: "4. 個人情報の管理",
    body: "当サービスは個人情報の漏洩・滅失・毀損を防ぐため適切な管理を行います。",
  },
  {
    title: "5. 個人情報の開示・訂正・削除",
    body: "本人から請求があった場合、合理的な範囲で対応します。",
  },
  {
    title: "6. プライバシーポリシーの変更",
    body: "本ポリシーは必要に応じて変更される場合があります。",
  },
  {
    title: "7. お問い合わせ",
    body: "個人情報に関するお問い合わせは下記までご連絡ください。",
    contact: "contact@hakajimai-partners.jp",
  },
] as const

export default function PrivacyPage() {
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
            プライバシーポリシー
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            墓じまいパートナーズ（以下「当サービス」）は、ユーザーの個人情報を適切に保護することを重要な責務と考え、以下の方針に基づき個人情報を取り扱います。
          </p>

          <div className="mt-10 flex flex-col gap-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-lg font-bold text-foreground">
                  {section.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {section.body}
                </p>
                {"list" in section && section.list && (
                  <ul className="mt-3 flex flex-col gap-1.5 pl-1">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-muted-foreground md:text-base"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {"contact" in section && section.contact && (
                  <p className="mt-3 text-sm text-muted-foreground md:text-base">
                    メールアドレス：
                    <a
                      href={`mailto:${section.contact}`}
                      className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
                    >
                      {section.contact}
                    </a>
                  </p>
                )}
              </section>
            ))}
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
