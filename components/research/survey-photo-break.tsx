import Image from "next/image"

interface SurveyPhotoBreakProps {
  src: string
  alt: string
}

export function SurveyPhotoBreak({ src, alt }: SurveyPhotoBreakProps) {
  return (
    <div className="relative h-48 w-full overflow-hidden md:h-64 lg:h-80">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
      />
    </div>
  )
}
