import Link from "next/link"

const links = [
  {
    title: "墓じまい完全ガイド",
    href: "/hakajimai",
  },
  {
    title: "墓じまいの費用はいくら？内訳・相場・節約ポイントを徹底解説",
    href: "/articles/hakajimai-cost",
  },
  {
    title: "墓じまいの流れを8ステップで解説",
    href: "/articles/hakajimai-flow",
  },
  {
    title: "離檀料とは？相場・支払い義務・高額請求への対処法を解説",
    href: "/articles/ridanryou-what",
  },
]

export function SurveyRelatedLinks() {
  return (
    <section className="bg-[#f8fafc] py-12 md:py-14">
      <div className="mx-auto max-w-3xl px-6">
        <p className="mb-5 text-base font-medium text-foreground">
          墓じまいの流れや手続きについて詳しく知りたい方は、以下のガイドも参考にしてください。
        </p>
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.href} className="flex items-baseline gap-2">
              <span className="shrink-0 text-muted-foreground">・</span>
              <Link
                href={link.href}
                className="text-sm text-[#1e3a5f] underline underline-offset-2 hover:opacity-70"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
