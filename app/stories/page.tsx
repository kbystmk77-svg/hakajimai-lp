import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { stories } from "@/lib/stories"
import { SimpleHeader } from "@/components/sections/simple-header"
import { Footer } from "@/components/sections/footer"
import { MapPin, ArrowRight, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "墓じまい体験談",
  description: "実際に墓じまいを検討・経験された方々の体験談をご紹介します。様々な理由や状況での墓じまいの事例をご覧ください。",
}

export default function StoriesPage() {
  return (
    <>
      <SimpleHeader />
      <main className="bg-background min-h-screen">
        {/* Hero — フルモザイク */}
        <section className="relative overflow-hidden border-b border-border">
          {/* 全面モザイク */}
          <div
            className="absolute inset-0 grid pointer-events-none select-none"
            style={{ gridTemplateColumns: "repeat(6, 1fr)", gridTemplateRows: "repeat(3, 1fr)" }}
          >
            {[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map((n) => (
              <div key={n} className="relative overflow-hidden">
                <Image
                  src={`/images/story-${String(n).padStart(2, "0")}.jpg`}
                  alt="" fill className="object-cover" sizes="200px"
                />
              </div>
            ))}
          </div>
          {/* オーバーレイ */}
          <div className="absolute inset-0 bg-foreground/72" />
          {/* テキスト */}
          <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 md:py-20">
            <div className="max-w-2xl">
              <p className="text-xs font-bold text-white/60 uppercase tracking-widest mb-4">墓じまい体験談</p>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                実際に墓じまいを経験した方々の、<br className="hidden md:block" />
                リアルな声をお届けします。
              </h1>
              <p className="text-white/75 text-sm leading-relaxed">
                遠方のお墓の管理、後継者問題、費用の不安…<br />
                同じ悩みを乗り越えた方々の体験談をご覧ください。
              </p>
            </div>
          </div>
        </section>

        {/* Stories List — 案11: 横スクロール＋リスト（PC2列） */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-6">

            {/* ピックアップ横スクロール */}
            {(() => {
              const pickupSlugs = ["story-09", "story-10", "story-08", "story-17", "story-19"]
              const pickupStories = pickupSlugs.map(slug => stories.find(s => s.slug === slug)).filter(Boolean) as typeof stories
              return pickupStories.length > 0 && (
              <div className="mb-12">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">ピックアップ</p>
                <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ scrollbarWidth: "thin" }}>
                  {pickupStories.map((story) => (
                    <Link
                      key={story.id}
                      href={`/stories/${story.slug}`}
                      className="group shrink-0 w-80 snap-start bg-white rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow"
                    >
                      {story.heroImage && (
                        <div className="relative h-52 overflow-hidden">
                          <Image
                            src={story.heroImage}
                            alt=""
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="text-amber-400 text-xs font-bold mb-1">
                              {story.age} · {story.gender} · {story.address}在住
                            </p>
                            <p className="text-white text-sm font-bold leading-snug line-clamp-2">
                              {story.catchphrase}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {story.reasons.map((r) => (
                            <span key={r} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{r}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>
                            {story.graveLocation}
                            <ArrowRight className="w-3 h-3 inline mx-1 opacity-50" />
                            {story.destination}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
            })()}

            {/* 全件リスト（PC2列・スマホ1列） */}
            {(() => {
              const pickupSlugs = ["story-09", "story-10", "story-08", "story-17", "story-19"]
              const remainingStories = stories.filter(s => !pickupSlugs.includes(s.slug))
              return remainingStories.length > 0 && (
              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">すべての体験談</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {remainingStories.map((story) => (
                    <Link
                      key={story.id}
                      href={`/stories/${story.slug}`}
                      className="group bg-white rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-shadow flex"
                    >
                      {story.heroImage && (
                        <div className="relative w-36 shrink-0 overflow-hidden">
                          <Image
                            src={story.heroImage}
                            alt=""
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1 p-4 min-w-0">
                        <p className="text-xs text-muted-foreground mb-1">
                          {story.age} · {story.gender} · {story.address}在住
                        </p>
                        <p className="text-sm font-bold text-foreground leading-snug mb-2 line-clamp-2">
                          {story.catchphrase}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {story.reasons.map((r) => (
                            <span key={r} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{r}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span>
                            {story.graveLocation}
                            <ArrowRight className="w-2.5 h-2.5 inline mx-1 opacity-50" />
                            {story.destination}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
            })()}

          </div>
        </section>

        {/* 調査注記 */}
        <div className="mx-auto max-w-6xl px-6 pb-6">
          <p className="text-xs text-muted-foreground leading-relaxed">
            本ページの体験談は、当サイト（墓じまいパートナーズ）が墓じまい経験者を対象に実施したアンケート調査の回答をもとに掲載しています。<br />
            ※個人が特定されないよう一部内容の編集や、明らかな誤字・表現の修正を行っています。
          </p>
        </div>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <p className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-4">墓じまいパートナーズ</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              墓じまいの悩み、相談してください
            </h2>
            <p className="text-white/80 text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              自身で対応するのは難しいけど、お寺と良好な関係のまま墓じまいをしたい。<br />
              そんなご家族のお手伝いをいたします。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border border-white/20"
              >
                サービスについて詳しく
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
              >
                <Mail className="w-4 h-4" />
                無料相談はこちら
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
