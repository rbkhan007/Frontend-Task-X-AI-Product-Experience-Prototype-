import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({
      message: "Hello, world!",
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}