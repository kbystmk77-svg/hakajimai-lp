"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const destinationData = [
  { name: "永代供養墓", value: 48.7, color: "#1e3a5f" },
  { name: "まだ決めていない", value: 17.0, color: "#3d6a8f" },
  { name: "納骨堂", value: 16.5, color: "#5d9ad5" },
  { name: "一般墓", value: 7.8, color: "#8bb8e8" },
  { name: "樹木葬", value: 6.5, color: "#b3d4f0" },
  { name: "散骨", value: 3.5, color: "#d9e9f7" },
]

export function SurveyDestination() {
  return (
    <section id="destination" className="scroll-mt-20 bg-[#f8fafc] py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            墓じまい後の供養先
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1e3a5f]" />
          <p className="mt-4 text-sm text-muted-foreground">回答数：n=230</p>
        </div>

        {/* Chart Card */}
        <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-lg md:p-8">
          <p className="mb-3 text-right text-xs text-muted-foreground/70">
            墓じまいパートナーズ「墓じまい実態調査2026」より
          </p>
          <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-center">
            {/* Pie Chart */}
            <div className="h-[300px] w-full max-w-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={destinationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                    labelLine={false}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {destinationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="w-full max-w-xs">
              <div className="space-y-3">
                {destinationData.map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg bg-white px-4 py-2 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-4 w-4 shrink-0 rounded"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm font-medium text-foreground">
                        {entry.name}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-[#1e3a5f]">
                      {entry.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Highlight box */}
          <div className="mt-8 rounded-xl bg-[#1e3a5f]/5 p-4 text-center">
            <p className="text-base text-foreground">
              <span className="font-semibold text-[#1e3a5f]">永代供養墓</span>
              が約半数を占め、最も選ばれている供養先です
            </p>
          </div>

          {/* Explanation */}
          <div className="mt-6 border-t border-border/40 pt-5 text-base leading-relaxed text-muted-foreground">
            <p>
              墓じまい後（または予定）の遺骨の供養方法（n=230）では、「永代供養墓」が48.7%と約半数を占め、最も選ばれています。寺院や霊園が遺骨を管理してくれる永代供養は、後継者がいない方や管理の手間を省きたい方に支持されています。
            </p>
            <p className="mt-3">
              次いで「まだ決めていない」が17.0%おり、墓じまいを検討中でも供養先が定まっていないケースが多いことがわかります。「納骨堂」は16.5%で、屋内管理で通いやすいことを理由に選ぶ方も増えています。
            </p>
            <p className="mt-3">
              「一般墓（別のお墓への移転）」が7.8%、「樹木葬」が6.5%、「散骨」が3.5%と、多様な選択肢から自分やご家族の希望に合った供養のかたちを選べる時代になっています。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
