import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ArticleCtaProps {
  variant: "inline" | "full"
}

export function ArticleCta({ variant }: ArticleCtaProps) {
  // Inline variant - mid-article
  if (variant === "inline") {
    return (
      <div className="my-12 rounded-2xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-muted/50 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground mb-1">
              墓じまい完全ガイド
            </h3>
            <p className="text-sm text-muted-foreground">
              墓じまいの流れ、費用の目安、墓じまい後の供養方法までをわかりやすく解説しています。
            </p>
          </div>
          <Link
            href="/hakajimai"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg whitespace-nowrap"
          >
            ガイドを読む
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    )
  }

  // Full variant - bottom of page
  return (
    <section className="bg-gradient-to-r from-primary/5 via-muted/50 to-primary/5 border-t border-border">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-6">
          <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          墓じまい完全ガイド
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
          墓じまいの意味や改葬との違いといった基本的な知識から、
          実際の流れ、費用の目安、墓じまい後の供養方法までを
          わかりやすく解説しています。
        </p>
        <Link
          href="/hakajimai"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-xl"
        >
          ガイドを読む
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}
