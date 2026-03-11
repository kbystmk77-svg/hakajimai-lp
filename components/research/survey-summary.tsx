import { MapPin, Wallet, Building2, MessageSquare } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface RankingItem {
  label: string
  value: string
}

interface RankingCard {
  icon: LucideIcon
  theme: string
  subtitle?: string
  first: RankingItem
  second: RankingItem
  third: RankingItem
  color: string
}

const rankingCards: RankingCard[] = [
  {
    icon: MapPin,
    theme: "墓じまいの理由",
    first: { label: "墓が遠方にある", value: "47.8%" },
    second: { label: "管理・維持が難しい", value: "35.2%" },
    third: { label: "後継者がいない", value: "28.7%" },
    color: "bg-[#1e3a5f]",
  },
  {
    icon: Wallet,
    theme: "墓じまい費用",
    subtitle: "経験者78人",
    first: { label: "30〜50万円", value: "33.3%" },
    second: { label: "50〜100万円", value: "24.4%" },
    third: { label: "10〜30万円", value: "23.1%" },
    color: "bg-[#2d5a87]",
  },
  {
    icon: Building2,
    theme: "墓じまい後の供養先",
    first: { label: "永代供養墓", value: "48.7%" },
    second: { label: "納骨堂", value: "23.1%" },
    third: { label: "樹木葬", value: "15.4%" },
    color: "bg-[#3d7ab5]",
  },
  {
    icon: MessageSquare,
    theme: "墓じまいで大変だったこと",
    first: { label: "お寺とのやり取り", value: "42.3%" },
    second: { label: "費用の確保", value: "35.9%" },
    third: { label: "親族との調整", value: "32.1%" },
    color: "bg-[#4d8ac5]",
  },
]

export function SurveySummary() {
  return (
    <section className="bg-[#f8fafc] py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            調査結果サマリー
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1e3a5f]" />
        </div>

        {/* Ranking Cards - 2 columns on PC/tablet, 1 column on mobile */}
        <div className="grid gap-6 md:grid-cols-2">
          {rankingCards.map((card, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
            >
              {/* Header with theme */}
              <div className={`${card.color} px-5 py-4`}>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
                    <card.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {card.theme}
                    </h3>
                    {card.subtitle && (
                      <p className="text-xs text-white/70">{card.subtitle}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5">
                {/* 1st Place - Large and prominent */}
                <div className="mb-5 rounded-xl bg-[#f8fafc] p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1e3a5f] text-xs font-bold text-white">
                      1
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      1位
                    </span>
                  </div>
                  <p className="mb-1 text-base font-semibold text-foreground">
                    {card.first.label}
                  </p>
                  <p className="text-3xl font-bold text-[#1e3a5f]">
                    {card.first.value}
                  </p>
                </div>

                {/* 2nd and 3rd Place - Compact */}
                <div className="grid grid-cols-2 gap-3">
                  {/* 2nd Place */}
                  <div className="rounded-lg border border-border/50 bg-white px-3 py-2.5">
                    <div className="mb-1 flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#64748b] text-[10px] font-bold text-white">
                        2
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        2位
                      </span>
                    </div>
                    <p className="mb-0.5 text-xs font-medium text-foreground leading-tight">
                      {card.second.label}
                    </p>
                    <p className="text-sm font-bold text-[#3d7ab5]">
                      {card.second.value}
                    </p>
                  </div>

                  {/* 3rd Place */}
                  <div className="rounded-lg border border-border/50 bg-white px-3 py-2.5">
                    <div className="mb-1 flex items-center gap-1.5">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#94a3b8] text-[10px] font-bold text-white">
                        3
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        3位
                      </span>
                    </div>
                    <p className="mb-0.5 text-xs font-medium text-foreground leading-tight">
                      {card.third.label}
                    </p>
                    <p className="text-sm font-bold text-[#5d9ad5]">
                      {card.third.value}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
