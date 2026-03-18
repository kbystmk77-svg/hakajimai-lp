import { createHmac } from "crypto"
import { NextResponse } from "next/server"

function verifySignature(body: string, signature: string): boolean {
  const secret = process.env.LINE_CHANNEL_SECRET ?? ""
  const expected = createHmac("sha256", secret).update(body).digest("base64")
  return expected === signature
}

async function sendGA4Event(eventName: string) {
  const measurementId = process.env.GA4_MEASUREMENT_ID ?? ""
  const apiSecret = process.env.GA4_API_SECRET ?? ""
  if (!measurementId || !apiSecret) return

  await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: "line_webhook",
        events: [{ name: eventName, params: { engagement_time_msec: "100" } }],
      }),
    }
  )
}

export async function POST(req: Request) {
  const signature = req.headers.get("x-line-signature") ?? ""
  const body = await req.text()

  if (!verifySignature(body, signature)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }

  const payload = JSON.parse(body) as { events?: { type: string }[] }
  for (const event of payload.events ?? []) {
    if (event.type === "follow") {
      await sendGA4Event("line_friend_add")
    }
  }

  return NextResponse.json({ ok: true })
}
