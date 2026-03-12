"use client"

import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Cell,
  LabelList,
  ResponsiveContainer,
} from "recharts"

export function SurveyRidanryo() {
  const ridanryoData = [
    { range: "5万円未満", value: 19.0 },
    { range: "5〜10万円", value: 23.8 },
    { range: "10〜20万円", value: 16.7 },
    { range: "20〜30万円", value: 21.4 },
    { range: "30万円以上", value: 7.1 },
    { range: "覚えていない", value: 11.9 },
  ]

  const colors = ["#6b9fcf", "#1e3a5f", "#3d6a8f", "#5d9ad5", "#b3d4f0", "#c8dff5"]

  return (
    <section id="ridanryo" className="scroll-mt-20 bg-[#1e3a5f]/10 py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            お布施の金額
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1e3a5f]" />
          <p className="mt-4 text-sm text-muted-foreground">
            お布施を支払った経験者のみの回答（n=42）
          </p>
        </div>

        {/* Chart Card */}
        <div className="overflow-hidden rounded-2xl bg-white px-3 py-6 shadow-lg md:p-8">
          <p className="mb-3 text-right text-xs text-muted-foreground/70">
            墓じまいパートナーズ「墓じまい実態調査2026」より
          </p>
          {/* Bar Chart */}
          <div className="h-80 w-full md:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ridanryoData}
                layout="vertical"
                margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
              >
                <XAxis
                  type="number"
                  domain={[0, 30]}
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="range"
                  tick={{ fill: "#374151", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={90}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={28}>
                  {ridanryoData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="right"
                    formatter={(value: number) => `${value}%`}
                    style={{ fill: "#1e3a5f", fontSize: 13, fontWeight: 600 }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Description */}
          <div className="mt-6 rounded-xl bg-[#1e3a5f]/5 p-4 text-center">
            <p className="text-base text-foreground">
              <span className="font-semibold text-[#1e3a5f]">「5〜10万円」</span>
              が最多（23.8%）、次いで
              <span className="font-semibold text-[#1e3a5f]">「20〜30万円」</span>
              （21.4%）。
            </p>
          </div>

          {/* Explanation */}
          <div className="mt-6 border-t border-border/40 pt-5 text-base leading-relaxed text-muted-foreground">
            <p>
              ここでのお布施は、墓じまいの際にお寺に納めた金額全体を指します。「離檀料」という名目で請求されることもありますが、多くの場合は離檀のご挨拶としてのお布施として渡されており、本調査でもその総称として「お布施」と表記しています。
            </p>
            <p className="mt-3">
              実際に支払った経験者（n=42）のうち、「5〜10万円」が23.8%で最多となりました。次いで「20〜30万円」が21.4%、「5万円未満」が19.0%と続きます。10万円以内が全体の約4割を占める一方、「20万円以上」支払ったケースも約3割あり、金額にはばらつきが見られます。
            </p>
            <p className="mt-3">
              お布施（離檀料）に法的な支払い義務はなく、一般的な目安は3〜10万円程度とされていますが、寺院との関係性や地域の慣習によって異なるため、事前に丁寧な話し合いをすることが大切です。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
