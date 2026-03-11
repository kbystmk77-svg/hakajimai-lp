import { CircleDollarSign, CircleCheck, CircleX } from "lucide-react"

export function SurveyRidanryo() {
  const ridanryoData = [
    {
      label: "離檀料を支払った",
      percentage: 62.8,
      count: 49,
      icon: CircleDollarSign,
      color: "bg-[#1e3a5f]",
    },
    {
      label: "離檀料は不要だった",
      percentage: 29.5,
      count: 23,
      icon: CircleCheck,
      color: "bg-[#4d8ac5]",
    },
    {
      label: "わからない・覚えていない",
      percentage: 7.7,
      count: 6,
      icon: CircleX,
      color: "bg-[#94a3b8]",
    },
  ]

  return (
    <section className="bg-[#f8fafc] py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            離檀料
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1e3a5f]" />
          <p className="mt-4 text-sm text-muted-foreground">経験者78人</p>
        </div>

        {/* Results */}
        <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-lg md:p-8">
          <div className="grid gap-4 md:grid-cols-3">
            {ridanryoData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center rounded-xl bg-[#f8fafc] p-6 text-center"
              >
                <div
                  className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full ${item.color} text-white`}
                >
                  <item.icon className="h-7 w-7" />
                </div>
                <div className="mb-2 text-3xl font-bold text-[#1e3a5f]">
                  {item.percentage}%
                </div>
                <div className="mb-1 text-sm font-medium text-foreground">
                  {item.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  （{item.count}人）
                </div>
              </div>
            ))}
          </div>

          {/* Additional info */}
          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-[#1e3a5f]/20 bg-[#1e3a5f]/5 p-4">
              <h4 className="mb-2 text-sm font-semibold text-[#1e3a5f]">
                離檀料の相場
              </h4>
              <p className="text-sm text-foreground">
                離檀料を支払った方の中で最も多かった金額帯は
                <span className="font-semibold text-[#1e3a5f]">
                  5〜20万円
                </span>
                でした。ただし、お寺との関係性や地域によって大きく異なります。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
