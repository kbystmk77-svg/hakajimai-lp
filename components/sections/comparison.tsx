import { Circle, Triangle, X } from "lucide-react"

export function Comparison() {
  const rows = [
    {
      label: "お寺との関係",
      us: { icon: "circle", text: "円満に進める" },
      stone: { icon: "triangle", text: "配慮少なめ" },
      agency: { icon: "x", text: "トラブルになりがち" },
    },
    {
      label: "離断連絡",
      us: { icon: "circle", text: "感謝も伝え丁寧に" },
      stone: { icon: "x", text: "関与しない" },
      agency: { icon: "x", text: "強引になりがち" },
    },
    {
      label: "閉眼供養の対応",
      us: { icon: "circle", text: "お客様の要望に沿う" },
      stone: { icon: "x", text: "なし（自分で手配）" },
      agency: { icon: "triangle", text: "業者判断" },
    },
    {
      label: "対応エリア",
      us: { icon: "circle", text: "全国対応" },
      stone: { icon: "triangle", text: "自社エリアのみ" },
      agency: { icon: "circle", text: "全国対応" },
    },
    {
      label: "その他",
      us: { icon: "circle", text: "お寺指定の石材店があっても対応可能" },
      stone: { icon: "x", text: "お寺指定の石材店がある場合は対応不可" },
      agency: { icon: "x", text: "トラブル事例で不安を煽る訴求" },
    },
  ]

  function IconBadge({ type }: { type: string }) {
    if (type === "circle")
      return <Circle className="h-5 w-5 text-primary" strokeWidth={2.5} />
    if (type === "triangle")
      return <Triangle className="h-5 w-5 text-muted-foreground/50" strokeWidth={2} />
    return <X className="h-5 w-5 text-muted-foreground/40" strokeWidth={2} />
  }

  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
            サービスの特徴
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-primary" />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            {'「安ければいい」だけでは、あとで困ることがあります。'}
            <br className="hidden md:block" />
            {'お寺との関係も含めて、トータルでサポートできるのが私たちの強みです。'}
          </p>
        </div>

        {/* Mobile: Cards */}
        <div className="mt-12 flex flex-col gap-5 md:hidden">
          {rows.map((row, i) => (
            <div key={i} className="rounded-xl border border-border overflow-hidden">
              <p className="bg-muted/40 px-5 py-3 text-sm font-semibold text-foreground">
                {row.label}
              </p>
              <div className="flex flex-col gap-0 divide-y divide-border">
                {/* Us - active */}
                <div className="flex items-center gap-3 bg-primary/5 px-5 py-3 border-l-4 border-l-primary">
                  <IconBadge type={row.us.icon} />
                  <span className="text-sm font-semibold text-primary">{'私たち'}</span>
                  <span className="ml-auto text-sm font-medium text-foreground">{row.us.text}</span>
                </div>
                {/* Stone */}
                <div className="flex items-center gap-3 px-5 py-3">
                  <IconBadge type={row.stone.icon} />
                  <span className="text-sm text-muted-foreground">{'A社（石材店型）'}</span>
                  <span className="ml-auto text-sm text-muted-foreground">{row.stone.text}</span>
                </div>
                {/* Agency */}
                <div className="flex items-center gap-3 px-5 py-3">
                  <IconBadge type={row.agency.icon} />
                  <span className="text-sm text-muted-foreground">{'B社（代行業者）'}</span>
                  <span className="ml-auto text-sm text-muted-foreground">{row.agency.text}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table */}
        <div className="mt-12 hidden overflow-hidden rounded-xl border border-border md:block">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="w-40 border-b border-border bg-muted/30 px-6 py-4 text-left font-medium text-muted-foreground" />
                {/* Us - active column header */}
                <th className="border-b border-b-primary bg-primary px-6 py-4 text-center font-medium text-primary-foreground text-sm">
                  {'墓じまいパートナーズ'}
                  <span className="mt-0.5 block text-xs font-normal text-primary-foreground/80">
                    {'円満なお別れ'}
                  </span>
                </th>
                {/* Stone - inactive */}
                <th className="border-b border-border bg-muted-foreground/90 px-6 py-4 text-center text-sm font-medium text-background/90">
                  {'A社（石材店型）'}
                  <span className="mt-0.5 block text-xs font-normal text-background/60">
                    {'とにかく安い'}
                  </span>
                </th>
                {/* Agency - inactive */}
                <th className="border-b border-border bg-muted-foreground/90 px-6 py-4 text-center text-sm font-medium text-background/90">
                  {'B社（代行業者）'}
                  <span className="mt-0.5 block text-xs font-normal text-background/60">
                    {'お寺と衝突しがち'}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border last:border-b-0"
                >
                  {/* Row label */}
                  <td className="bg-muted/20 px-6 py-4 font-semibold text-foreground">
                    {row.label}
                  </td>
                  {/* Us - active cell */}
                  <td className="bg-primary/[0.04] px-6 py-4 border-x border-primary/20">
                    <div className="flex items-center gap-2">
                      <IconBadge type={row.us.icon} />
                      <span className="font-medium text-foreground">{row.us.text}</span>
                    </div>
                  </td>
                  {/* Stone */}
                  <td className="bg-muted/30 px-6 py-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <IconBadge type={row.stone.icon} />
                      <span>{row.stone.text}</span>
                    </div>
                  </td>
                  {/* Agency */}
                  <td className="bg-muted/30 px-6 py-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <IconBadge type={row.agency.icon} />
                      <span>{row.agency.text}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
          {'※ 上記は一般的な傾向をまとめたものであり、すべての事業者に当てはまるわけではありません。'}
        </p>
      </div>
    </section>
  )
}
