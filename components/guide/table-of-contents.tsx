"use client"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronUp, List } from "lucide-react"

interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

interface TableOfContentsProps {
  toc: TocItem[]
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-80px 0px -80% 0px" }
    )

    toc.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [toc])

  if (toc.length === 0) return null

  // Mobile: Collapsible
  const mobileContent = (
    <div className="lg:hidden rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left"
      >
        <div className="flex items-center gap-2">
          <List className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">目次</span>
          <span className="text-xs text-muted-foreground">({toc.length}項目)</span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <nav className="border-t border-border px-4 pb-4">
          <ul className="space-y-1 pt-3">
            {toc.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-start gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                    item.level === 3 ? "ml-4" : ""
                  } ${
                    activeId === item.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {item.level === 2 ? `${index + 1}.` : "・"}
                  </span>
                  <span className="line-clamp-2">{item.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )

  // Desktop: Always visible sticky
  const desktopContent = (
    <div className="hidden lg:block rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
        <List className="h-4 w-4 text-primary" />
        <span className="font-semibold text-foreground text-sm">目次</span>
      </div>
      <nav className="max-h-[60vh] overflow-y-auto p-3">
        <ul className="space-y-0.5">
          {toc.map((item, index) => {
            const h2Index = toc.filter((t, i) => i <= toc.indexOf(item) && t.level === 2).length
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`flex items-start gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                    item.level === 3 ? "ml-3 text-xs" : ""
                  } ${
                    activeId === item.id
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span className="shrink-0 mt-px">
                    {item.level === 2 ? (
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded bg-primary/10 text-xs font-medium text-primary">
                        {h2Index}
                      </span>
                    ) : (
                      <span className="inline-flex h-4 w-4 items-center justify-center text-muted-foreground">
                        ・
                      </span>
                    )}
                  </span>
                  <span className="line-clamp-2 leading-snug">{item.text}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )

  return (
    <>
      {mobileContent}
      {desktopContent}
    </>
  )
}
