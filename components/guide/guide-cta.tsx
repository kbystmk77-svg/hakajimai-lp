import Link from "next/link"
import { Phone, MessageCircle, ArrowRight } from "lucide-react"

interface GuideCtaProps {
  variant: "inline" | "sidebar" | "full"
}

export function GuideCta({ variant }: GuideCtaProps) {
  // Sidebar variant - compact
  if (variant === "sidebar") {
    return (
      <div className="mt-6 rounded-xl border border-cta/30 bg-cta/5 p-4">
        <div className="text-sm font-semibold text-foreground mb-2">
          墓じまいでお悩みですか？
        </div>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
          費用や手続きの進め方など、まずは状況を整理するところから一緒にやります。
        </p>
        <Link
          href="/#contact"
          className="flex items-center justify-center gap-2 rounded-lg bg-cta px-4 py-2.5 text-sm font-medium text-cta-foreground transition-all hover:opacity-90 hover:shadow-md"
        >
          <MessageCircle className="h-4 w-4" />
          無料相談する
        </Link>
      </div>
    )
  }

  // Inline variant - mid-article
  if (variant === "inline") {
    return (
      <div className="my-12 rounded-2xl border-2 border-cta/20 bg-gradient-to-r from-cta/5 to-primary/5 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cta/10">
            <Phone className="h-6 w-6 text-cta" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground mb-1">
              専門家に相談してみませんか？
            </h3>
            <p className="text-sm text-muted-foreground">
              墓じまいに関するお悩みを無料で相談できます。お気軽にお問い合わせください。
            </p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-cta px-6 py-3 text-sm font-medium text-cta-foreground transition-all hover:opacity-90 hover:shadow-lg whitespace-nowrap"
          >
            無料相談はこちら
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    )
  }

  // Full variant - bottom of page
  return (
    <section className="bg-gradient-to-r from-primary/5 via-cta/5 to-primary/5 border-t border-border">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-cta/10 mb-6">
          <MessageCircle className="h-8 w-8 text-cta" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
          墓じまいの無料相談を受け付けています
        </h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
          「何から始めればいいかわからない」「費用が心配」など、
          どんな小さなことでもお気軽にご相談ください。
          専門のスタッフが丁寧にサポートいたします。
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-cta px-8 py-4 text-base font-medium text-cta-foreground transition-all hover:opacity-90 hover:shadow-xl"
          >
            <MessageCircle className="h-5 w-5" />
            無料相談はこちら
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-4 text-base font-medium text-foreground transition-all hover:bg-muted"
          >
            サービス内容を見る
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
