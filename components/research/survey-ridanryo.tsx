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
    { range: "支払っていない", value: 19.2 },
    { range: "5万円未満", value: 15.4 },
    { range: "5〜10万円", value: 19.2 },
    { range: "10〜20万円", value: 13.5 },
    { range: "20〜30万円", value: 17.3 },
    { range: "30万円以上", value: 5.8 },
    { range: "覚えていない", value: 9.6 },
  ]

  const colors = ["#8bb8e8", "#6b9fcf", "#1e3a5f", "#3d6a8f", "#5d9ad5", "#b3d4f0", "#c8dff5"]

  return (
    <section id="ridanryo" className="scroll-mt-20 bg-[#1e3a5f]/10 py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            離檀料の金額
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1e3a5f]" />
          <p className="mt-4 text-sm text-muted-foreground">
            墓じまい経験者のみの回答（n=52）
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
              <span className="font-semibold text-[#1e3a5f]">「支払っていない」</span>
              と
              <span className="font-semibold text-[#1e3a5f]">「5〜10万円」</span>
              が同率1位（各19.2%）。
            </p>
          </div>

          {/* Explanation */}
          <div className="mt-6 border-t border-border/40 pt-5 text-base leading-relaxed text-muted-foreground">
            <p>
              離檀料については「支払っていない（予定なし）」と「5〜10万円」がそれぞれ19.2%と並んで最多でした。お寺によって離檀料の有無や金額は大きく異なり、全体の約2割は離檀料なしで墓じまいを実現しています。
            </p>
            <p className="mt-3">
              「20〜30万円」が17.3%、「5万円未満」が15.4%と続き、10万円以内での離檀が多いことがわかります。一方「30万円以上」を支払ったケースも5.8%あり、高額な離檀料を求められる場合も一部存在します。
            </p>
            <p className="mt-3">
              離檀料に法的な義務はなく、一般的な目安は3〜10万円程度とされていますが、寺院との関係性や地域の慣習によって異なるため、事前に丁寧な話し合いをすることが大切です。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
