import { NextResponse } from "next/server"

function asString(v: unknown) {
  return typeof v === "string" ? v : ""
}

async function fileToAttachment(file: File) {
  const buffer = await file.arrayBuffer()
  return {
    Name: file.name,
    Content: Buffer.from(buffer).toString("base64"),
    ContentType: file.type || "application/octet-stream",
  }
}

async function postmarkSendEmail(params: {
  token: string
  from: string
  to: string
  subject: string
  textBody: string
  attachments?: { Name: string; Content: string; ContentType: string }[]
}) {
  const res = await fetch("https://api.postmarkapp.com/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Postmark-Server-Token": params.token,
    },
    body: JSON.stringify({
      From: params.from,
      To: params.to,
      Subject: params.subject,
      TextBody: params.textBody,
      ...(params.attachments?.length ? { Attachments: params.attachments } : {}),
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => "")
    throw new Error(`Postmark send failed: ${res.status} ${body}`)
  }
}

export async function POST(req: Request) {
  try {
    const fd = await req.formData()

    const residence = asString(fd.get("residence"))
    const desiredSupport = fd.getAll("desiredSupport").map(String).filter(Boolean)
    const graveType = asString(fd.get("graveType"))
    const templeName = asString(fd.get("templeName"))
    const graveLocation = asString(fd.get("graveLocation"))
    const graveSize = asString(fd.get("graveSize"))
    const boneCount = asString(fd.get("boneCount"))
    const spokeToTemple = asString(fd.get("spokeToTemple"))
    const destinationDecided = asString(fd.get("destinationDecided"))
    const destinationType = asString(fd.get("destinationType"))
    const anxieties = fd.getAll("anxieties").map(String).filter(Boolean)
    const photoFiles = fd.getAll("photos").filter(
      (v): v is File => v instanceof File && v.size > 0
    )

    const token = process.env.POSTMARK_SERVER_TOKEN || ""
    const toAdmin = process.env.CONTACT_TO_EMAIL || ""
    const from = process.env.CONTACT_FROM_EMAIL || ""

    if (!token || !toAdmin || !from) {
      return NextResponse.json({ ok: false, error: "server env not set" }, { status: 500 })
    }

    const none = "（未回答）"
    const textBody = [
      "ヒアリングフォームの追加回答がありました。",
      "",
      `1.  お客様の居住地　　：${residence || none}`,
      `2.  希望の対応　　　　：${desiredSupport.length ? desiredSupport.join(" / ") : none}`,
      `3.  お墓の形態　　　　：${graveType || none}`,
      `4.  寺院名・霊園名　　：${templeName || none}`,
      `5.  お墓の場所　　　　：${graveLocation || none}`,
      `6.  お墓の大きさ　　　：${graveSize || none}`,
      `7.  遺骨の数　　　　　：${boneCount || none}`,
      `8.  お寺への相談状況　：${spokeToTemple || none}`,
      `9.  改葬先の決定状況　：${destinationDecided || none}`,
      `10. 改葬先の種類　　　：${destinationType || none}`,
      `11. 不安なこと　　　　：${anxieties.length ? anxieties.join(" / ") : none}`,
      `12. 写真　　　　　　　：${photoFiles.length ? `${photoFiles.length}枚添付` : "なし"}`,
    ].join("\n")

    const attachments = await Promise.all(photoFiles.map(fileToAttachment))

    await postmarkSendEmail({
      token,
      from,
      to: toAdmin,
      subject: "【墓じまいパートナーズ】追加ヒアリング回答",
      textBody,
      attachments,
    })

    console.log("[hearing] sent successfully")
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[hearing] error:", e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
