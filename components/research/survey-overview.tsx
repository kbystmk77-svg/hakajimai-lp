export function SurveyOverview() {
  const overviewData = [
    { label: "調査名", value: "墓じまい実態調査2026" },
    { label: "調査方法", value: "インターネット調査" },
    { label: "回答者数", value: "230人（墓じまい経験者・検討者）" },
    { label: "うち墓じまい経験者", value: "78人" },
    { label: "調査期間", value: "2026年3月" },
    { label: "調査主体", value: "墓じまいパートナーズ" },
  ]

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            調査概要
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1e3a5f]" />
        </div>

        {/* Overview Card */}
        <div className="overflow-hidden rounded-2xl border border-border bg-[#f8fafc] shadow-sm">
          <div className="divide-y divide-border">
            {overviewData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-center sm:gap-4"
              >
                <div className="w-full shrink-0 text-sm font-semibold text-[#1e3a5f] sm:w-48">
                  {item.label}
                </div>
                <div className="text-sm text-foreground">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
