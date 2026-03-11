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
    { range: "5万円未満", value: 12.8 },
    { range: "5〜10万円", value: 35.9 },
    { range: "10〜20万円", value: 28.2 },
    { range: "20〜30万円", value: 14.1 },
    { range: "30万円以上", value: 9.0 },
  ]

  const colors = ["#8bb8e8", "#1e3a5f", "#3d6a8f", "#5d9ad5", "#b3d4f0"]

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
            墓じまい費用には墓石撤去費や離檀料などが含まれます。
            <br />
            ここでは、離檀料のみの金額について聞きました。
          </p>
          <p className="mt-3 inline-flex items-center rounded-full bg-[#1e3a5f]/10 px-3 py-1 text-xs text-[#1e3a5f]">
            対象：墓じまい経験者
          </p>
        </div>

        {/* Chart Card */}
        <div className="overflow-hidden rounded-2xl bg-white px-3 py-6 shadow-lg md:p-8">
          {/* Bar Chart */}
          <div className="h-72 w-full md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ridanryoData}
                layout="vertical"
                margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
              >
                <XAxis
                  type="number"
                  domain={[0, 50]}
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
                  width={75}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={32}>
                  {ridanryoData.map((entry, index) => (
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
          <div className="mt-6 rounded-xl border border-[#1e3a5f]/20 bg-[#f8fafc] p-4">
            <p className="text-sm leading-relaxed text-foreground">
              離檀料は「<span className="font-semibold text-[#1e3a5f]">5〜10万円</span>」が最も多く、
              次いで「<span className="font-semibold text-[#1e3a5f]">10〜20万円</span>」が多い結果となりました。
              全体として、離檀料は<span className="font-semibold text-[#1e3a5f]">5〜20万円程度</span>がボリュームゾーンとなっています。
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              ※回答対象：墓じまい経験者
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
