import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { stories, getStoryBySlug, getAllStorySlugs } from "@/lib/stories"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import { 
  MapPin, 
  User, 
  Home, 
  ChevronLeft, 
  ChevronRight,
  Building2,
  ArrowRight,
  Clock,
  FileText,
  Wallet,
  MessageSquare,
  Users,
  Phone,
  Heart,
  Lightbulb,
  AlertCircle
} from "lucide-react"

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
    title: `${story.age}${story.gender}の墓じまい体験談 - ${story.reasons.join("・")} | 墓じまいパートナーズ`,
    description: story.triggerEpisode.substring(0, 160),
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

        {/* Hero Image */}
        {story.heroImage && (
          <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
            <Image
              src={story.heroImage}
              alt={`${story.age}${story.gender}の墓じまい体験談`}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}

        {/* Story Content */}
        <article className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Header Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white text-2xl font-bold">
                    {story.id}
                  </span>
                  <div>
                    <p className="text-xl font-bold text-foreground">
                      体験談 {story.id}
                    </p>
                    <p className="text-muted-foreground">
                      {story.age} {story.gender}
                    </p>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                    <User className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">お住まい</p>
                      <p className="font-medium text-foreground">{story.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">お墓の場所</p>
                      <p className="font-medium text-foreground">{story.graveLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                    <Building2 className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">墓地種類</p>
                      <p className="font-medium text-foreground">{story.cemeteryType}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg">
                    <Home className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="text-xs text-muted-foreground">お寺・霊園</p>
                      <p className="font-medium text-foreground">{story.templeName}</p>
                    </div>
                  </div>
                </div>

                {/* Reason Tags */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">墓じまいを検討した理由</p>
                  <div className="flex flex-wrap gap-2">
                    {story.reasons.map((reason, index) => (
                      <span
                        key={index}
                        className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-lg text-sm"
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Migration Info */}
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-primary" />
                  改葬について
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-secondary/30 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground mb-1">移転先</p>
                    <p className="font-semibold text-foreground">{story.destination}</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground mb-1">移転先種類</p>
                    <p className="font-semibold text-foreground">{story.destinationType}</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground mb-1">移転先費用</p>
                    <p className="font-semibold text-foreground">{story.destinationCost}</p>
                  </div>
                </div>
              </div>

              {/* Trigger Episode */}
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  墓じまいを考え始めたきっかけ
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {story.triggerEpisode}
                </p>
              </div>

              {/* Family Discussion */}
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  親族との話し合い
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {story.familyDiscussion}
                </p>
              </div>

              {/* Temple Reaction */}
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  お寺・霊園への連絡
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {story.templeReaction}
                </p>
              </div>

              {/* Cost & Process Info */}
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-primary" />
                  費用・手続きについて
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="p-4 bg-secondary/30 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground mb-1">離檀料</p>
                    <p className="font-semibold text-foreground text-sm">{story.ridanFee}</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground mb-1">お布施</p>
                    <p className="font-semibold text-foreground text-sm">{story.ofuse}</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground mb-1">石材店費用</p>
                    <p className="font-semibold text-foreground text-sm">{story.stoneShopCost}</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground mb-1">見積件数</p>
                    <p className="font-semibold text-foreground text-sm">{story.estimateCount}</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground mb-1">行政手続</p>
                    <p className="font-semibold text-foreground text-sm">{story.paperwork}</p>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-lg text-center">
                    <p className="text-xs text-muted-foreground mb-1">期間</p>
                    <p className="font-semibold text-foreground text-sm">{story.duration}</p>
                  </div>
                </div>
              </div>

              {/* Hardest Part */}
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  一番大変だったこと
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {story.hardestPart}
                </p>
              </div>

              {/* Good Points */}
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-6 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  墓じまいを終えて良かった点
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {story.goodPoints}
                </p>
              </div>

              {/* If Redo Again */}
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8 border border-border">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  もしやり直すなら変えたいこと
                </h2>
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {story.ifRedoAgain}
                </p>
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
