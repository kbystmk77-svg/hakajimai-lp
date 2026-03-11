import { MapPin, Wallet, Building2, MessageSquare } from "lucide-react"

const summaryCards = [
  {
    icon: MapPin,
    value: "47.8%",
    label: "墓じまい理由1位",
    description: "墓が遠方",
    color: "bg-[#2d5a87]",
  },
  {
    icon: Wallet,
    value: "30〜50万円",
    label: "墓じまい費用最多",
    description: "（経験者78人）",
    color: "bg-[#3d7ab5]",
  },
  {
    icon: Building2,
    value: "48.7%",
    label: "供養先1位",
    description: "永代供養墓",
    color: "bg-[#4d8ac5]",
  },
  {
    icon: MessageSquare,
    value: "1位",
    label: "最も大変だったこと",
    description: "お寺とのやり取り",
    color: "bg-[#5d9ad5]",
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

        {/* Infographic Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl"
            >
              {/* Top colored bar */}
              <div className={`h-2 ${card.color}`} />

              <div className="p-6">
                {/* Icon */}
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${card.color} text-white`}
                >
                  <card.icon className="h-6 w-6" />
                </div>

                {/* Value */}
                <div className="mb-2 text-3xl font-bold text-[#1e3a5f] md:text-4xl">
                  {card.value}
                </div>

                {/* Label */}
                <div className="mb-1 text-sm font-semibold text-foreground">
                  {card.label}
                </div>

                {/* Description */}
                <div className="text-sm text-muted-foreground">
                  {card.description}
                </div>
              </div>

              {/* Decorative element */}
              <div
                className={`absolute -bottom-4 -right-4 h-24 w-24 rounded-full ${card.color} opacity-5`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
