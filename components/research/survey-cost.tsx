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
  { range: "10万円\n未満", count: 5, percentage: 6.4, isTop: false },
  { range: "10〜\n30万円", count: 18, percentage: 23.1, isTop: false },
  { range: "30〜\n50万円", count: 26, percentage: 33.3, isTop: true },
  { range: "50〜\n100万円", count: 19, percentage: 24.4, isTop: false },
  { range: "100万円\n以上", count: 10, percentage: 12.8, isTop: false },
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
            経験者78人
          </p>
        </div>

        {/* Chart Card */}
        <div className="overflow-hidden rounded-2xl bg-white px-2 py-6 shadow-lg md:p-8">
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
            <p className="text-sm text-foreground">
              <span className="font-semibold text-[#1e3a5f]">30〜50万円</span>
              が最も多く、全体の約3分の1を占めています
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
