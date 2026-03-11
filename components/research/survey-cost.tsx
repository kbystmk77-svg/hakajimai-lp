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

const costData = [
  { range: "10万円\n未満", count: 10, percentage: 19.2, isTop: false },
  { range: "10〜\n20万円", count: 7, percentage: 13.5, isTop: false },
  { range: "20〜\n30万円", count: 9, percentage: 17.3, isTop: false },
  { range: "30〜\n50万円", count: 10, percentage: 19.2, isTop: true },
  { range: "50〜\n70万円", count: 7, percentage: 13.5, isTop: false },
  { range: "70〜\n100万円", count: 6, percentage: 11.5, isTop: false },
  { range: "100万円\n以上", count: 3, percentage: 5.8, isTop: false },
]

export function SurveyCost() {
  return (
    <section id="cost" className="scroll-mt-20 bg-[#1e3a5f]/5 py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            墓じまい費用の総額
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1e3a5f]" />
          <p className="mt-4 text-sm text-muted-foreground">
            墓じまい経験者のみの回答（n=52）
          </p>
        </div>

        {/* Chart Card */}
        <div className="overflow-hidden rounded-2xl bg-white px-2 py-6 shadow-lg md:p-8">
          <p className="mb-3 text-right text-xs text-muted-foreground/70">
            墓じまいパートナーズ「墓じまい実態調査2026」より
          </p>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={costData}
                margin={{ top: 25, right: 5, left: 5, bottom: 5 }}
              >
                <XAxis
                  dataKey="range"
                  tick={{ fontSize: 10, fill: "#334155" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={false}
                  interval={0}
                  height={40}
                />
                <YAxis hide />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={48}>
                  {costData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.isTop ? "#1e3a5f" : "#6b9fcf"}
                    />
                  ))}
                  <LabelList
                    dataKey="percentage"
                    position="top"
                    formatter={(value: number) => `${value}%`}
                    style={{ fontSize: 12, fontWeight: 600, fill: "#1e3a5f" }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Highlight box */}
          <div className="mt-6 rounded-xl bg-[#1e3a5f]/5 p-4 text-center">
            <p className="text-base text-foreground">
              <span className="font-semibold text-[#1e3a5f]">10万円未満</span>
              と
              <span className="font-semibold text-[#1e3a5f]">30〜50万円</span>
              が同率1位（各19.2%）。費用は幅広く分布しています
            </p>
          </div>

          {/* Explanation */}
          <div className="mt-6 border-t border-border/40 pt-5 text-base leading-relaxed text-muted-foreground">
            <p>
              墓じまいの費用総額は「10万円未満」と「30〜50万円」が各19.2%で同率1位となりました。次いで「20〜30万円」が17.3%、「50〜70万円」が13.5%と続きます。
            </p>
            <p className="mt-3">
              費用は撤去する墓石の規模や墓地の種類、移転先の供養方法によって大きく異なり、10万円以下で済む場合から100万円以上かかる場合まで幅広く分布しています。墓石の撤去だけでなく、離檀料や移転先の費用も含まれるため、事前に複数の業者から見積もりを取り、比較検討することが重要です。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
