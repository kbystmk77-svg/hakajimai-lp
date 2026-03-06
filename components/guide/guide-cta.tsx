import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface GuideCtaProps {
  variant: "inline" | "sidebar" | "full"
}

export function GuideCta({ variant }: GuideCtaProps) {
  // Sidebar variant - compact
  if (variant === "sidebar") {
    return (
      <div className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-4">
        <div className="text-sm font-semibold text-foreground mb-2">
          墓じまいでお悩みですか？
        </div>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
          費用や手続きの進め方など、まずは状況を整理するところから一緒にやります。
        </p>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-lg bg-cta px-4 py-2.5 text-sm font-medium text-cta-foreground transition-all hover:opacity-90 hover:shadow-md"
        >
          サービス内容を見る
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    )
  }

  // Inline variant - mid-article
  if (variant === "inline") {
    return (
      <div className="my-12 rounded-2xl border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-cta/5 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground mb-1">
              サービス内容をチェック
            </h3>
            <p className="text-sm text-muted-foreground">
              墓じまいパートナーズのサービス内容や料金、ご利用の流れをご確認いただけます。
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-cta px-6 py-3 text-sm font-medium text-cta-foreground transition-all hover:opacity-90 hover:shadow-lg whitespace-nowrap"
          >
            サービス内容を見る
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          墓じまいパートナーズのサービス
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
          墓じまいの手続きから供養先の選定まで、
          専門スタッフがトータルでサポートいたします。
          まずはサービス内容をご確認ください。
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-cta px-8 py-4 text-base font-medium text-cta-foreground transition-all hover:opacity-90 hover:shadow-xl"
        >
          サービス内容を見る
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  )
}
