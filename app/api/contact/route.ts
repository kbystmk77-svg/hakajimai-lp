import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json()

  console.log("form data:", data)

  return NextResponse.json({
    success: true,
  })
}
