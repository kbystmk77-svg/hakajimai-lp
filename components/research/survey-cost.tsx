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
  { range: "10万円未満", count: 5, percentage: 6.4 },
  { range: "10〜30万円", count: 18, percentage: 23.1 },
  { range: "30〜50万円", count: 26, percentage: 33.3 },
  { range: "50〜100万円", count: 19, percentage: 24.4 },
  { range: "100万円以上", count: 10, percentage: 12.8 },
]

export function SurveyCost() {
  return (
    <section className="bg-[#1e3a5f]/5 py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            墓じまい費用
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1e3a5f]" />
          <p className="mt-4 text-sm text-muted-foreground">
            経験者78人
          </p>
        </div>

        {/* Chart Card */}
        <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-lg md:p-8">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={costData}
                margin={{ top: 30, right: 20, left: 20, bottom: 30 }}
              >
                <XAxis
                  dataKey="range"
                  tick={{ fontSize: 11, fill: "#334155" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={{ stroke: "#e2e8f0" }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={{ stroke: "#e2e8f0" }}
                  label={{
                    value: "人数",
                    angle: -90,
                    position: "insideLeft",
                    style: { fontSize: 12, fill: "#64748b" },
                  }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={60}>
                  {costData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.range === "30〜50万円" ? "#1e3a5f" : "#4d8ac5"}
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
