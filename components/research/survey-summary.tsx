import { MapPin, Wallet, Building2, MessageSquare } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface SummaryCard {
  icon: LucideIcon
  theme: string
  subtitle?: string
  answer: string
  percentage: string
}

const summaryCards: SummaryCard[] = [
  {
    icon: MapPin,
    theme: "墓じまいの理由",
    answer: "墓が遠方にある",
    percentage: "47.8%",
  },
  {
    icon: Wallet,
    theme: "墓じまい費用",
    subtitle: "経験者78人",
    answer: "30〜50万円",
    percentage: "33.3%",
  },
  {
    icon: Building2,
    theme: "墓じまい後の供養先",
    answer: "永代供養墓",
    percentage: "48.7%",
  },
  {
    icon: MessageSquare,
    theme: "墓じまいで大変だったこと",
    answer: "お寺とのやり取り",
    percentage: "42.3%",
  },
]

export function SurveySummary() {
  return (
    <section className="bg-[#f8fafc] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            調査結果サマリー
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1e3a5f]" />
        </div>

        {/* Summary Cards - 4 columns PC, 2 columns tablet, 1 column mobile */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl"
            >
              {/* Icon and Theme */}
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e3a5f]/10">
                  <card.icon className="h-4 w-4 text-[#1e3a5f]" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.theme}
                  </p>
                  {card.subtitle && (
                    <p className="text-xs text-muted-foreground/70">
                      {card.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* 1st Place Badge */}
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-[#1e3a5f] px-2.5 py-0.5 text-xs font-bold text-white">
                  1位
                </span>
              </div>

              {/* Answer - Most prominent */}
              <p className="mb-3 text-xl font-bold text-[#1e3a5f] leading-snug md:text-2xl">
                {card.answer}
              </p>

              {/* Percentage - Smaller, secondary */}
              <p className="mt-auto text-base font-semibold text-muted-foreground">
                {card.percentage}
              </p>
            </div>
          ))}
        </div>

        {/* Survey Overview - Compact table */}
        <div className="mt-12 flex justify-center">
          <table className="w-full max-w-md border-collapse text-sm">
            <tbody>
              <tr className="border-b border-border/50">
                <th className="py-2.5 pr-4 text-left font-medium text-muted-foreground">
                  調査主体
                </th>
                <td className="py-2.5 text-foreground">墓じまいパートナーズ</td>
              </tr>
              <tr className="border-b border-border/50">
                <th className="py-2.5 pr-4 text-left font-medium text-muted-foreground">
                  調査方法
                </th>
                <td className="py-2.5 text-foreground">インターネット調査</td>
              </tr>
              <tr className="border-b border-border/50">
                <th className="py-2.5 pr-4 text-left font-medium text-muted-foreground">
                  回答者数
                </th>
                <td className="py-2.5 text-foreground">
                  230人（うち墓じまい経験者78人、検討者152人）
                </td>
              </tr>
              <tr>
                <th className="py-2.5 pr-4 text-left font-medium text-muted-foreground">
                  調査期間
                </th>
                <td className="py-2.5 text-foreground">2026年3月</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
