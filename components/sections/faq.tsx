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
      </div>
    </section>
  )
}
