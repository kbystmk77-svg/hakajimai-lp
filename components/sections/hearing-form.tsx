"use client"

import { useState, useRef, ChangeEvent } from "react"
import { CheckCircle2, Loader2, Upload, X } from "lucide-react"

const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
]

type FormState = {
  residence: string
  desiredSupport: string[]
  graveType: string
  templeName: string
  graveLocation: string
  graveSize: string
  boneCount: string
  spokeToTemple: string
  destinationDecided: string
  destinationType: string
  anxieties: string[]
}

const initialForm: FormState = {
  residence: "",
  desiredSupport: [],
  graveType: "",
  templeName: "",
  graveLocation: "",
  graveSize: "",
  boneCount: "",
  spokeToTemple: "",
  destinationDecided: "",
  destinationType: "",
  anxieties: [],
}

function RadioGroup({
  options,
  value,
  onChange,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(value === opt ? "" : opt)}
          className={`rounded-lg border-2 px-4 py-2 text-sm transition-all duration-150 ${
            value === opt
              ? "border-primary bg-primary/[0.06] font-medium text-primary"
              : "border-border bg-background text-foreground/80 hover:border-primary/30"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  )
}

function CheckboxGroup({
  options,
  values,
  onChange,
}: {
  options: string[]
  values: string[]
  onChange: (v: string[]) => void
}) {
  const toggle = (opt: string) => {
    if (values.includes(opt)) {
      onChange(values.filter((v) => v !== opt))
    } else {
      onChange([...values, opt])
    }
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const checked = values.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`rounded-lg border-2 px-4 py-2 text-sm transition-all duration-150 ${
              checked
                ? "border-primary bg-primary/[0.06] font-medium text-primary"
                : "border-border bg-background text-foreground/80 hover:border-primary/30"
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}

function QuestionLabel({
  num,
  label,
  multi,
  note,
}: {
  num: number
  label: string
  multi?: boolean
  note?: string
}) {
  return (
    <div className="mb-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {num}
        </span>
        <span className="font-semibold text-foreground">{label}</span>
        {multi && (
          <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            複数選択可
          </span>
        )}
      </div>
      {note && <p className="mt-1 pl-8 text-xs text-muted-foreground">{note}</p>}
    </div>
  )
}

export function HearingForm() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [photos, setPhotos] = useState<File[]>([])
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    setPhotos((prev) => [...prev, ...files].slice(0, 10))
    e.target.value = ""
  }

  const removePhoto = (i: number) => {
    setPhotos((prev) => prev.filter((_, idx) => idx !== i))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("submitting")
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => {
        if (Array.isArray(v)) {
          v.forEach((item) => fd.append(k, item))
        } else {
          fd.append(k, v as string)
        }
      })
      photos.forEach((file) => fd.append("photos", file))
      const res = await fetch("/api/hearing", { method: "POST", body: fd })
      setStatus(res.ok ? "done" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "done") {
    return (
      <div className="border-t border-border bg-muted/20 px-6 py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <CheckCircle2 className="h-12 w-12 text-cta" />
          <p className="font-semibold text-foreground">ご回答ありがとうございました</p>
          <p className="text-sm text-muted-foreground">
            いただいた情報をもとに、より的確なご提案ができます。
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="border-t border-border bg-muted/20 px-6 py-14">
      <div className="mx-auto max-w-2xl">
        {/* ヘッダー */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            任意
          </p>
          <h2 className="mt-2 text-xl font-bold text-foreground md:text-2xl">
            より正確な費用と進め方をご案内するため、1分だけご協力ください
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            わかる範囲だけで大丈夫です。いただいた情報はご連絡の際に役立てます。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-9">
          {/* Q1 居住地 */}
          <div>
            <QuestionLabel num={1} label="現在お住まいの都道府県" />
            <select
              value={form.residence}
              onChange={(e) => set("residence", e.target.value)}
              className="w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
            >
              <option value="">都道府県を選択</option>
              {PREFECTURES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Q2 希望の対応 */}
          <div>
            <QuestionLabel num={2} label="希望の対応" multi />
            <CheckboxGroup
              options={["お寺への連絡代行", "書類手続きのサポート", "石材店の紹介", "改葬先（供養先）の紹介", "まだ決めていない"]}
              values={form.desiredSupport}
              onChange={(v) => set("desiredSupport", v)}
            />
          </div>

          {/* Q3 お墓の形態 */}
          <div>
            <QuestionLabel num={3} label="お墓の形態" />
            <RadioGroup
              options={["寺院墓地", "民間霊園", "公営霊園", "その他", "わからない"]}
              value={form.graveType}
              onChange={(v) => set("graveType", v)}
            />
          </div>

          {/* Q4 寺院名・霊園名 */}
          <div>
            <QuestionLabel num={4} label="寺院名・霊園名" note="わかる範囲でご記入ください" />
            <input
              type="text"
              value={form.templeName}
              onChange={(e) => set("templeName", e.target.value)}
              className="w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
              placeholder="○○寺、△△霊園 など"
            />
          </div>

          {/* Q5 お墓の場所 */}
          <div>
            <QuestionLabel num={5} label="お墓の場所" note="市区町村・最寄り駅など" />
            <input
              type="text"
              value={form.graveLocation}
              onChange={(e) => set("graveLocation", e.target.value)}
              className="w-full rounded-lg border-2 border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
              placeholder="八王子市、横浜市青葉区、○○駅 など"
            />
          </div>

          {/* Q6 お墓の大きさ */}
          <div>
            <QuestionLabel num={6} label="お墓の大きさ" />
            <RadioGroup
              options={["1㎡未満", "1〜2㎡", "2㎡～3㎡", "3㎡以上", "わからない"]}
              value={form.graveSize}
              onChange={(v) => set("graveSize", v)}
            />
          </div>

          {/* Q7 遺骨の数 */}
          <div>
            <QuestionLabel num={7} label="遺骨の数" />
            <RadioGroup
              options={["1体", "2〜3体", "4体以上", "わからない"]}
              value={form.boneCount}
              onChange={(v) => set("boneCount", v)}
            />
          </div>

          {/* Q8 お寺への相談状況 */}
          <div>
            <QuestionLabel num={8} label="お寺に墓じまいの話はしていますか？" />
            <RadioGroup
              options={["まだ", "相談した", "トラブルあり", "わからない"]}
              value={form.spokeToTemple}
              onChange={(v) => set("spokeToTemple", v)}
            />
          </div>

          {/* Q9 改葬先の決定状況 */}
          <div>
            <QuestionLabel num={9} label="改葬先は決まっていますか？" />
            <RadioGroup
              options={["決まっている", "検討中", "まだ決めていない"]}
              value={form.destinationDecided}
              onChange={(v) => set("destinationDecided", v)}
            />
          </div>

          {/* Q10 改葬先の種類 */}
          <div>
            <QuestionLabel num={10} label="改葬先の種類" />
            <RadioGroup
              options={["永代供養墓", "納骨堂", "お寺", "樹木葬", "散骨", "その他"]}
              value={form.destinationType}
              onChange={(v) => set("destinationType", v)}
            />
          </div>

          {/* Q11 不安なこと */}
          <div>
            <QuestionLabel num={11} label="一番不安なこと" multi />
            <CheckboxGroup
              options={["お寺とのやりとり", "費用", "手続き", "何から始めるか", "移転先選び", "特にない", "その他"]}
              values={form.anxieties}
              onChange={(v) => set("anxieties", v)}
            />
          </div>

          {/* Q12 写真 */}
          <div>
            <QuestionLabel num={12} label="お墓の写真（あれば）" />
            <div className="flex flex-col gap-3">
              {photos.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {photos.map((file, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground"
                    >
                      <span className="max-w-[180px] truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 rounded-lg border-2 border-dashed border-border px-5 py-4 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
              >
                <Upload className="h-4 w-4" />
                写真を選択する
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handlePhotoChange}
              />
              <p className="text-xs text-muted-foreground">JPEG・PNG・HEIC 可。複数枚選択OK。</p>
            </div>
          </div>

          {status === "error" && (
            <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
              送信に失敗しました。お手数ですが、しばらくしてから再度お試しください。
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mx-auto flex items-center gap-2 rounded-lg bg-primary px-10 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:brightness-110 disabled:opacity-60"
          >
            {status === "submitting" && <Loader2 className="h-4 w-4 animate-spin" />}
            送信する
          </button>
        </form>
      </div>
    </div>
  )
}
