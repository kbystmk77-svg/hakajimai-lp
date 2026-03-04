import { Check } from "lucide-react"

export function Empathy() {
  const reasons = [
    "お墓が遠方にあり、墓参りもできない",
    "親が亡くなってからお墓がある地域との関係が途切れた",
    "自分はお墓にこだわりがないし、子供に面倒を押し付けたくない",
  ]

  return (
    <section>
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
            こんな理由で墓じまいをする方が増えています
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-primary" />
        </div>

        {/* Reason cards */}
        <div className="mt-12 flex flex-col gap-4">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-lg border border-border bg-background px-6 py-5 shadow-sm"
            >
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
              <p className="text-sm leading-relaxed text-foreground md:text-base">
                {reason}
              </p>
            </div>
          ))}
        </div>

        {/* Worry bubble + illustration */}
        <div className="mt-12 flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-10">
          {/* Cloud-shaped speech bubble */}
          <div className="relative flex-1">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 600 280"
              preserveAspectRatio="none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M80,240 C30,240 10,210 15,180 C5,165 0,145 10,125 C5,105 15,75 45,60 C50,30 80,10 120,15 C145,0 180,-5 210,10 C240,-5 280,-2 310,15 C340,5 375,5 400,20 C430,8 465,10 490,30 C520,20 555,35 570,60 C590,70 600,95 595,120 C605,145 600,170 585,190 C595,215 580,240 555,248 C540,265 510,275 480,265 C455,280 420,282 390,270 C360,282 325,280 300,268 C270,280 235,278 210,268 C180,280 145,278 120,265 C95,272 65,260 80,240 Z"
                fill="white"
                stroke="#e5e5e5"
                strokeWidth="1.5"
              />
              {/* Bubble tail dots (right side for desktop) */}
              <circle cx="565" cy="255" r="12" fill="white" stroke="#e5e5e5" strokeWidth="1.5" className="hidden md:block" />
              <circle cx="580" cy="272" r="7" fill="white" stroke="#e5e5e5" strokeWidth="1.5" className="hidden md:block" />
            </svg>
            {/* Mobile tail dots (bottom) */}
            <div className="md:hidden">
              <svg className="absolute -bottom-5 right-16 h-10 w-10" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="12" r="12" fill="white" stroke="#e5e5e5" strokeWidth="1.5" />
              </svg>
              <svg className="absolute -bottom-9 right-10 h-6 w-6" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="7" fill="white" stroke="#e5e5e5" strokeWidth="1.5" />
              </svg>
            </div>
            <div className="relative z-10 px-10 py-10 md:px-14 md:py-12">
              <p className="text-sm leading-loose text-foreground md:text-base">
                忙しいし、お墓が遠いから立会は難しいし、
                <br className="hidden md:block" />
                お寺への連絡や工事の見積もり、行政手続など対応している時間がない。
              </p>
              <p className="mt-4 text-sm leading-loose text-foreground md:text-base">
                お寺に不義理をしてケンカ別れになるのも気分が悪いから、お寺とは円満に進めたいんだけど...。
              </p>
            </div>
          </div>

          {/* Illustration */}
          <div className="shrink-0 w-40 md:w-48">
            <img
              src="/images/worried-man.png"
              alt="困っている男性のイラスト"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

      </div>

      {/* Bottom CTA banner with operator photo */}
      <div className="relative mt-0 flex h-80 items-center justify-center overflow-hidden md:h-96">
        <img
          src="/images/operator.png"
          alt="相談窓口のオペレーター"
          className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <p className="relative z-10 px-6 text-center text-xl font-bold tracking-tight text-background md:text-2xl lg:text-3xl text-balance">
          {'\\'}
          {' そんなお悩み「墓じまいパートナーズ」が解決します '}
          {'/'}
        </p>
      </div>
    </section>
  )
}
