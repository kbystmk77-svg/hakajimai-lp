import { ArrowRight, Clock, FileText, Phone, MapPin, Scale } from "lucide-react"

export function Diy() {
  const tasks = [
    {
      icon: Phone,
      title: "お寺への連絡・離檀交渉",
      description: "菩提寺に墓じまいの意思を伝え、離檀料や閉眼供養の日程を調整します。宗派ごとのマナーも把握が必要です。",
    },
    {
      icon: FileText,
      title: "行政手続き（改葬許可申請）",
      description: "現在の墓地がある自治体で「改葬許可証」を取得します。埋葬証明書の取り寄せなど、書類が複数あります。",
    },
    {
      icon: MapPin,
      title: "石材店の手配・見積もり比較",
      description: "墓石の解体・撤去を依頼する石材店を探し、複数社から見積もりを取って比較します。",
    },
    {
      icon: Scale,
      title: "改葬先の選定・契約",
      description: "永代供養墓・樹木葬・納骨堂など、ご遺骨の新しい受け入れ先を選び、契約を結びます。",
    },
  ]

  return (
    <section className="bg-background">
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
            自分でもできるの？
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-primary" />
        </div>

        <div className="mt-10 rounded-2xl border border-border p-6 md:p-10">
          <p className="text-center text-base font-semibold text-foreground md:text-lg">
            はい、ご自身で進めることもできます。
          </p>
          <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground md:text-base">
            ただ、実際にはこれだけのことを調べて進める必要があります。
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {tasks.map((task, i) => (
              <div key={i} className="flex gap-4 rounded-xl border border-border p-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <task.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{task.title}</p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {task.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border-l-[3px] border-l-primary bg-primary/5 py-5 pr-5 pl-5 md:py-6 md:pr-8 md:pl-7">
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-semibold text-foreground md:text-base">
                  一生に一度のことだから
                </p>
                <p className="mt-2 text-sm leading-[1.8] text-foreground/80">
                  墓じまいは、ほとんどの方にとって一度きりの経験です。
                  時間をかけて勉強しても、次に活かす機会はありません。
                  慣れない手続きに不安を感じるのは当然のことです。
                  <br />
                  <span className="mt-2 inline-block font-medium text-foreground">
                    経験のあるスタッフに任せることで、時間も気持ちもゆとりが生まれます。
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg bg-cta px-8 py-3.5 text-sm font-semibold text-cta-foreground shadow-sm transition-all hover:brightness-110"
          >
            まずは無料で相談する
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
