"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { smoothScrollTo } from "@/lib/smooth-scroll"

const navLinks = [
  { label: "ご利用までの流れ", href: "#flow" },
  { label: "サービス内容", href: "#service" },
  { label: "料金", href: "#pricing" },
  { label: "よくある質問", href: "#faq" },
]

interface HeaderProps {
  showNavLinks?: boolean
}

export function Header({ showNavLinks = true }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2.5 text-xl font-bold text-foreground">
          <svg className="h-9 w-9 shrink-0" viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path className="text-primary" d="M52 8 C30 4, 10 18, 8 42 C6 60, 16 76, 32 84 C44 90, 52 92, 58 88 C62 86, 60 78, 64 72 C68 66, 78 66, 84 60 C92 52, 94 36, 86 22 C78 10, 66 10, 52 8Z" />
          </svg>
          墓じまいパートナーズ
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {showNavLinks && navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => smoothScrollTo(e, link.href)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => smoothScrollTo(e, "#contact")}
            className="rounded-lg bg-cta px-5 py-2.5 text-sm font-medium text-cta-foreground transition-opacity hover:opacity-90"
          >
            無料相談
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile nav */}
      {isOpen && (
        <nav className="border-t border-border bg-background px-6 pb-6 pt-4 md:hidden">
          <div className="flex flex-col gap-4">
            {showNavLinks && navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={(e) => { smoothScrollTo(e, link.href); setIsOpen(false) }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 inline-flex items-center justify-center rounded-lg bg-cta px-5 py-2.5 text-sm font-medium text-cta-foreground transition-opacity hover:opacity-90"
              onClick={(e) => { smoothScrollTo(e, "#contact"); setIsOpen(false) }}
            >
              無料相談
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
