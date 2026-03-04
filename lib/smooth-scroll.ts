export function smoothScrollTo(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (href.startsWith("#") && href.length > 1) {
    e.preventDefault()
    const el = document.getElementById(href.slice(1))
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }
}
