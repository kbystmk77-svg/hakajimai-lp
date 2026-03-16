import { Metadata } from "next"
import Link from "next/link"
import { stories } from "@/lib/stories"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { MapPin, User, ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "墓じまい体験談 | 墓じまいパートナーズ",
  description: "実際に墓じまいを検討・経験された方々の体験談をご紹介します。様々な理由や状況での墓じまいの事例をご覧ください。",
}

export default function StoriesPage() {
  return (
    <>
      <Header />
      <main className="bg-linen min-h-screen">
        {/* Hero Section */}
        <section className="bg-primary py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              墓じまい体験談
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              実際に墓じまいを検討・経験された方々の声をご紹介します。
              <br className="hidden md:block" />
              様々な理由や状況での事例を参考にしてください。
            </p>
          </div>
        </section>

        {/* Stories List */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <Link
                  key={story.id}
                  href={`/stories/${story.slug}`}
                  className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-border"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                      {story.id}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {story.age} {story.gender}
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                      {story.reason}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {story.address}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {story.graveLocation}
                    </span>
                  </div>

                  <p className="text-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                    {story.episode}
                  </p>

                  <div className="flex items-center text-primary font-medium text-sm group-hover:underline">
                    続きを読む
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              墓じまいについてお悩みですか？
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              墓じまいパートナーズでは、専門スタッフが無料でご相談を承っております。
              お気軽にお問い合わせください。
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
            >
              無料相談はこちら
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
