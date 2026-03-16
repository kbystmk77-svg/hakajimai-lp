import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { Media } from "@/components/sections/media"
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

        {/* 2. Media + Empathy (linen) → slant → white */}
        <BottomShape fill={COLORS.white} shape="slant">
          <div className="bg-linen">
            <Media />
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

        {/* 11. CTA (linen) */}
        <div className="bg-linen">
          <Cta />
          <ShareFamilyButton locationTag="after_cta" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
