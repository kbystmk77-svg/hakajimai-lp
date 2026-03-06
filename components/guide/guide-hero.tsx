import Image from "next/image"
import { Calendar, RefreshCw } from "lucide-react"

interface GuideHeroProps {
  title: string
  description?: string
  thumbnailUrl?: string
  thumbnailAlt?: string
  publishedAt?: string
  updatedAt?: string
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${year}年${month}月${day}日`
}

export function GuideHero({
  title,
  description,
  thumbnailUrl,
  thumbnailAlt = "",
  publishedAt,
  updatedAt,
}: GuideHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-slate-50 to-white">
      {/* Subtle gradient circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cta/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              墓じまい完全ガイド
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-foreground mb-6">
              {title}
            </h1>

            {/* Description */}
            {description && (
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                {description}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
              {publishedAt && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>公開：{formatDate(publishedAt)}</span>
                </div>
              )}
              {updatedAt && (
                <div className="flex items-center gap-1.5">
                  <RefreshCw className="h-4 w-4" />
                  <span>更新：{formatDate(updatedAt)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail */}
          <div className="relative">
            {thumbnailUrl ? (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted shadow-xl">
                <Image
                  src={thumbnailUrl}
                  alt={thumbnailAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-cta/20 blur-2xl" />
                <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-primary/20 blur-xl" />
              </div>
            ) : (
              <div className="aspect-[4/3] rounded-2xl border border-border bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">No Image</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
          <path
            d="M0 60V30C240 50 480 10 720 30C960 50 1200 10 1440 30V60H0Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  )
}
