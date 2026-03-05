"use client"

import { Share2 } from "lucide-react"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function ShareFamilyButton({ locationTag }: { locationTag: string }) {
  async function handleClick() {
    if (window.gtag) {
      window.gtag("event", "share_family", {
        method: "web_share_or_line",
        location: locationTag,
      })
    }

    const shareData = {
      title: "墓じまいパートナーズ",
      text: "墓じまいの相談ページ",
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        return
      } catch {
        // User cancelled or share failed — fall through to LINE
      }
    }

    // Fallback: LINE
    const lineText = encodeURIComponent(
      `墓じまいパートナーズのページ\n${window.location.href}`
    )
    window.open(
      `https://line.me/R/msg/text/?${lineText}`,
      "_blank",
      "noopener,noreferrer"
    )
  }

  return (
    <div className="relative z-10 flex flex-col items-center gap-1.5 py-6 md:hidden">
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:brightness-110"
      >
        <Share2 className="h-4 w-4" aria-hidden="true" />
        {'家族に共有'}
      </button>
      <span className="text-xs text-muted-foreground">
        {'家族にLINEなどで送れます'}
      </span>
    </div>
  )
}
