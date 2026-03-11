"use client"

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts"

const reasonsData = [
  { reason: "遠方のため", percentage: 47.8 },
  { reason: "墓参りが難しくなった", percentage: 37.8 },
  { reason: "管理費が負担", percentage: 31.7 },
  { reason: "子どもに迷惑をかけたくない", percentage: 22.2 },
  { reason: "親が亡くなった", percentage: 19.1 },
  { reason: "その他", percentage: 4.8 },
]

export function SurveyReasons() {
  return (
    <section id="reasons" className="scroll-mt-20 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            墓じまいの理由
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1e3a5f]" />
          <p className="mt-4 text-sm text-muted-foreground">
            複数回答可（n=230）
          </p>
        </div>

        {/* Chart Card */}
        <div className="overflow-hidden rounded-2xl bg-[#f8fafc] px-3 py-6 shadow-lg md:p-8">
          <p className="mb-3 text-right text-xs text-muted-foreground/70">
            墓じまいパートナーズ「墓じまい実態調査2026」より
          </p>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reasonsData}
                layout="vertical"
                margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
              >
                <XAxis
                  type="number"
                  domain={[0, 60]}
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={{ stroke: "#e2e8f0" }}
                />
                <YAxis
                  type="category"
                  dataKey="reason"
                  width={150}
                  tick={{ fontSize: 11, fill: "#334155" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Bar dataKey="percentage" radius={[0, 6, 6, 0]} barSize={32}>
                  {reasonsData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#1e3a5f" : "#6b9fcf"}
                    />
                  ))}
                  <LabelList
                    dataKey="percentage"
                    position="right"
                    formatter={(value: number) => `${value}%`}
                    style={{ fontSize: 13, fontWeight: 600, fill: "#1e3a5f" }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Highlight box */}
          <div className="mt-6 rounded-xl bg-[#1e3a5f]/5 p-4 text-center">
            <p className="text-base text-foreground">
              <span className="font-semibold text-[#1e3a5f]">「遠方のため」</span>
              が最多（47.8%）。距離・管理・費用など複合的な理由が重なっています
            </p>
          </div>

          {/* Explanation */}
          <div className="mt-6 border-t border-border/40 pt-5 text-base leading-relaxed text-muted-foreground">
            <p>
              「遠方のため」が47.8%と最多で、約半数の方が距離的な問題を抱えていることがわかります。次いで「墓参りが難しくなった」が37.8%と続き、高齢化や身体的な理由から墓の管理が困難になっているケースも多く見られます。
            </p>
            <p className="mt-3">
              「管理費が負担」も31.7%と3割以上が経済的な問題を抱えており、継続的な費用負担が墓じまいを検討するきっかけになっていることがわかります。「子どもに迷惑をかけたくない」は22.2%と、次世代への配慮から墓じまいを考える方も相当数います。
            </p>
            <p className="mt-3">
              「親が亡くなった」をきっかけとした方も19.1%おり、身近な方の逝去が墓の継承問題を考えるタイミングになっています。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
