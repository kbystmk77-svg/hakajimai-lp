import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  phone?: string;
  email?: string;
  prefecture?: string;
  message?: string;
  methods?: string[];
  callTime?: string;
};

async function postmarkSendEmail(params: {
  token: string;
  from: string;
  to: string;
  subject: string;
  textBody: string;
  replyTo?: string;
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
      ...(params.replyTo ? { ReplyTo: params.replyTo } : {}),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Postmark send failed: ${res.status} ${body}`);
  }
}

function asString(v: unknown) {
  return typeof v === "string" ? v : "";
}

function normalizeMethods(m: unknown): string[] {
  if (Array.isArray(m)) return m.map(String).filter(Boolean);
  if (typeof m === "string" && m) return [m];
  return [];
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let data: ContactPayload = {};

    // JSON送信（将来fetchにする場合）にも対応
    if (contentType.includes("application/json")) {
      const raw = (await req.json()) as any;
      data = {
        name: asString(raw?.name),
        phone: asString(raw?.phone),
        email: asString(raw?.email),
        prefecture: asString(raw?.prefecture),
        message: asString(raw?.message),
        methods: normalizeMethods(raw?.methods),
        callTime: asString(raw?.callTime),
      };
    } else {
      // 通常の<form>送信（multipart/form-data / application/x-www-form-urlencoded）
      const fd = await req.formData();
      const base = Object.fromEntries(fd.entries()) as Record<string, unknown>;

      // チェックボックス複数（name="methods"）に対応
      const methods = fd.getAll("methods").map(String).filter(Boolean);

      data = {
        name: asString(base.name),
        phone: asString(base.phone),
        email: asString(base.email),
        prefecture: asString(base.prefecture),
        message: asString(base.message),
        methods,
        callTime: asString(base.callTime),
      };
    }

    console.log("[contact] received:", data);

    // 必須最低限（サーバ側でも軽くガード）
    if (!data.name || !data.phone || !data.email || !data.prefecture || !data.message) {
      return NextResponse.json(
        { ok: false, error: "required fields missing" },
        { status: 400 }
      );
    }
    if (!data.methods || data.methods.length === 0) {
      return NextResponse.json(
        { ok: false, error: "methods is required" },
        { status: 400 }
      );
    }

    // Env
    const token = process.env.POSTMARK_SERVER_TOKEN || "";
    const toAdmin = process.env.CONTACT_TO_EMAIL || "";
    const from = process.env.CONTACT_FROM_EMAIL || "";
    const replyTo = process.env.CONTACT_REPLY_TO || "";

    if (!token || !toAdmin || !from) {
      return NextResponse.json(
        { ok: false, error: "server env not set" },
        { status: 500 }
      );
    }

    const subjectAdmin = `【墓じまいパートナーズ】無料相談フォーム：${data.name} 様`;
    const callTimeNote = data.callTime ? `電話折り返し希望時間帯：${data.callTime}` : null;
    const textAdmin =
      [
        "無料相談フォームの送信がありました。",
        "",
        `お名前：${data.name}`,
        `電話番号：${data.phone}`,
        `メール：${data.email}`,
        `お墓の所在地（都道府県）：${data.prefecture}`,
        `希望のご相談方法：${(data.methods || []).join(" / ")}`,
        ...(callTimeNote ? [callTimeNote] : []),
        "",
        "ご相談内容：",
        data.message || "",
      ].join("\n");

    // 1) 管理者通知（返信先はユーザー）
    await postmarkSendEmail({
      token,
      from,
      to: toAdmin,
      subject: subjectAdmin,
      textBody: textAdmin,
      replyTo: replyTo || data.email,
    });

    // 2) 自動返信（ユーザーへ）
    const subjectUser = "【墓じまいパートナーズ】無料相談を受け付けました";
    const textUser =
      [
        `${data.name} 様`,
        "",
        "この度は、墓じまいパートナーズへお問い合わせありがとうございます。",
        "通常、1~2営業日以内に担当よりご連絡いたします。",
        "",
        `お墓の所在地（都道府県）：${data.prefecture}`,
        `希望のご相談方法：${(data.methods || []).join(" / ")}`,
        "",
        "ご相談内容：",
        data.message || "",
        "",
        "※本メールは自動送信です。",
      ].join("\n");

    await postmarkSendEmail({
      token,
      from,
      to: data.email,
      subject: subjectUser,
      textBody: textUser,
      replyTo: replyTo || from,
    });

    // 送信後に /thanks へ飛ばす（303）
    const url = new URL("/thanks", req.url);
    return NextResponse.redirect(url, 303);
  } catch (e) {
    console.error("[contact] error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}