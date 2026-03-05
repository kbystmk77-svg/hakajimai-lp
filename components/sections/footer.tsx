import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="text-base font-bold text-foreground">
              墓じまいパートナーズ
            </span>
            <span className="text-xs text-muted-foreground">
              お墓の整理を、安心と丁寧さで支えます
            </span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              プライバシーポリシー
            </Link>
            <a
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              特定商取引法に基づく表記
            </a>
            <Link
              href="/company"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              会社概要
            </Link>
          </nav>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 墓じまいパートナーズ All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
