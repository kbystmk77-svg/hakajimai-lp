import Image from "next/image"

export function DeveloperVoice() {
  return (
    <section>
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
            私たちの想い
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-primary" />
        </div>

        <div className="mt-14 flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-14">
          {/* Photo */}
          <div className="shrink-0">
            <div className="relative h-64 w-64 overflow-hidden rounded-2xl md:h-72 md:w-72">
              <Image
                src="/images/kobayashi.png"
                alt="小林"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 256px, 288px"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-base font-semibold text-foreground">小林玉喜</p>
              <p className="mt-1 text-xs text-muted-foreground">
                墓じまいパートナーズ 代表
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="flex-1">
            <blockquote className="text-sm leading-[2] text-foreground/85 md:text-base md:leading-[2]">
              <p>
                実家の墓じまいのとき、どう動けばよいのか分からず悩みました。
              </p>
              <p className="mt-4">
                忙しく、遠方のため時間も取れず、代行業者を探しましたが、お墓の解体が中心の業者や、お寺とのトラブルを強くあおる情報ばかり。
              </p>
              <p className="mt-4">
                立会いは難しい。
                お寺とのやり取りも精神的に負担がある。
                それでも、対立ではなく、きちんと筋を通して進めたい。
              </p>
              <p className="mt-4">
                当時の自分が使いたかった形を目指して始めたのが、
                「墓じまいパートナーズ」です。
              </p>
              <p className="mt-4">
                お墓側のご意向もきちんと考慮しながら、お互いが納得する形で墓じまいしたい方は、ぜひ一度お話を聞かせてください。
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
