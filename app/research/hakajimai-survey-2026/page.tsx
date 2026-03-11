import type { Metadata } from "next"
import { SimpleHeader } from "@/components/sections/simple-header"
import { Footer } from "@/components/sections/footer"
import { SurveyHero } from "@/components/research/survey-hero"
import { SurveySummary } from "@/components/research/survey-summary"

import { SurveyReasons } from "@/components/research/survey-reasons"
import { SurveyCost } from "@/components/research/survey-cost"
import { SurveyDifficulties } from "@/components/research/survey-difficulties"
import { SurveyDestination } from "@/components/research/survey-destination"
import { SurveyRidanryo } from "@/components/research/survey-ridanryo"
import { SurveySummaryText } from "@/components/research/survey-summary-text"
import { SurveyCta } from "@/components/research/survey-cta"
import { SurveyPhotoBreak } from "@/components/research/survey-photo-break"

export const metadata: Metadata = {
  title: "墓じまい実態調査2026 | 経験者・検討者230人アンケート",
  description:
    "墓じまいを経験または検討した230人を対象に、墓じまいの理由や費用、供養先などについて調査を実施しました。墓じまいをご検討中の方に役立つ調査データをご紹介します。",
  openGraph: {
    title: "墓じまい実態調査2026 | 経験者・検討者230人アンケート",
    description:
      "墓じまいを経験または検討した230人を対象に、墓じまいの理由や費用、供養先などについて調査を実施しました。",
    type: "article",
  },
}

export default function HakajimaiSurvey2026Page() {
  return (
    <div className="min-h-screen bg-background">
      <SimpleHeader />
      <main>
        <SurveyHero />
        <SurveySummary />
        <SurveyPhotoBreak
          src="/images/research/family-grave-visit.png"
          alt="墓参りをする家族"
        />
        <SurveyReasons />
        <SurveyCost />
        <SurveyRidanryo />
        <SurveyPhotoBreak
          src="/images/research/hakajimai-consultation.png"
          alt="墓じまいについて相談する夫婦"
        />
        <SurveyDifficulties />
        <SurveyDestination />
        <SurveySummaryText />
        <SurveyCta />
      </main>
      <Footer />
    </div>
  )
}
