import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"

export function SurveyCta() {
  return (
    <section className="bg-[#1e3a5f] py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="overflow-hidden rounded-2xl bg-white p-8 shadow-xl md:p-10">
          <div className="text-center">
            {/* Icon */}
            <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#1e3a5f]/10">
              <MessageCircle className="h-8 w-8 text-[#1e3a5f]" />
            </div>

            {/* Heading */}
            <h2 className="text-xl font-bold text-foreground md:text-2xl">
              墓じまいの相談はこちら
            </h2>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
              墓じまいの進め方や手続きについて無料相談を受け付けています。
              <br className="hidden md:block" />
              お気軽にお問い合わせください。
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-cta px-8 py-4 text-base font-semibold text-cta-foreground shadow-lg shadow-cta/20 transition-all hover:brightness-110"
              >
                無料相談する
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Sub text */}
            <p className="mt-4 text-xs text-muted-foreground">
              通常1〜2営業日以内にご連絡いたします
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
