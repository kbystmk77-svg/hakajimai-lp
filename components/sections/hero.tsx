"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { smoothScrollTo } from "@/lib/smooth-scroll"

export function Hero() {
  return (
    <section className="relative">
      {/* Full-bleed photo */}
      <div className="relative min-h-[520px] md:min-h-[620px]">
        <Image
          src="/images/hero-family.png"
          alt="リビングでくつろぐ三世代家族"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay – left side only for text readability, no blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* Text content */}
        <div className="relative z-10 mx-auto flex h-full min-h-[520px] max-w-6xl items-center px-6 md:min-h-[620px]">
          <div className="max-w-xl">
            <h1 className="text-4xl font-bold leading-[1.2] tracking-tight text-white sm:text-5xl lg:text-[3.5rem] text-balance">
              立会はできない
              <br />
              でも納得して
              <br />
              墓じまいをしたい
            </h1>
            <div className="mt-5 h-1 w-16 rounded-full bg-white/60" />
            <p className="mt-6 text-base leading-relaxed text-white/85 md:text-lg">
              自身で対応するのは難しいけど、お寺と良好な関係のまま墓じまいをしたい。そんなご家族のお手伝いをいたします。
            </p>
            {/* Key points */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {["現地への立会不要", "お寺への連絡も代行", "全国どこでも対応可"].map((text) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cta" />
                  {text}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#contact"
                onClick={(e) => smoothScrollTo(e, "#contact")}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-cta px-8 py-4 text-base font-semibold text-cta-foreground shadow-lg transition-all hover:brightness-110"
              >
                まずは無料で相談する
                <ArrowRight className="h-4 w-4" />
              </a>
              <span className="text-sm text-white/70">
                相談は何度でも無料です
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
