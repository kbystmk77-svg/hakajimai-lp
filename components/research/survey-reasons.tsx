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
  { reason: "墓が遠方にある", percentage: 47.8 },
  { reason: "管理・維持が難しい", percentage: 35.2 },
  { reason: "後継者がいない", percentage: 28.7 },
  { reason: "経済的な負担", percentage: 18.3 },
  { reason: "お墓を継ぐ人がいない", percentage: 15.7 },
  { reason: "その他", percentage: 8.4 },
]

export function SurveyReasons() {
  return (
    <section className="bg-white py-16 md:py-20">
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
                  width={110}
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
        </div>
      </div>
    </section>
  )
}
