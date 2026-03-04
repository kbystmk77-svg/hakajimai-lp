import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let data: any = {};

    // JSON送信（将来fetchにする場合）にも対応
    if (contentType.includes("application/json")) {
      data = await req.json();
    } else {
      // 通常の<form>送信（multipart/form-data / application/x-www-form-urlencoded）
      const fd = await req.formData();
      data = Object.fromEntries(fd.entries());

      // チェックボックス複数（name="methods"）に対応
      const methods = fd.getAll("methods").map(String);
      if (methods.length) data.methods = methods;
    }

    console.log("[contact] received:", data);

    // 送信後に /thanks へ飛ばす（303）
    const url = new URL("/thanks", req.url);
    return NextResponse.redirect(url, 303);
  } catch (e) {
    console.error("[contact] error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
