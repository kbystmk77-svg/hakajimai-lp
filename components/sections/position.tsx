export function Position() {
  const values = [
    {
      num: "01",
      title: "お客様のご要望を最重視します",
      description:
        "「お寺と揉めてもいいから安く済ませたい」ではなく、「きちんとお布施もお支払いしたうえで気持ちよく墓じまいしたい」「お寺が指定する石材店があるならそこを利用したい」など、ご要望を十分に事前ヒアリングさせていただいた上で、最適な墓じまいをプランニングします。",
      image: "/images/position1.png",
      imageAlt: "ヒアリング対応するオペレーター",
    },
    {
      num: "02",
      title: "お寺への連絡など面倒な手続きはすべて代行します",
      description:
        "特に精神的な負担の大きいお寺や霊園への連絡や、面倒で手間のかかる行政手続、石材店への見積もり依頼など、すべての工程を代行します。進捗は随時ご報告しますので、遠方で立会が難しいという方でもご安心ください。",
      image: "/images/position2.png",
      imageAlt: "改葬許可申請書",
    },
    {
      num: "03",
      title: "立会不要、遠方のお墓も全国対応",
      description:
        "当社の墓じまいサービスは立会が不要です。仕事が忙しくて対応できない、病気や怪我で対応が難しいなど、様々なご事情があってもお申し込みが可能です。また、遠方にあるお墓から次の供養先への遺骨の移動にも対応します。",
      image: "/images/position3.png",
      imageAlt: "お花が供えられたお墓",
    },
  ]

  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
            私たちの立ち位置
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-primary" />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            お寺とも互いに気持ちのいい
            <br className="hidden md:block" />
            お別れをサポートすることを大切にしています。
          </p>
        </div>

        {/* Vertical list */}
        <div className="mt-16 flex flex-col gap-20 md:gap-28">
          {values.map((value, i) => (
            <div
              key={value.num}
              className="flex flex-col items-center gap-8 md:flex-row md:gap-14"
            >
              {/* Text side */}
              <div className="flex-1">
                {/* Number */}
                <span className="block text-5xl font-black text-primary md:text-6xl">
                  {value.num}
                </span>

                {/* Accent line */}
                <div className="mt-4 h-0.5 w-16 bg-primary/30" />

                {/* Title */}
                <h3 className="mt-6 text-xl font-bold leading-snug text-foreground md:text-2xl">
                  {value.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-base leading-loose text-muted-foreground">
                  {value.description}
                </p>
              </div>

              {/* Image */}
              <div className="w-full shrink-0 overflow-hidden rounded-2xl md:w-80">
                <img
                  src={value.image}
                  alt={value.imageAlt}
                  className="h-52 w-full object-cover md:h-64"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
