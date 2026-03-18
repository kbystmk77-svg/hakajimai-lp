import { createHmac } from "crypto"
import { createClient } from "redis"
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

  const payload = JSON.parse(body) as { events?: { type: string; source?: { userId?: string } }[] }

  const redis = createClient({ url: process.env.REDIS_URL })
  await redis.connect()

  try {
    for (const event of payload.events ?? []) {
      if (event.type === "follow") {
        await sendGA4Event("line_friend_add")
      } else if (event.type === "message") {
        const userId = event.source?.userId
        if (userId) {
          const key = `line_first_message:${userId}`
          const alreadyCounted = await redis.get(key)
          if (!alreadyCounted) {
            await redis.set(key, "1")
            await sendGA4Event("line_message_received")
          }
        }
      }
    }
  } finally {
    await redis.disconnect()
  }

  return NextResponse.json({ ok: true })
}
