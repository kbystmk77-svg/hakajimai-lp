import { Metadata } from "next"
import Link from "next/link"
import { stories } from "@/lib/stories"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { MapPin, ArrowRight, Quote, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "墓じまい体験談 | 墓じまいパートナーズ",
  description: "実際に墓じまいを検討・経験された方々の体験談をご紹介します。様々な理由や状況での墓じまいの事例をご覧ください。",
}

export default function StoriesPage() {
  return (
    <>
      <Header />
      <main className="bg-background min-h-screen">
        {/* Hero Section - Warm and approachable design */}
        <section className="relative bg-gradient-to-b from-primary/10 via-primary/5 to-background py-20 md:py-28 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-64 h-64 border border-primary/20 rounded-full" />
            <div className="absolute bottom-10 right-10 w-96 h-96 border border-primary/10 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Users className="w-4 h-4" />
                <span>{stories.length}名の方の体験談</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
                墓じまい体験談
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                実際に墓じまいを経験された方々のリアルな声。
                <br className="hidden md:block" />
                あなたと同じ悩みを抱えていた方の事例が、きっと見つかります。
              </p>
            </div>
          </div>
        </section>

        {/* Stories List - Card redesign */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story, index) => (
                <Link
                  key={story.id}
                  href={`/stories/${story.slug}`}
                  className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/20"
                >
                  {/* Top accent bar */}
                  <div className="h-1.5 bg-gradient-to-r from-primary to-primary/60" />
                  
                  <div className="p-6 md:p-8">
                    {/* Header with number and demographics */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-bold text-primary/20">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-lg font-semibold text-foreground">
                            {story.age}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {story.gender}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>

                    {/* Location info with visual flow */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-5 p-3 bg-secondary/50 rounded-lg">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-medium text-foreground">{story.graveLocation}</span>
                      <ArrowRight className="w-3 h-3 shrink-0" />
                      <span className="font-medium text-primary">{story.destination}</span>
                    </div>

                    {/* Reason tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {story.reasons.map((reason, idx) => (
                        <span 
                          key={idx} 
                          className="inline-block px-3 py-1.5 bg-primary/5 text-primary text-xs font-medium rounded-full border border-primary/10"
                        >
                          {reason}
                        </span>
                      ))}
                    </div>

                    {/* Episode excerpt with quote styling */}
                    <div className="relative">
                      <Quote className="absolute -top-1 -left-1 w-6 h-6 text-primary/10" />
                      <p className="text-foreground/80 text-sm leading-relaxed line-clamp-3 pl-4">
                        {story.triggerEpisode}
                      </p>
                    </div>

                    {/* Read more hint */}
                    <div className="mt-6 pt-5 border-t border-border">
                      <span className="text-primary font-medium text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                        体験談を読む
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - More impactful design */}
        <section className="py-16 md:py-24 bg-linen">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance">
                    あなたの墓じまいも
                    <br />
                    私たちにご相談ください
                  </h2>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    専門スタッフが無料でご相談を承っております。
                    まずはお気軽にお問い合わせください。
                  </p>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors w-fit"
                  >
                    無料相談はこちら
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
                <div className="hidden md:block bg-primary/5 p-12 relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <Quote className="w-48 h-48 text-primary" />
                  </div>
                  <div className="relative z-10 h-full flex flex-col justify-center">
                    <p className="text-lg text-foreground/80 italic leading-relaxed">
                      「体験談を読んで、自分と同じ悩みを持つ方がいることがわかり、勇気をもらいました。」
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground">
                      - 60代女性のお客様より
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
