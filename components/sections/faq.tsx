"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "家族や親戚との話し合いも代行してもらえますか？",
    answer:
      "恐れ入りますがご家族同士の話し合いに直接関与することはできません。私たちの経験をもとにアドバイスさせて頂くことはできますので、ご相談ください。",
  },
  {
    question: "遠方のお墓でも対応できますか",
    answer:
      "全国対応しております。お墓への立会は不要で、移転先への遺骨の輸送もいたしますのでご安心ください。",
  },
  {
    question: "お寺から高い離檀料を請求された場合でも交渉してくれますか？",
    answer:
      "当社からお寺へご連絡し、手続きの確認や状況の整理は行いますが、弁護士ではないため、法律上、代理人として「交渉」を行うことはできません。円滑に進むよう調整し、必要に応じて弁護士等の専門家をご紹介いたします。",
  },
  {
    question: "行政書類の作成自体も代行してくれますか？",
    answer:
      "記入方法や必要書類の取得はサポートさせていただきますが、行政に提出する書類自体を弊社が代行して作成することは行政書士法違反となるため対応できません。ご希望の場合は行政書士をご紹介いたします。",
  },
  {
    question: "お寺とトラブルになるケースが多いと聞きましたが",
    answer:
      "様々なケースがございますので一概には言えませんが、墓じまい自体を断固拒否したり、法外な離檀料の請求をされるケースは多くはございません。一方でお説教を頂戴するケースは多いと認識しております。",
  },
  {
    question: "申込みから完了までどれくらいの期間がかかりますか？",
    answer:
      "一般的には、ご相談から完了まで2〜3ヶ月程度です。お彼岸やお盆の時期を挟むと遅くなるケースもございますので、余裕を持ったスケジュールでご相談いただくことをおすすめします。",
  },
  {
    question: "契約や代金の支払いタイミングは？",
    answer:
      "本見積もりをご確認いただき、問題なければご契約をいただきます。その時点まではキャンセル可能です。着手金や初期費用もございません。代金のお支払いは墓じまい予定日の3営業日前までにお願いしております。",
  },
  {
    question: "無料相談後にしつこく営業されませんか？",
    answer:
      "ご状況をお伺いすることはございますが、しつこく営業することはございません。また仮見積もり提出後やお寺への連絡後であっても、本契約前はキャンセル可能です。キャンセルしにくいような状況を固めるようなこともいたしませんのでご安心ください。",
  },
  {
    question: "無料相談はどのように行われますか？",
    answer:
      "オンライン面談、お電話、メールの中からご都合の良い連絡方法をお選びいただいております。お仕事で平日の日中は対応が難しいなどございましたら、夜間や休日の対応も可能ですので遠慮なくご相談ください。",
  },
  {
    question: "移転先は先はまだ決まってないのですが大丈夫ですか？",
    answer:
      "墓じまいの手続きを進めるにあたり、移転先の書類記載が必須であるケースがございますので、基本的には先に移転先は決めておく必要がございます。必要な場合は弊社でサポートすることも可能です（オプション）のでご相談ください。",
  },
]

export function Faq() {
  return (
    <section>
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl text-balance">
            よくある質問
          </h2>
          <div className="mx-auto mt-3 h-0.5 w-12 rounded-full bg-primary" />
        </div>
        <div className="mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border-border"
              >
                <AccordionTrigger className="py-5 text-left text-sm font-medium text-foreground hover:no-underline md:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-foreground/70 md:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Guide Link */}
        <div className="mt-12 rounded-2xl border border-border bg-card p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-foreground mb-1">
              墓じまい完全ガイド
            </h3>
            <p className="text-sm text-muted-foreground">
              墓じまいの流れ、費用の目安、墓じまい後の供養方法までをわかりやすく解説しています。
            </p>
          </div>
          <a
            href="/hakajimai"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 hover:shadow-md whitespace-nowrap"
          >
            ガイドを読む
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
