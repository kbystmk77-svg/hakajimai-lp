

const services = [
  {
    title: "行政手続きのサポート",
    description:
      "改葬許可申請をはじめとする各種書類の作成・提出を代行いたします。",
    image: "/images/service1.png",
    imageAlt: "窓口で書類の説明を受ける様子",
    imagePosition: "center 35%",
  },
  {
    title: "寺院・霊園との調整",
    description:
      "お寺や霊園管理者への連絡を、ご家族に代わって行います。",
    image: "/images/service2.png",
    imageAlt: "ヘッドセットで連絡対応するスタッフ",
    imagePosition: "center 30%",
  },
  {
    title: "ご法要の手配",
    description:
      "お墓の魂抜き（閉眼供養）やご法要など、お客様のご要望に沿って手配いたします。",
    image: "/images/service3.png",
    imageAlt: "僧侶が墓前で読経する様子",
  },
  {
    title: "遺骨の取出し・墓石の撤去・整地",
    description:
      "遺骨の取出しから墓石の解体撤去、遺骨の移送まで、責任を持って対応いたします。",
    image: "/images/service4.png",
    imageAlt: "作業員が骨壷を取り出す様子",
  },
]

const option = {
  title: "永代供養先のご紹介",
  description:
    "墓じまい後の供養先をお探しの方へ、永代供養墓や納骨堂・散骨先など、ご希望に合った供養先をご紹介いたします。宗派やご予算・エリアに応じてご提案が可能です。",
}

export function Service() {
  return (
    <section>
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
            サービス内容
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-primary" />
          <p className="mt-5 text-sm leading-relaxed text-foreground/70 md:text-base">
            墓じまいに必要な手続きを、ワンストップでサポートいたします。
          </p>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {services.map((service, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-border bg-background shadow-sm"
              >
                {/* Image */}
                <div className="h-40 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="h-full w-full object-cover"
                    style={service.imagePosition ? { objectPosition: service.imagePosition } : undefined}
                  />
                </div>
                <div className="flex flex-col gap-4 px-6 py-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/70">
                    {service.description}
                  </p>
                </div>
              </div>
          ))}
        </div>

        {/* Option */}
        <div className="mt-14">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-primary">
            Option
          </p>
          <div className="flex flex-col gap-4 rounded-lg border-2 border-dashed border-primary/30 bg-primary/[0.03] px-6 py-8 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">
              {option.title}
            </h3>
            <p className="text-sm leading-relaxed text-foreground/70">
              {option.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
