import Link from "next/link"

export function SimpleHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold text-foreground"
        >
          <svg
            className="h-9 w-9 shrink-0"
            viewBox="0 0 100 100"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              className="text-primary"
              d="M52 8 C30 4, 10 18, 8 42 C6 60, 16 76, 32 84 C44 90, 52 92, 58 88 C62 86, 60 78, 64 72 C68 66, 78 66, 84 60 C92 52, 94 36, 86 22 C78 10, 66 10, 52 8Z"
            />
          </svg>
          墓じまいパートナーズ
        </Link>
      </div>
    </header>
  )
}
