export function Pricing() {
  return (
    <section>
      <div className="mx-auto max-w-4xl px-6 py-20 md:py-28">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
            料金について
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-primary" />
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
            {'費用は主に「工事費」と「代行料」に分かれます。'}
          </p>
        </div>

        {/* Breakdown cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {/* Card 1: 工事費 */}
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-background px-6 py-8 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.194-.14 1.743" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-foreground">工事費</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              墓石の撤去・取り出し・処分にかかる費用です。
              お墓の大きさや立地条件・御遺骨の数などにより変動します。
            </p>
            <p className="mt-auto pt-3 text-sm font-medium text-foreground">
              {'15万〜40万円前後'}
              <span className="ml-1 text-xs font-normal text-muted-foreground">{'(目安)'}</span>
            </p>
          </div>

          {/* Card 2: 基本代行料 */}
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-background px-6 py-8 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-foreground">基本代行料</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              寺院や霊園との調整・行政書類のサポート・石材店への見積など、
              すべての代行業務を含みます。
            </p>
            <p className="mt-auto pt-3 text-sm font-medium text-foreground">13.2万円</p>
          </div>

          {/* Card 3: 移転先サポート */}
          <div className="flex flex-col gap-3 rounded-lg border border-border bg-background px-6 py-8 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              </div>
              <span className="rounded border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                任意
              </span>
            </div>
            <p className="text-lg font-semibold text-foreground">移転先選びサポート</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              永代供養墓・散骨先など、ご希望に合った供養先の
              ご紹介・手配を行います。
            </p>
            <p className="mt-auto pt-3 text-sm font-medium text-foreground">+3.3万円</p>
          </div>
        </div>

        {/* Separate costs */}
        <div className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            別途かかる可能性のある費用
          </p>

          <div className="mt-5 divide-y divide-border rounded-lg border border-border bg-background shadow-sm">
            <div className="flex items-start justify-between gap-4 px-6 py-5">
              <div>
                <p className="font-semibold text-foreground">寺院へのお布施</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  閉眼供養（魂抜き）にあたり、寺院へお布施をお納めいただく場合があります。
                  金額は宗派や寺院により異なります。
                </p>
              </div>
              <p className="shrink-0 text-right text-sm font-medium text-foreground">
                {'3万〜10万円前後'}
              </p>
            </div>
            <div className="flex items-start justify-between gap-4 px-6 py-5">
              <div>
                <p className="font-semibold text-foreground">新しい納骨先の費用</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  永代供養墓・納骨堂・樹木葬など、移転先により費用が異なります。
                </p>
              </div>
              <p className="shrink-0 text-right text-sm font-medium text-muted-foreground">
                {'移転先により異なる'}
              </p>
            </div>
            <div className="flex items-start justify-between gap-4 px-6 py-5">
              <div>
                <p className="font-semibold text-foreground">遠方対応の交通費</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  遠方の現地対応が必要な場合、実費を別途ご相談させていただきます。
                </p>
              </div>
              <p className="shrink-0 text-right text-sm font-medium text-muted-foreground">
                {'実費'}
              </p>
            </div>
          </div>
        </div>

        {/* Note */}
        <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground">
          {'※ 表示価格はすべて税込です。正式なお見積りは、ヒアリング後に個別にご案内いたします。'}
        </p>
      </div>
    </section>
  )
}
