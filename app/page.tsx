import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { Empathy } from "@/components/sections/empathy"
import { Position } from "@/components/sections/position"
import { Comparison } from "@/components/sections/comparison"
import { Confirmation } from "@/components/sections/confirmation"
import { Service } from "@/components/sections/service"
import { Flow } from "@/components/sections/flow"
import { Pricing } from "@/components/sections/pricing"
import { DeveloperVoice } from "@/components/sections/developer-voice"
import { Faq } from "@/components/sections/faq"
import { Cta } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"
import { ShareFamilyButton } from "@/components/share-family-button"

/*
 * Design approach:
 * Each colored section has a "bottom overlay" SVG that is filled with
 * the NEXT section's background color. The SVG sits at the bottom of
 * the current section, overlapping it. This way textures/patterns
 * are never interrupted — the overlay simply covers part of them
 * with the incoming color, creating a seamless shaped transition.
 */

/* Reusable bottom-overlay wrapper */
function BottomShape({
  children,
  fill,
  shape,
}: {
  children: React.ReactNode
  fill: string
  shape: "wave" | "slant" | "arch" | "curve" | "hill" | "zigzag"
}) {
  const paths: Record<string, string> = {
    wave: "M0,60 Q360,120 720,60 Q1080,0 1440,50 L1440,120 L0,120 Z",
    slant: "M0,80 L1440,0 L1440,120 L0,120 Z",
    arch: "M0,120 Q720,0 1440,120 L1440,120 L0,120 Z",
    curve: "M0,40 C360,120 1080,0 1440,60 L1440,120 L0,120 Z",
    hill: "M0,90 Q300,20 600,60 Q900,100 1200,30 Q1350,0 1440,40 L1440,120 L0,120 Z",
    zigzag: "M0,60 L240,30 L480,70 L720,20 L960,80 L1200,40 L1440,60 L1440,120 L0,120 Z",
  }

  return (
    <div className="relative">
      {children}
      <svg
        className="absolute bottom-0 left-0 block w-full"
        style={{ height: "80px" }}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d={paths[shape]} fill={fill} />
      </svg>
    </div>
  )
}

/* Color constants (must match globals.css) */
const COLORS = {
  white: "#ffffff",
  linen: "#f0ebe3",
  sage: "#e4ecf4",
  warm: "#f3ece2",
  dotGreen: "#e8f0e8",
  slate: "#eaeff4",
} as const

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* 1. Hero (white) → wave → linen */}
        <BottomShape fill={COLORS.linen} shape="wave">
          <Hero />
        </BottomShape>

        {/* 2. Empathy (linen) → slant → white */}
        <BottomShape fill={COLORS.white} shape="slant">
          <div className="bg-linen">
            <Empathy />
          </div>
        </BottomShape>

        {/* 3. Position (white) → arch → sage */}
        <BottomShape fill={COLORS.sage} shape="arch">
          <Position />
          <ShareFamilyButton locationTag="after_position" />
        </BottomShape>

        {/* 4. Comparison (sage) → curve → white */}
        <BottomShape fill={COLORS.white} shape="curve">
          <div className="bg-sage">
            <Comparison />
          </div>
        </BottomShape>

        {/* 5. Confirmation (white) → hill → warm */}
        <BottomShape fill={COLORS.warm} shape="hill">
          <Confirmation />
        </BottomShape>

        {/* 6. Flow (warm) → wave → white */}
        <BottomShape fill={COLORS.white} shape="wave">
          <div className="bg-warm" id="flow">
            <Flow />
          </div>
        </BottomShape>

        {/* 7. Service (white) → slant → dot-green */}
        <BottomShape fill={COLORS.dotGreen} shape="slant">
          <div id="service">
            <Service />
          </div>
          <ShareFamilyButton locationTag="after_service" />
        </BottomShape>

        {/* 8. Pricing (dot-green) → arch → slate */}
        <BottomShape fill={COLORS.slate} shape="arch">
          <div
            id="pricing"
            style={{
              backgroundColor: "#e8f0e8",
              backgroundImage: "radial-gradient(circle, rgba(60,120,60,0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          >
            <Pricing />
          </div>
        </BottomShape>

        {/* 9. DeveloperVoice (slate) → zigzag → white */}
        <BottomShape fill={COLORS.white} shape="zigzag">
          <div className="bg-slate-light">
            <DeveloperVoice />
          </div>
        </BottomShape>

        {/* 10. FAQ (white) → curve → linen */}
        <BottomShape fill={COLORS.linen} shape="curve">
          <div id="faq">
            <Faq />
          </div>
        </BottomShape>

        {/* 11. Guide Link (linen) */}
        <div className="bg-linen">
          <section className="mx-auto max-w-6xl px-6 py-12">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  墓じまい完全ガイド
                </h3>
                <p className="text-sm text-muted-foreground">
                  墓じまいの意味や改葬との違いといった基本的な知識から、実際の流れ、費用の目安、墓じまい後の供養方法までをわかりやすく解説します。
                </p>
              </div>
              <a
                href="/hakajimai"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-md whitespace-nowrap"
              >
                ガイドを読む
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </section>
        </div>

        {/* 12. CTA (linen) */}
        <div className="bg-linen">
          <Cta />
          <ShareFamilyButton locationTag="after_cta" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
