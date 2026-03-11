import { FileText } from "lucide-react"

export function SurveyHero() {
  return (
    <section className="relative overflow-hidden bg-[#1e3a5f]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-400/20 px-4 py-2 text-sm text-emerald-200 backdrop-blur-sm">
            <FileText className="h-4 w-4" />
            <span>調査レポート</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl text-balance">
            墓じまい実態調査2026
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-lg font-medium text-white/90 md:text-xl">
            墓じまい経験者・検討者230人アンケート
          </p>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
            墓じまいを経験または検討した230人を対象に、墓じまいの理由や費用、供養先などについて調査を実施しました。
          </p>
        </div>
      </div>

      {/* Wave bottom */}
      <svg
        className="absolute bottom-0 left-0 block w-full"
        style={{ height: "60px" }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,60 Q360,120 720,60 Q1080,0 1440,50 L1440,120 L0,120 Z"
          fill="#f8fafc"
        />
      </svg>
    </section>
  )
}
