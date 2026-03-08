// app/design-preview/[id]/page.tsx
// デザインプレビュー用ページ（本番不使用・モックデータ使用）

import Link from "next/link"
import { notFound } from "next/navigation"
import { SimpleHeader } from "@/components/sections/simple-header"
import { Footer } from "@/components/sections/footer"
import { TableOfContents } from "@/components/guide/table-of-contents"
import { GuideCta } from "@/components/guide/guide-cta"
import { ArticleCta } from "@/components/guide/article-cta"
import { Calendar, RefreshCw, Tag } from "lucide-react"

// ============ モックデータ ============
const MOCK = {
  title: "墓じまいの費用はいくら？相場と内訳を徹底解説",
  description:
    "墓じまいにかかる費用の相場は20万円〜150万円と幅広く、内訳によって大きく変わります。この記事では、墓石撤去費用・離檀料・改葬許可申請費用などを詳しく解説します。",
  publishedAt: "2024-11-01",
  updatedAt: "2025-02-15",
  category: { name: "費用・料金", slug: "cost" },
  tags: [
    { id: "1", name: "費用", slug: "cost" },
    { id: "2", name: "手続き", slug: "procedure" },
    { id: "3", name: "石材店", slug: "stone-shop" },
  ],
  author: {
    name: "山田 太郎",
    role: "墓じまいコンサルタント / 行政書士",
    bio: "15年以上にわたり墓じまい・改葬のサポートを行ってきました。難しい手続きや寺院との交渉を丁寧にサポートします。",
  },
  body: `
    <h2 id="cost-overview">墓じまいの費用の相場</h2>
    <p>墓じまいにかかる費用は、墓地の規模や立地、移転先の供養方法によって大きく異なります。一般的な相場は<strong>20万円〜150万円程度</strong>です。</p>
    <p>費用の内訳を大きく分けると、以下の5つになります。それぞれの費用感を事前に把握しておくことで、スムーズに進められます。</p>
    <ul>
      <li>墓石の撤去・処分費用</li>
      <li>離檀料（お寺へのお礼）</li>
      <li>改葬許可申請の手続き費用</li>
      <li>遺骨の移送・洗浄費用</li>
      <li>新しい供養先への納骨費用</li>
    </ul>

    <h2 id="breakdown">費用の内訳</h2>
    <h3 id="stone-removal">墓石撤去費用</h3>
    <p>墓石の撤去・処分にかかる費用は、墓石の大きさや工事のしやすさによって異なります。一般的には<strong>10万円〜50万円程度</strong>が相場です。</p>
    <p>複数の石材店から見積もりを取ることで、費用を抑えられる可能性があります。</p>

    <h3 id="ridan">離檀料</h3>
    <p>お寺の墓地を使用していた場合、お礼として離檀料を支払うことがあります。金額の目安は<strong>3万円〜20万円</strong>程度です。ただし、離檀料は法的な義務ではなく、交渉が必要な場合もあります。</p>

    <h3 id="kaisou-permit">改葬許可申請費用</h3>
    <p>改葬（遺骨を別の場所へ移す）には、市区町村への申請が必要です。申請自体は無料ですが、書類収集や行政書士への依頼費用として<strong>2万円〜5万円程度</strong>かかる場合があります。</p>

    <h3 id="remains-transfer">遺骨の移送・洗浄費用</h3>
    <p>遺骨を新しい供養先へ移す際の移送費用や、土葬遺骨の洗浄・乾燥にかかる費用です。距離や作業内容によって<strong>1万円〜10万円程度</strong>が目安です。</p>

    <h3 id="new-grave">新しい供養先への費用</h3>
    <p>永代供養墓・樹木葬・散骨など、選ぶ供養方法によって大きく異なります。永代供養墓は<strong>5万円〜100万円</strong>、樹木葬は<strong>5万円〜80万円</strong>が一般的な相場です。</p>

    <h2 id="regional-cost">地域別の費用相場</h2>
    <h3 id="urban-rural">都市部と地方の違い</h3>
    <p>都市部では石材店の競争が激しいため、価格が抑えられる傾向があります。一方、地方では業者が少なく、出張費が加算されることもあります。</p>

    <h3 id="kanto">関東地方の相場</h3>
    <p>関東では墓じまい費用の平均が<strong>50万円〜80万円</strong>程度とされています。東京都心部は石材店も多く、比較検討がしやすい環境です。</p>

    <h3 id="kansai">関西地方の相場</h3>
    <p>関西では<strong>40万円〜70万円</strong>程度が目安です。大阪・京都は寺院墓地が多く、離檀料の交渉が必要なケースも見られます。</p>

    <h3 id="rural">地方・過疎地域の相場</h3>
    <p>山間部や離島など、アクセスが難しい場所にある墓地の場合、工事費用に加えて運搬費が上乗せされ、<strong>100万円以上</strong>になるケースもあります。</p>

    <h2 id="cost-factors">費用を左右する要因</h2>
    <h3 id="grave-type">墓地の種類</h3>
    <p>寺院墓地・公営墓地・民営霊園によって、手続き内容や費用が異なります。寺院墓地では離檀料が発生しやすく、公営は手続きが明確です。</p>

    <h3 id="stone-size">墓石の大きさ・重さ</h3>
    <p>墓石が大きいほど撤去費用は高くなります。特に竿石・上台・中台・芝台がそろった和型墓石は重量があり、クレーン使用で費用が増加します。</p>

    <h3 id="access">アクセスの難易度</h3>
    <p>墓地までの道幅が狭かったり、階段が多い場合は作業難易度が上がります。重機が入れない場合は手作業となり、費用が大幅に増えることがあります。</p>

    <h2 id="reduction">費用を抑えるポイント</h2>
    <h3 id="multiple-quotes">複数の石材店から見積もりを取る</h3>
    <p>最低でも3社以上の石材店から見積もりを取ることをおすすめします。同じ作業でも業者によって価格差が<strong>10万円以上</strong>開くこともあります。</p>

    <h3 id="timing">工事時期を工夫する</h3>
    <p>繁忙期（春・秋のお彼岸、お盆前後）を避けることで、割引を受けられる場合があります。1月〜2月や6月〜7月は比較的空きがある時期です。</p>

    <h3 id="aftercare-choice">供養先の選び方</h3>
    <p>永代供養墓や樹木葬の中でも、価格帯は幅広く存在します。立地や施設の充実度とコストのバランスを見て、複数の施設を比較しましょう。</p>

    <h2 id="subsidy">補助金・支援制度</h2>
    <h3 id="municipal-subsidy">自治体の補助金</h3>
    <p>一部の自治体では、墓じまいや改葬に対する補助金制度を設けていることがあります。お住まいの自治体に確認してみましょう。</p>

    <h3 id="application">申請方法と注意点</h3>
    <p>補助金の申請は、工事前に手続きが必要な場合がほとんどです。事後申請が認められないケースもあるため、必ず事前に確認してから進めてください。</p>

    <h2 id="payment">費用の支払い方法</h2>
    <p>石材店への支払いは一般的に現金・振込が主流ですが、近年ではクレジットカードや分割払いに対応する業者も増えています。高額になる場合は事前に相談しましょう。</p>

    <h2 id="trouble">よくある費用トラブル</h2>
    <h3 id="extra-cost">追加費用が発生するケース</h3>
    <p>見積もり後に地盤が予想より硬かったり、隣の墓石との距離が近すぎて特殊工事が必要になるなど、追加費用が発生するケースがあります。</p>

    <h3 id="prevention">トラブルを防ぐための注意点</h3>
    <p>契約前に「追加費用が発生する条件」を書面で確認しておくことが重要です。口頭での説明だけでなく、見積書に明記してもらいましょう。</p>

    <h2 id="summary">まとめ</h2>
    <p>墓じまいの費用は、内訳・地域・業者によって大きく変わります。複数の業者から見積もりを取り、十分に比較検討することがコストを抑える最大のポイントです。不安な点は専門家に相談することも選択肢のひとつです。</p>
  `,
}

