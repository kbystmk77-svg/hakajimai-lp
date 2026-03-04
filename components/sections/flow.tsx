import { ImageIcon, ArrowDown } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "まずはご要望をヒアリングさせてください",
    description:
      "オンライン、お電話、メールのご希望の方法で事前ヒアリングをさせてください。お寺側の考え方などもご説明させていただきますので、その中でお寺とどのようなスタンスで取り組んでいくのか、ご要望をお聞かせください。",
    image: "/images/flow-step1.png",
    imageAlt: "ヒアリング対応するオペレーター",
  },
  {
    step: "02",
    title: "概算見積をご確認いただき、進行するかご判断ください。",
    description:
      "お墓の形態やご遺骨の数、移転先などの情報を元に概算のお見積りを差し上げます。ご確認いただいたうえで、本見積もりに進めてもよいかご判断ください。",
    image: "/images/flow-step2.png",
    imageAlt: "家族でオンライン相談している様子",
  },
  {
    step: "03",
    title: "本見積もりの確認・ご契約",
    description:
      "お寺への連絡の上、現地見積もりの上、撤去費用や移転費用などを含めた本見積もりをご確認ください。その内容で問題なければご契約となります。",
    note: "この時点でご契約見送りでも問題ございません。強引な勧誘は行いませんのでご安心ください",
    image: "/images/flow-step3.png",
    imageAlt: "契約書に署名する様子",
  },
]

export function Flow() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
            ご利用までの流れ
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-primary" />
          <p className="mt-5 text-sm leading-relaxed text-foreground/70 md:text-base">
            3つのステップで進めてまいります。
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-0">
          {steps.map((item, index) => (
            <div key={index}>
              {/* Card */}
              <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
                {/* Image */}
                {item.image ? (
                  <div className="h-48 overflow-hidden md:h-56">
                    <img
                      src={item.image}
                      alt={item.imageAlt || ""}
                      className="h-full w-full object-cover object-[center_30%]"
                    />
                  </div>
                ) : (
                  <div className="flex h-48 items-center justify-center bg-muted md:h-56">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <ImageIcon className="h-8 w-8 opacity-40" />
                      <span className="text-xs">{'写真・イラスト'}</span>
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="px-6 py-6 md:px-8 md:py-8">
                  {/* Step badge */}
                  <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    STEP {item.step}
                  </span>

                  <h3 className="mt-4 text-lg font-bold leading-snug text-foreground md:text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-loose text-muted-foreground md:text-base">
                    {item.description}
                  </p>

                  {item.note && (
                    <p className="mt-4 rounded-lg bg-muted px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                      {'※'}{item.note}
                    </p>
                  )}
                </div>
              </div>

              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-5">
                  <ArrowDown className="h-6 w-6 text-primary/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
