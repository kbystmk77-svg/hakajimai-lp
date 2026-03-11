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

const difficultiesData = [
  { difficulty: "お寺とのやり取り", percentage: 42.3, rank: 1 },
  { difficulty: "費用の確保", percentage: 35.9, rank: 2 },
  { difficulty: "親族との調整", percentage: 32.1, rank: 3 },
  { difficulty: "業者選び", percentage: 26.9, rank: 4 },
  { difficulty: "行政手続き", percentage: 21.8, rank: 5 },
  { difficulty: "供養先の選定", percentage: 17.9, rank: 6 },
]

export function SurveyDifficulties() {
  return (
    <section className="bg-[#f8fafc] py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            墓じまいで大変だったこと
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1e3a5f]" />
          <p className="mt-4 text-sm text-muted-foreground">
            複数回答可（n=78）
          </p>
        </div>

        {/* Chart Card */}
        <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-lg md:p-8">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={difficultiesData}
                layout="vertical"
                margin={{ top: 10, right: 60, left: 20, bottom: 10 }}
              >
                <XAxis
                  type="number"
                  domain={[0, 50]}
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={{ stroke: "#e2e8f0" }}
                />
                <YAxis
                  type="category"
                  dataKey="difficulty"
                  width={120}
                  tick={{ fontSize: 12, fill: "#334155" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Bar dataKey="percentage" radius={[0, 6, 6, 0]} barSize={32}>
                  {difficultiesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.rank === 1 ? "#1e3a5f" : "#4d8ac5"}
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
            <p className="text-sm text-foreground">
              <span className="font-semibold text-[#1e3a5f]">
                「お寺とのやり取り」
              </span>
              が最も大変だったと回答した方が最多でした
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
