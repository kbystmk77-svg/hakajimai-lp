"use client"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export function LineShareButton() {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    if (window.gtag) {
      window.gtag("event", "line_share", { method: "line" })
    }
    const shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`
    window.open(shareUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="flex justify-center py-6 md:hidden">
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#06C755] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:brightness-110"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386a.63.63 0 0 1-.63-.629V8.108a.63.63 0 0 1 .63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016a.63.63 0 0 1-.63.63.626.626 0 0 1-.51-.262l-2.455-3.338v2.97a.63.63 0 0 1-.63.63.63.63 0 0 1-.63-.63V8.108a.63.63 0 0 1 .63-.63c.2 0 .385.096.504.255l2.462 3.33V8.108a.63.63 0 0 1 .63-.63.63.63 0 0 1 .63.63v4.771zm-5.741 0a.63.63 0 0 1-1.261 0V8.108a.63.63 0 0 1 1.261 0v4.771zm-2.304.63H5.08a.63.63 0 0 1-.63-.63V8.108a.63.63 0 0 1 1.261 0v4.141h1.755c.349 0 .63.283.63.63 0 .344-.282.63-.63.63zM12 0C5.373 0 0 4.989 0 11.146c0 5.51 4.887 10.125 11.489 10.996.448.096 1.057.296 1.212.68.14.346.092.889.045 1.237l-.196 1.176c-.06.357-.278 1.398 1.225.762 1.502-.637 8.108-4.776 11.066-8.176C27.134 15.224 24 13.4 24 11.146 24 4.989 18.627 0 12 0z" />
        </svg>
        {'家族にLINEで共有'}
      </a>
    </div>
  )
}
