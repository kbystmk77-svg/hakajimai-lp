// Reordered so each row pair has similar text length
const voices = [
  // Row 1 — short
  {
    text: "親族の理解を得るのが大変でした。",
    age: 69,
    gender: "男性",
    pref: "千葉県",
  },
  {
    text: "やった後は楽になりました。近くてお参りしやすいです。",
    age: 57,
    gender: "男性",
    pref: "大阪府",
  },
  // Row 2 — short〜medium
  {
    text: "時代の流れで、親族は想定よりも理解してくれました。",
    age: 46,
    gender: "男性",
    pref: "愛知県",
  },
  {
    text: "墓じまいして大変でしたが、本当によかったと実感しています。",
    age: 52,
    gender: "女性",
    pref: "東京都",
  },
  // Row 3 — medium
  {
    text: "越境して県をまたいでいたので、役所の移動許可が煩わしかったです。",
    age: 63,
    gender: "男性",
    pref: "愛知県",
  },
  {
    text: "とにかく自分が元気なうちにしないと、高齢になってからでは難しいと思います。",
    age: 53,
    gender: "女性",
    pref: "滋賀県",
  },
  // Row 4 — medium〜long
  {
    text: "遅かれ早かれ、いずれは決断せざるを得ない。時間があるうちに熟考することをおすすめします。",
    age: 46,
    gender: "男性",
    pref: "兵庫県",
  },
  {
    text: "親族との話し合いや理解を得ることが大変なので、前もって話し合っておいたほうがよいです。",
    age: 53,
    gender: "男性",
    pref: "東京都",
  },
  // Row 5 — long
  {
    text: "何から何まで分からず、お寺に相談しながら進めました。誰かがアドバイスをしてくれないと、墓じまいをすることは難しいと思います。",
    age: 61,
    gender: "男性",
    pref: "愛媛県",
  },
  {
    text: "会ったこともないひいおじいちゃん・ひいおばあちゃんのお墓の管理を子供たちにさせるのが心苦しいので、私の代で終わりにしたいと思い、墓じまいを検討しています。",
    age: 60,
    gender: "男性",
    pref: "愛知県",
  },
]

export function SurveyVoices() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            回答者の声
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#1e3a5f]" />
          <p className="mt-4 text-sm text-muted-foreground">
            アンケートに寄せられた実際のコメントを一部ご紹介します
          </p>
        </div>

        {/* Voice Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {voices.map((voice, i) => (
            <div key={i} className="rounded-2xl bg-[#f8fafc] p-6 shadow-lg">
              <p className="text-base leading-relaxed text-foreground">{voice.text}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                {voice.pref}・{voice.age}歳・{voice.gender}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
