import { FileText } from "lucide-react"

export function SurveySummaryText() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            まとめ
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1e3a5f]" />
        </div>

        {/* Summary Card */}
        <div className="overflow-hidden rounded-2xl border-2 border-[#1e3a5f]/20 bg-[#f8fafc] p-6 shadow-sm md:p-8">
          <div className="flex items-start gap-4">
            <div className="hidden shrink-0 md:block">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#1e3a5f] text-white">
                <FileText className="h-6 w-6" />
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-foreground md:text-base md:leading-loose">
                今回の調査から、墓じまいを検討する理由として「遠方のため」（47.8%）や「墓参りが難しくなった」（37.8%）、「管理費が負担」（31.7%）など、距離・身体・経済的な問題が複合的に影響していることが分かりました。
              </p>
              <p className="text-sm leading-relaxed text-foreground md:text-base md:leading-loose">
                費用面では「10万円未満」と「30〜50万円」が各19.2%で同率1位と、費用は幅広く分布しており、供養先としては永代供養墓が約半数（48.7%）を占めています。墓じまいで最も大変だったこととして「お寺とのやり取り」（38.5%）が挙げられており、寺院との事前の話し合いや専門家のサポートの重要性がうかがえます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
