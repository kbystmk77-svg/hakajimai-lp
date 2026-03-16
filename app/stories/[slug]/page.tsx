import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { stories, getStoryBySlug, getAllStorySlugs } from "@/lib/stories"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { MapPin, User, Calendar, Home, ChevronLeft, ChevronRight } from "lucide-react"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllStorySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const story = getStoryBySlug(slug)
  
  if (!story) {
    return {
      title: "体験談が見つかりません | 墓じまいパートナーズ",
    }
  }

  return {
    title: `${story.age}${story.gender}の墓じまい体験談 - ${story.reason} | 墓じまいパートナーズ`,
    description: story.episode.substring(0, 160),
  }
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { slug } = await params
  const story = getStoryBySlug(slug)

  if (!story) {
    notFound()
  }

  const currentIndex = stories.findIndex((s) => s.slug === slug)
  const prevStory = currentIndex > 0 ? stories[currentIndex - 1] : null
  const nextStory = currentIndex < stories.length - 1 ? stories[currentIndex + 1] : null

  return (
    <>
      <Header />
      <main className="bg-linen min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                ホーム
              </Link>
              <span>/</span>
              <Link href="/stories" className="hover:text-primary">
                体験談一覧
              </Link>
              <span>/</span>
              <span className="text-foreground">体験談 {story.id}</span>
            </nav>
          </div>
        </div>

        {/* Story Content */}
        <article className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Header */}
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8 border border-border">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white text-xl font-bold">
                    {story.id}
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      体験談 {story.id}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {story.age} {story.gender}
                    </p>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">お住まい</p>
                      <p className="font-medium text-foreground">{story.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">お墓の場所</p>
                      <p className="font-medium text-foreground">{story.graveLocation}</p>
                    </div>
                  </div>
                </div>

                {/* Reason Tag */}
                <div className="mb-6">
                  <p className="text-xs text-muted-foreground mb-2">墓じまいを検討した理由</p>
                  <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-lg">
                    {story.reason}
                  </span>
                </div>
              </div>

              {/* Episode */}
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8 border border-border">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5 text-primary" />
                  エピソード
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-foreground leading-relaxed whitespace-pre-line">
                    {story.episode}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between gap-4">
                {prevStory ? (
                  <Link
                    href={`/stories/${prevStory.slug}`}
                    className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow text-sm"
                  >
                    <ChevronLeft className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">前の体験談</span>
                  </Link>
                ) : (
                  <div />
                )}
                
                <Link
                  href="/stories"
                  className="px-4 py-3 bg-white rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow text-sm text-muted-foreground"
                >
                  一覧に戻る
                </Link>

                {nextStory ? (
                  <Link
                    href={`/stories/${nextStory.slug}`}
                    className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg shadow-sm border border-border hover:shadow-md transition-shadow text-sm"
                  >
                    <span className="text-muted-foreground">次の体験談</span>
                    <ChevronRight className="w-4 h-4 text-primary" />
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </article>

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
