import { Newspaper } from "lucide-react"

export function Media() {
  return (
    <section className="bg-linen py-10 md:py-14">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 text-primary">
          <Newspaper className="h-5 w-5" />
          <span className="text-sm font-semibold tracking-wide">メディア掲載</span>
        </div>

        {/* Content Card */}
        <div className="mt-6 rounded-xl border border-border bg-background p-6 shadow-sm md:p-8">
          {/* Date */}
          <time className="text-sm text-muted-foreground">2026/03/15</time>

          {/* Main Text */}
          <p className="mt-3 text-sm leading-relaxed text-foreground md:text-base">
            <a
              href="https://gentosha-go.com/articles/-/76693"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
            >
              THE GOLD ONLINE
            </a>
            「墓じまい『年間16万件』の衝撃…寺院経営にも深刻な影響、日本の墓『2,600万基』のゆくえ」のニュース記事内で、当サイトが実施した
            <a
              href="https://hakajimai-partners.jp/research/hakajimai-survey-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
            >
              「墓じまい実態調査2026」
            </a>
            についてご紹介をいただきました。
            <a
              href="https://news.yahoo.co.jp/articles/121f6bec48e9324b964eab5a75c7a904f8fb3e75"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
            >
              YAHOO!ニュース
            </a>
            にも掲載されています。
          </p>
        </div>
      </div>
    </section>
  )
}
