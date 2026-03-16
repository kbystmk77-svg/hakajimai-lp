// components/Pagination.tsx
import Link from "next/link"

type Props = {
  currentPage: number
  totalCount: number
  perPage: number
  basePath: string
}

export default function Pagination({ currentPage, totalCount, perPage, basePath }: Props) {
  const totalPages = Math.ceil(totalCount / perPage)
  if (totalPages <= 1) return null

  const buildHref = (page: number) =>
    page === 1 ? basePath : `${basePath}?page=${page}`

  return (
    <nav aria-label="ページネーション" className="flex justify-center flex-wrap gap-2 mt-12">
      {currentPage > 1 && (
        <Link
          href={buildHref(currentPage - 1)}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition text-sm"
        >
          ← 前へ
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={buildHref(page)}
          className={`px-4 py-2 border rounded-lg text-sm transition ${
            page === currentPage
              ? "bg-gray-800 text-white border-gray-800"
              : "hover:bg-gray-50"
          }`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={buildHref(currentPage + 1)}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition text-sm"
        >
          次へ →
        </Link>
      )}
    </nav>
  )
}