function buildToc() {
  const toc: Array<{ id: string; text: string; level: 2 | 3 }> = []
  const regex = /<h([23])[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/h\1>/gi
  let m
  while ((m = regex.exec(MOCK.body)) !== null) {
    toc.push({
      level: Number(m[1]) as 2 | 3,
      id: m[2],
      text: m[3].replace(/<[^>]+>/g, "").trim(),
    })
  }
  return toc
}
const toc = buildToc()

function fmt(d: string) {
  const dt = new Date(d)
  return `${dt.getFullYear()}年${dt.getMonth() + 1}月${dt.getDate()}日`
}

// ============ デザイン切り替えナビ ============
function DesignNav({ current }: { current: string }) {
  const designs = [
    { id: "1", label: "2カラム" },
    { id: "2", label: "マガジン" },
    { id: "3", label: "ミニマル" },
    { id: "4", label: "左サイドバー" },
    { id: "5", label: "カード型" },
    { id: "6", label: "左サイドバー（幅合わせ）" },
    { id: "7", label: "目次スクロール" },
    { id: "8", label: "サイドバースクロール" },
    { id: "9", label: "インフォグラフィック" },
  ]
  return (
    <div className="sticky top-0 z-50 bg-black/90 text-white text-sm py-2 px-4 flex items-center gap-3 flex-wrap">
      <span className="font-bold text-xs text-white/60 shrink-0">デザイン案：</span>
      {designs.map((d) => (
        <Link
          key={d.id}
          href={`/design-preview/${d.id}`}
          className={`px-3 py-1 rounded-full text-xs transition-colors ${
            current === d.id
              ? "bg-white text-black font-bold"
              : "bg-white/20 hover:bg-white/30 text-white"
          }`}
        >
          {d.id}. {d.label}
        </Link>
      ))}
    </div>
  )
}

// ============ 著者ボックス（共通） ============
function AuthorBox({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">山</div>
        <div>
          <div className="text-xs text-muted-foreground">執筆者</div>
          <div className="text-sm font-bold text-foreground">{MOCK.author.name}</div>
        </div>
      </div>
    )
  }
  return (
    <section className="rounded-2xl border border-border bg-card p-5 sm:p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">山</div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-medium text-primary mb-1">この記事を書いた人</div>
          <div className="font-bold text-foreground">{MOCK.author.name}</div>
          <div className="text-sm text-muted-foreground mt-0.5">{MOCK.author.role}</div>
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">{MOCK.author.bio}</p>
        </div>
      </div>
    </section>
  )
}

