export function Market() {
  const stats = [
    {
      number: "約115万件",
      label: "年間の改葬件数（厚生労働省調べ）",
    },
    {
      number: "約40%",
      label: "お墓の後継者がいないと回答した世帯",
    },
    {
      number: "増加傾向",
      label: "都市部を中心に墓じまいの相談件数",
    },
  ]

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
            墓じまいをめぐる現状
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-primary" />
          <p className="mt-5 text-sm leading-relaxed text-foreground/70 md:text-base">
            少子高齢化や都市集中の流れの中で、お墓の維持に関する課題は年々増えています。
          </p>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 rounded-lg border border-border bg-background px-6 py-8 text-center shadow-sm"
            >
              <span className="text-2xl font-bold text-primary md:text-3xl">
                {stat.number}
              </span>
              <span className="text-sm leading-relaxed text-foreground/70">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-10 text-center text-sm leading-relaxed text-foreground/70 md:text-base">
          墓じまいは、決して「お墓を捨てる」ことではなく、
          <br className="hidden md:block" />
          次の世代に負担を残さないための、前向きな選択です。
        </p>
      </div>
    </section>
  )
}
