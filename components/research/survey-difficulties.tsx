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
  { difficulty: "お寺とのやり取り", percentage: 38.5, rank: 1 },
  { difficulty: "手続き・書類", percentage: 23.1, rank: 2 },
  { difficulty: "親族との話し合い", percentage: 17.3, rank: 3 },
  { difficulty: "費用", percentage: 13.5, rank: 4 },
  { difficulty: "石材店とのやりとり", percentage: 3.8, rank: 5 },
  { difficulty: "移転先の選定", percentage: 1.9, rank: 6 },
]

export function SurveyDifficulties() {
  return (
    <section id="difficulties" className="scroll-mt-20 bg-white py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            墓じまいで大変だったこと
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1e3a5f]" />
          <p className="mt-4 text-sm text-muted-foreground">
            墓じまい経験者のみの回答（n=52）
          </p>
        </div>

        {/* Chart Card */}
        <div className="overflow-hidden rounded-2xl bg-[#f8fafc] px-3 py-6 shadow-lg md:p-8">
          <p className="mb-3 text-right text-xs text-muted-foreground/70">
            墓じまいパートナーズ「墓じまい実態調査2026」より
          </p>
          <div className="h-[380px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={difficultiesData}
                layout="vertical"
                margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
              >
                <XAxis
                  type="number"
                  domain={[0, 50]}
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                  tickLine={{ stroke: "#e2e8f0" }}
                />
                <YAxis
                  type="category"
                  dataKey="difficulty"
                  width={120}
                  tick={{ fontSize: 11, fill: "#334155" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Bar dataKey="percentage" radius={[0, 6, 6, 0]} barSize={32}>
                  {difficultiesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.rank === 1 ? "#1e3a5f" : "#6b9fcf"}
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
              <span className="font-semibold text-[#1e3a5f]">
                「お寺とのやり取り」
              </span>
              が最も大変だったと回答した方が最多でした
            </p>
          </div>

          {/* Explanation */}
          <div className="mt-6 border-t border-border/40 pt-5 text-base leading-relaxed text-muted-foreground">
            <p>
              「お寺（住職）とのやり取り」が38.5%で最多でした。離檀の意向を伝える際に住職との関係性が難しかったという声が多く、精神的な負担を感じる方も多いようです。
            </p>
            <p className="mt-3">
              次いで「手続き・書類」が23.1%と、書類作成や行政手続きの煩雑さに苦労したとの声も目立ちます。「親族との話し合い」は17.3%で、家族・親族間での意見調整も課題となっています。
            </p>
            <p className="mt-3">
              「費用」を挙げた方も13.5%おり、予想外の費用発生や金額交渉に苦労するケースもあります。墓じまいには多方面での調整が必要で、時間的な余裕を持ったスケジュールで取り組むことが大切です。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