// ============ DESIGN 1: 2カラム + 右スティッキーサイドバー ============
function Design1() {
  return (
    <div className="min-h-screen bg-background">
      <DesignNav current="1" />
      <SimpleHeader />

      {/* Hero - テキスト左 + 画像右 */}
      <section className="bg-muted/30 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="flex-1">
              <Link href="/category/cost" className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary mb-4 hover:bg-primary/20 transition-colors">
                {MOCK.category.name}
              </Link>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">
                {MOCK.title}
              </h1>
              <p className="text-muted-foreground leading-relaxed mb-6">{MOCK.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /><span>公開：{fmt(MOCK.publishedAt)}</span></div>
                <div className="flex items-center gap-1.5"><RefreshCw className="h-4 w-4" /><span>更新：{fmt(MOCK.updatedAt)}</span></div>
              </div>
            </div>
            <div className="w-full lg:w-80 shrink-0 aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border flex items-center justify-center text-muted-foreground text-sm">
              サムネイル画像
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 text-sm text-muted-foreground flex gap-2">
          <Link href="/" className="hover:text-foreground">ホーム</Link>
          <span>/</span>
          <Link href="/category/cost" className="hover:text-foreground">{MOCK.category.name}</Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{MOCK.title}</span>
        </div>
      </div>

      <main>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* メイン */}
            <div className="flex-1 min-w-0">
              <div className="mb-8"><AuthorBox /></div>
              <div className="flex flex-wrap gap-2 mb-8">
                {MOCK.tags.map(t => (
                  <Link key={t.id} href={`/tag/${t.slug}`} className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground hover:bg-muted transition-colors">
                    #{t.name}
                  </Link>
                ))}
              </div>
              <div className="lg:hidden mb-8"><TableOfContents toc={toc} /></div>
              <article>
                <div className="prose-guide" dangerouslySetInnerHTML={{ __html: MOCK.body }} />
              </article>
              <ArticleCta variant="inline" />
            </div>

            {/* 右サイドバー */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-24 space-y-4">
                <TableOfContents toc={toc} />
                <GuideCta variant="sidebar" />
              </div>
            </aside>
          </div>
        </div>
        <GuideCta variant="full" />
      </main>
      <Footer />
    </div>
  )
}

// ============ DESIGN 2: マガジン風（全幅ヒーロー） ============
function Design2() {
  return (
    <div className="min-h-screen bg-background">
      <DesignNav current="2" />
      <SimpleHeader />

      {/* 全幅ヒーロー */}
      <section className="relative h-[55vh] min-h-[360px]">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-600 to-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-10 sm:pb-14">
            <Link href="/category/cost" className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary mb-4 hover:bg-white transition-colors">
              {MOCK.category.name}
            </Link>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight drop-shadow-md mb-4">
              {MOCK.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /><span>{fmt(MOCK.publishedAt)}</span></div>
              <div className="flex items-center gap-1.5"><RefreshCw className="h-4 w-4" /><span>更新：{fmt(MOCK.updatedAt)}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-3 text-sm text-muted-foreground flex gap-2">
          <Link href="/" className="hover:text-foreground">ホーム</Link>
          <span>/</span>
          <Link href="/category/cost" className="hover:text-foreground">{MOCK.category.name}</Link>
        </div>
      </div>

      <main>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 lg:py-12">
          {/* リード文 */}
          <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-4 mb-8">
            {MOCK.description}
          </p>

          {/* 著者 */}
          <div className="mb-8"><AuthorBox /></div>

          {/* 目次（折りたたみ） */}
          <details className="mb-10 rounded-xl border border-border bg-muted/30 overflow-hidden" open>
            <summary className="flex items-center gap-2 font-bold text-foreground p-5 cursor-pointer select-none hover:bg-muted/50 transition-colors">
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              目次
            </summary>
            <ul className="space-y-2 text-sm px-5 pb-5">
              {toc.map(item => (
                <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
                  <a href={`#${item.id}`} className="text-muted-foreground hover:text-primary transition-colors">{item.text}</a>
                </li>
              ))}
            </ul>
          </details>

          {/* タグ */}
          <div className="flex flex-wrap gap-2 mb-8">
            {MOCK.tags.map(t => (
              <Link key={t.id} href={`/tag/${t.slug}`} className="inline-flex items-center rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground hover:bg-muted transition-colors">
                #{t.name}
              </Link>
            ))}
          </div>

          <article>
            <div className="prose-guide" dangerouslySetInnerHTML={{ __html: MOCK.body }} />
          </article>
          <ArticleCta variant="inline" />
        </div>
        <GuideCta variant="full" />
      </main>
      <Footer />
    </div>
  )
}

// ============ DESIGN 3: ミニマルリーダー（linen背景） ============
function Design3() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0ebe3" }}>
      <DesignNav current="3" />
      <SimpleHeader />

      <main>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-8 flex gap-2">
            <Link href="/" className="hover:text-foreground">ホーム</Link>
            <span>/</span>
            <Link href="/category/cost" className="hover:text-foreground">{MOCK.category.name}</Link>
          </nav>

          {/* カテゴリ + タグ */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Link href="/category/cost" className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary hover:bg-primary/20 transition-colors">
              {MOCK.category.name}
            </Link>
            {MOCK.tags.map(t => (
              <Link key={t.id} href={`/tag/${t.slug}`} className="inline-flex items-center rounded-full border border-border/60 bg-white/60 px-3 py-1 text-xs text-muted-foreground hover:bg-white transition-colors">
                #{t.name}
              </Link>
            ))}
          </div>

          {/* タイトル */}
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">{MOCK.title}</h1>
          <div className="h-1 w-16 rounded-full bg-primary mb-5" />

          {/* メタ */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /><span>公開：{fmt(MOCK.publishedAt)}</span></div>
            <div className="flex items-center gap-1.5"><RefreshCw className="h-4 w-4" /><span>更新：{fmt(MOCK.updatedAt)}</span></div>
          </div>

          {/* サムネイル */}
          <div className="w-full aspect-[16/9] rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-border/50 flex items-center justify-center mb-10 text-muted-foreground text-sm">
            サムネイル画像
          </div>

          {/* リード文 */}
          <p className="text-base text-muted-foreground leading-relaxed mb-10">{MOCK.description}</p>

          {/* 目次（番号付き） */}
          <section className="mb-10 rounded-xl border border-border/60 bg-white/60 p-5">
            <div className="font-bold text-foreground mb-4">目次</div>
            <ol className="space-y-2.5 text-sm">
              {toc.filter(i => i.level === 2).map((item, idx) => (
                <li key={item.id} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                    {idx + 1}
                  </span>
                  <a href={`#${item.id}`} className="text-muted-foreground hover:text-primary transition-colors">{item.text}</a>
                </li>
              ))}
            </ol>
          </section>

          <article>
            <div className="prose-guide" dangerouslySetInnerHTML={{ __html: MOCK.body }} />
          </article>

          {/* CTA（linen調） */}
          <div className="my-12 rounded-2xl border border-primary/20 bg-white/70 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-foreground mb-2">墓じまいをお考えですか？</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">費用や手続きの進め方など、まずは状況を整理するところから一緒にやります。</p>
            <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-cta px-6 py-3 text-sm font-medium text-cta-foreground hover:opacity-90 transition-opacity">
              無料相談はこちら
            </Link>
          </div>

          {/* 著者（末尾） */}
          <div className="mt-12 rounded-2xl border border-border/60 bg-white/60 p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">山</div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-medium text-primary mb-1">この記事を書いた人</div>
                <div className="font-bold text-foreground">{MOCK.author.name}</div>
                <div className="text-sm text-muted-foreground mt-0.5">{MOCK.author.role}</div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-3">{MOCK.author.bio}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// ============ DESIGN 4: 左サイドバー（ダッシュボード風） ============
function Design4() {
  return (
    <div className="min-h-screen bg-background">
      <DesignNav current="4" />
      <SimpleHeader />

      {/* ヒーロー（やや低め） */}
      <section className="relative h-44 sm:h-52">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-600 to-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative h-full flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pb-6">
            <nav className="text-sm text-white/70 mb-3 flex gap-2">
              <Link href="/" className="hover:text-white">ホーム</Link>
              <span>/</span>
              <Link href="/category/cost" className="hover:text-white">{MOCK.category.name}</Link>
            </nav>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight drop-shadow-md">{MOCK.title}</h1>
          </div>
        </div>
      </section>

      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 左サイドバー */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* 著者カード */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-12 w-12 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">山</div>
                    <div>
                      <div className="text-xs text-primary font-medium mb-0.5">執筆者</div>
                      <div className="font-bold text-sm text-foreground">{MOCK.author.name}</div>
                      <div className="text-xs text-muted-foreground">{MOCK.author.role}</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{MOCK.author.bio}</p>
                </div>

                {/* メタ情報 */}
                <div className="rounded-xl border border-border bg-card p-4 text-sm space-y-2.5">
                  <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4 shrink-0" /><span>公開：{fmt(MOCK.publishedAt)}</span></div>
                  <div className="flex items-center gap-2 text-muted-foreground"><RefreshCw className="h-4 w-4 shrink-0" /><span>更新：{fmt(MOCK.updatedAt)}</span></div>
                </div>

                {/* タグ */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-3">
                    <Tag className="h-3.5 w-3.5" />タグ
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {MOCK.tags.map(t => (
                      <Link key={t.id} href={`/tag/${t.slug}`} className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-muted transition-colors">
                        #{t.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 目次 */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="font-bold text-sm text-foreground mb-3">目次</div>
                  <ul className="space-y-2 text-xs">
                    {toc.map(item => (
                      <li key={item.id} className={item.level === 3 ? "ml-3" : ""}>
                        <a href={`#${item.id}`} className="text-muted-foreground hover:text-primary transition-colors leading-relaxed block">{item.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                <GuideCta variant="sidebar" />
              </div>
            </aside>

            {/* メインコンテンツ */}
            <div className="flex-1 min-w-0">
              <p className="text-base text-muted-foreground leading-relaxed mb-8 p-4 rounded-xl bg-muted/30 border border-border">
                {MOCK.description}
              </p>
              <div className="lg:hidden mb-8"><TableOfContents toc={toc} /></div>
              <article>
                <div className="prose-guide" dangerouslySetInnerHTML={{ __html: MOCK.body }} />
              </article>
              <ArticleCta variant="inline" />
            </div>
          </div>
        </div>
        <GuideCta variant="full" />
      </main>
      <Footer />
    </div>
  )
}

// ============ DESIGN 5: ヘッダーカード型 ============
function Design5() {
  return (
    <div className="min-h-screen bg-background">
      <DesignNav current="5" />
      <SimpleHeader />

      <main>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10 sm:py-14">
          {/* 大きなヘッダーカード */}
          <div className="rounded-3xl border-2 border-border bg-card shadow-md overflow-hidden mb-10">
            {/* カード上部の画像エリア */}
            <div className="h-36 bg-gradient-to-br from-primary/20 via-primary/10 to-muted flex items-center justify-center text-muted-foreground text-sm">
              サムネイル画像
            </div>
            <div className="p-6 sm:p-8">
              {/* カテゴリ + タグ */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Link href="/category/cost" className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary hover:bg-primary/20 transition-colors">
                  {MOCK.category.name}
                </Link>
                {MOCK.tags.map(t => (
                  <Link key={t.id} href={`/tag/${t.slug}`} className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted transition-colors">
                    #{t.name}
                  </Link>
                ))}
              </div>

              {/* タイトル */}
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-4">{MOCK.title}</h1>

              {/* リード文 */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{MOCK.description}</p>

              {/* 著者 + 日付 */}
              <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-border">
                <AuthorBox compact />
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /><span>公開：{fmt(MOCK.publishedAt)}</span></div>
                  <div className="flex items-center gap-1.5"><RefreshCw className="h-3.5 w-3.5" /><span>更新：{fmt(MOCK.updatedAt)}</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Breadcrumb */}
          <nav className="text-xs text-muted-foreground mb-8 flex flex-wrap gap-2">
            <Link href="/" className="hover:text-foreground">ホーム</Link>
            <span>/</span>
            <Link href="/category/cost" className="hover:text-foreground">{MOCK.category.name}</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate">{MOCK.title}</span>
          </nav>

          {/* 目次 */}
          <section className="mb-10 rounded-xl border border-border bg-muted/30 p-5">
            <div className="flex items-center gap-2 font-bold text-foreground mb-4">
              <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              目次
            </div>
            <ul className="space-y-2 text-sm">
              {toc.map(item => (
                <li key={item.id} className={item.level === 3 ? "ml-4" : ""}>
                  <a href={`#${item.id}`} className="text-muted-foreground hover:text-primary transition-colors">{item.text}</a>
                </li>
              ))}
            </ul>
          </section>

          {/* 本文（行間広め） */}
          <article>
            <div
              className="prose-guide [&_p]:text-base [&_p]:leading-[1.95] [&_p]:mb-6"
              dangerouslySetInnerHTML={{ __html: MOCK.body }}
            />
          </article>

          <ArticleCta variant="inline" />
        </div>
        <GuideCta variant="full" />
      </main>
      <Footer />
    </div>
  )
}

// ============ DESIGN 6: 左サイドバー（ヘッダー幅に揃えた版） ============
// SimpleHeader が max-w-6xl px-6 のため、コンテンツ幅を max-w-6xl に統一
function Design6() {
  return (
    <div className="min-h-screen bg-background">
      <DesignNav current="6" />
      <SimpleHeader />

      {/* ヒーロー：max-w-6xl に合わせる */}
      <section className="relative h-44 sm:h-52">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-600 to-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative h-full flex items-end">
          <div className="mx-auto w-full max-w-6xl px-6 pb-6">
            <nav className="text-sm text-white/70 mb-3 flex gap-2">
              <Link href="/" className="hover:text-white">ホーム</Link>
              <span>/</span>
              <Link href="/category/cost" className="hover:text-white">{MOCK.category.name}</Link>
            </nav>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight drop-shadow-md">{MOCK.title}</h1>
          </div>
        </div>
      </section>

      <main>
        {/* max-w-6xl px-6 でヘッダーに揃える */}
        <div className="mx-auto max-w-6xl px-6 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 左サイドバー（w-72 で少し広めに） */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 space-y-4">
                {/* 著者カード */}
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">山</div>
                    <div>
                      <div className="text-xs text-primary font-medium mb-0.5">執筆者</div>
                      <div className="font-bold text-sm text-foreground">{MOCK.author.name}</div>
                      <div className="text-xs text-muted-foreground leading-tight">{MOCK.author.role}</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{MOCK.author.bio}</p>
                </div>

                {/* メタ情報 */}
                <div className="rounded-xl border border-border bg-card p-4 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-3.5 w-3.5 shrink-0" /><span>公開：{fmt(MOCK.publishedAt)}</span></div>
                  <div className="flex items-center gap-2 text-muted-foreground"><RefreshCw className="h-3.5 w-3.5 shrink-0" /><span>更新：{fmt(MOCK.updatedAt)}</span></div>
                </div>

                {/* タグ */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-2">
                    <Tag className="h-3.5 w-3.5" />タグ
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {MOCK.tags.map(t => (
                      <Link key={t.id} href={`/tag/${t.slug}`} className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted transition-colors">
                        #{t.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 目次 */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="font-bold text-xs text-foreground mb-3">目次</div>
                  <ul className="space-y-2 text-xs">
                    {toc.map(item => (
                      <li key={item.id} className={item.level === 3 ? "ml-3" : ""}>
                        <a href={`#${item.id}`} className="text-muted-foreground hover:text-primary transition-colors leading-relaxed block">{item.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                <GuideCta variant="sidebar" />
              </div>
            </aside>

            {/* メインコンテンツ */}
            <div className="flex-1 min-w-0">
              <p className="text-base text-muted-foreground leading-relaxed mb-8 p-4 rounded-xl bg-muted/30 border border-border">
                {MOCK.description}
              </p>
              <div className="lg:hidden mb-8"><TableOfContents toc={toc} /></div>
              <article>
                <div className="prose-guide" dangerouslySetInnerHTML={{ __html: MOCK.body }} />
              </article>
              <ArticleCta variant="inline" />
            </div>
          </div>
        </div>
        <GuideCta variant="full" />
      </main>
      <Footer />
    </div>
  )
}

// ============ DESIGN 7: 左サイドバー（目次ボックスのみスクロール） ============
function Design7() {
  return (
    <div className="min-h-screen bg-background">
      <DesignNav current="7" />
      <SimpleHeader />

      <section className="relative h-44 sm:h-52">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-600 to-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative h-full flex items-end">
          <div className="mx-auto w-full max-w-6xl px-6 pb-6">
            <nav className="text-sm text-white/70 mb-3 flex gap-2">
              <Link href="/" className="hover:text-white">ホーム</Link>
              <span>/</span>
              <Link href="/category/cost" className="hover:text-white">{MOCK.category.name}</Link>
            </nav>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight drop-shadow-md">{MOCK.title}</h1>
          </div>
        </div>
      </section>

      <main>
        <div className="mx-auto max-w-6xl px-6 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 space-y-4">
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">山</div>
                    <div>
                      <div className="text-xs text-primary font-medium mb-0.5">執筆者</div>
                      <div className="font-bold text-sm text-foreground">{MOCK.author.name}</div>
                      <div className="text-xs text-muted-foreground leading-tight">{MOCK.author.role}</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{MOCK.author.bio}</p>
                </div>

                <div className="rounded-xl border border-border bg-card p-4 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-3.5 w-3.5 shrink-0" /><span>公開：{fmt(MOCK.publishedAt)}</span></div>
                  <div className="flex items-center gap-2 text-muted-foreground"><RefreshCw className="h-3.5 w-3.5 shrink-0" /><span>更新：{fmt(MOCK.updatedAt)}</span></div>
                </div>

                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-2">
                    <Tag className="h-3.5 w-3.5" />タグ
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {MOCK.tags.map(t => (
                      <Link key={t.id} href={`/tag/${t.slug}`} className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted transition-colors">
                        #{t.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* 目次ボックスにmax-h + overflow-y-auto */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="font-bold text-xs text-foreground mb-3">目次</div>
                  <ul className="space-y-2 text-xs max-h-64 overflow-y-auto pr-1">
                    {toc.map(item => (
                      <li key={item.id} className={item.level === 3 ? "ml-3" : ""}>
                        <a href={`#${item.id}`} className="text-muted-foreground hover:text-primary transition-colors leading-relaxed block">{item.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                <GuideCta variant="sidebar" />
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <p className="text-base text-muted-foreground leading-relaxed mb-8 p-4 rounded-xl bg-muted/30 border border-border">
                {MOCK.description}
              </p>
              <div className="lg:hidden mb-8"><TableOfContents toc={toc} /></div>
              <article>
                <div className="prose-guide" dangerouslySetInnerHTML={{ __html: MOCK.body }} />
              </article>
              <ArticleCta variant="inline" />
            </div>
          </div>
        </div>
        <GuideCta variant="full" />
      </main>
      <Footer />
    </div>
  )
}

// ============ DESIGN 8: 左サイドバー（サイドバー全体スクロール） ============
function Design8() {
  return (
    <div className="min-h-screen bg-background">
      <DesignNav current="8" />
      <SimpleHeader />

      <section className="relative h-44 sm:h-52">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-600 to-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative h-full flex items-end">
          <div className="mx-auto w-full max-w-6xl px-6 pb-6">
            <nav className="text-sm text-white/70 mb-3 flex gap-2">
              <Link href="/" className="hover:text-white">ホーム</Link>
              <span>/</span>
              <Link href="/category/cost" className="hover:text-white">{MOCK.category.name}</Link>
            </nav>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight drop-shadow-md">{MOCK.title}</h1>
          </div>
        </div>
      </section>

      <main>
        <div className="mx-auto max-w-6xl px-6 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-72 shrink-0">
              {/* サイドバー全体をmax-h + overflow-y-autoでスクロール可能に */}
              <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto space-y-4 pr-1">
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">山</div>
                    <div>
                      <div className="text-xs text-primary font-medium mb-0.5">執筆者</div>
                      <div className="font-bold text-sm text-foreground">{MOCK.author.name}</div>
                      <div className="text-xs text-muted-foreground leading-tight">{MOCK.author.role}</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{MOCK.author.bio}</p>
                </div>

                <div className="rounded-xl border border-border bg-card p-4 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-3.5 w-3.5 shrink-0" /><span>公開：{fmt(MOCK.publishedAt)}</span></div>
                  <div className="flex items-center gap-2 text-muted-foreground"><RefreshCw className="h-3.5 w-3.5 shrink-0" /><span>更新：{fmt(MOCK.updatedAt)}</span></div>
                </div>

                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-2">
                    <Tag className="h-3.5 w-3.5" />タグ
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {MOCK.tags.map(t => (
                      <Link key={t.id} href={`/tag/${t.slug}`} className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted transition-colors">
                        #{t.name}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="font-bold text-xs text-foreground mb-3">目次</div>
                  <ul className="space-y-2 text-xs">
                    {toc.map(item => (
                      <li key={item.id} className={item.level === 3 ? "ml-3" : ""}>
                        <a href={`#${item.id}`} className="text-muted-foreground hover:text-primary transition-colors leading-relaxed block">{item.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                <GuideCta variant="sidebar" />
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <p className="text-base text-muted-foreground leading-relaxed mb-8 p-4 rounded-xl bg-muted/30 border border-border">
                {MOCK.description}
              </p>
              <div className="lg:hidden mb-8"><TableOfContents toc={toc} /></div>
              <article>
                <div className="prose-guide" dangerouslySetInnerHTML={{ __html: MOCK.body }} />
              </article>
              <ArticleCta variant="inline" />
            </div>
          </div>
        </div>
        <GuideCta variant="full" />
      </main>
      <Footer />
    </div>
  )
}

// ============ 費用内訳インフォグラフィック ============
function CostInfographic() {
  const scale = 100 // 万円スケール
  const items = [
    { label: "閉眼供養・お布施", range: "3〜15万円", min: 3, max: 15, color: "from-emerald-400 to-emerald-500" },
    { label: "墓石の撤去・処分", range: "10〜50万円", min: 10, max: 50, color: "from-blue-400 to-blue-500" },
    { label: "離檀料", range: "0〜20万円", min: 0, max: 20, color: "from-violet-400 to-violet-500" },
    { label: "改葬許可申請（行政手数料）", range: "数百〜1,500円", min: 0, max: 0, special: true, color: "from-slate-400 to-slate-500" },
    { label: "新しい納骨先の費用", range: "5〜100万円以上", min: 5, max: 100, overflow: true, color: "from-primary/70 to-primary" },
  ]

  return (
    <div className="my-10 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-muted/40 p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15">
          <svg className="h-5 w-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <div className="font-bold text-foreground text-base">費用内訳の目安</div>
          <div className="text-xs text-muted-foreground">墓地の規模・地域・業者によって変わります</div>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex items-baseline justify-between mb-1.5 gap-2">
              <span className="text-sm font-medium text-foreground leading-tight">{item.label}</span>
              <span className="text-xs text-muted-foreground shrink-0 font-mono">{item.range}</span>
            </div>
            <div className="relative h-6 rounded-full bg-muted overflow-hidden">
              {item.special ? (
                <div className="absolute inset-0 flex items-center px-3">
                  <span className="text-xs text-muted-foreground">ほぼ無料（数百〜1,500円）</span>
                </div>
              ) : (
                <div
                  className={`absolute top-0 bottom-0 rounded-full bg-gradient-to-r ${item.color} opacity-85`}
                  style={{
                    left: `${(item.min / scale) * 100}%`,
                    width: item.overflow
                      ? `${100 - (item.min / scale) * 100}%`
                      : `${((item.max - item.min) / scale) * 100}%`,
                  }}
                />
              )}
              {item.overflow && (
                <div className="absolute right-1 top-1/2 -translate-y-1/2 text-white text-xs font-bold">以上→</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* スケール */}
      <div className="flex justify-between mt-3 px-0.5">
        <span className="text-xs text-muted-foreground">0万円</span>
        <span className="text-xs text-muted-foreground">25万円</span>
        <span className="text-xs text-muted-foreground">50万円</span>
        <span className="text-xs text-muted-foreground">75万円</span>
        <span className="text-xs text-muted-foreground">100万円</span>
      </div>

      <p className="text-xs text-muted-foreground mt-4 border-t border-border/60 pt-3">
        ※ 合計の目安は <strong className="text-foreground">20万〜150万円程度</strong>。新しい納骨先の種類（永代供養墓・樹木葬・散骨など）によって大きく変わります。
      </p>
    </div>
  )
}

// ============ DESIGN 9: インフォグラフィックのプレースホルダー方式プレビュー ============
// microCMSの本文中に {{COST_CHART}} と書いておくと、ここで CostInfographic に置換される
function Design9() {
  // 本文に {{COST_CHART}} プレースホルダーを挿入したバージョン
  const body9 = MOCK.body.replace(
    "<h2 id=\"breakdown\">費用の内訳</h2>",
    "<h2 id=\"breakdown\">費用の内訳</h2>{{COST_CHART}}"
  )
  const parts = body9.split("{{COST_CHART}}")

  return (
    <div className="min-h-screen bg-background">
      <DesignNav current="9" />
      <SimpleHeader />

      <section className="relative h-44 sm:h-52">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-600 to-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative h-full flex items-end">
          <div className="mx-auto w-full max-w-6xl px-6 pb-6">
            <nav className="text-sm text-white/70 mb-3 flex gap-2">
              <Link href="/" className="hover:text-white">ホーム</Link>
              <span>/</span>
              <Link href="/category/cost" className="hover:text-white">{MOCK.category.name}</Link>
            </nav>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight drop-shadow-md">{MOCK.title}</h1>
          </div>
        </div>
      </section>

      {/* プレースホルダー説明バナー */}
      <div className="bg-amber-50 border-b border-amber-200 py-2 px-4 text-center text-xs text-amber-700">
        💡 プレースホルダー方式のプレビュー：記事本文中の <code className="font-mono bg-amber-100 px-1 rounded">{"{{COST_CHART}}"}</code> が自動的にグラフに置換されます
      </div>

      <main>
        <div className="mx-auto max-w-6xl px-6 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 space-y-4">
                <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">山</div>
                    <div>
                      <div className="text-xs text-primary font-medium mb-0.5">執筆者</div>
                      <div className="font-bold text-sm text-foreground">{MOCK.author.name}</div>
                      <div className="text-xs text-muted-foreground leading-tight">{MOCK.author.role}</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{MOCK.author.bio}</p>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-3.5 w-3.5 shrink-0" /><span>公開：{fmt(MOCK.publishedAt)}</span></div>
                  <div className="flex items-center gap-2 text-muted-foreground"><RefreshCw className="h-3.5 w-3.5 shrink-0" /><span>更新：{fmt(MOCK.updatedAt)}</span></div>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-2">
                    <Tag className="h-3.5 w-3.5" />タグ
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {MOCK.tags.map(t => (
                      <Link key={t.id} href={`/tag/${t.slug}`} className="inline-flex items-center rounded-full border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground hover:bg-muted transition-colors">
                        #{t.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="font-bold text-xs text-foreground mb-3">目次</div>
                  <ul className="space-y-2 text-xs max-h-64 overflow-y-auto pr-1">
                    {toc.map(item => (
                      <li key={item.id} className={item.level === 3 ? "ml-3" : ""}>
                        <a href={`#${item.id}`} className="text-muted-foreground hover:text-primary transition-colors leading-relaxed block">{item.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <GuideCta variant="sidebar" />
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <p className="text-base text-muted-foreground leading-relaxed mb-8 p-4 rounded-xl bg-muted/30 border border-border">
                {MOCK.description}
              </p>
              <div className="lg:hidden mb-8"><TableOfContents toc={toc} /></div>
              <article>
                {/* プレースホルダー方式：分割してCostInfographicを挿入 */}
                <div className="prose-guide" dangerouslySetInnerHTML={{ __html: parts[0] }} />
                <CostInfographic />
                <div className="prose-guide" dangerouslySetInnerHTML={{ __html: parts[1] }} />
              </article>
              <ArticleCta variant="inline" />
            </div>
          </div>
        </div>
        <GuideCta variant="full" />
      </main>
      <Footer />
    </div>
  )
}

// ============ ルーター ============
type Props = { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }, { id: "4" }, { id: "5" }, { id: "6" }, { id: "7" }, { id: "8" }, { id: "9" }]
}

export default async function DesignPreviewPage({ params }: Props) {
  const { id } = await params
  switch (id) {
    case "1": return <Design1 />
    case "2": return <Design2 />
    case "3": return <Design3 />
    case "4": return <Design4 />
    case "5": return <Design5 />
    case "6": return <Design6 />
    case "7": return <Design7 />
    case "8": return <Design8 />
    case "9": return <Design9 />
    default: return notFound()
  }
}
