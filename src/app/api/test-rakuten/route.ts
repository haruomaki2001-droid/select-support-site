import { NextResponse } from "next/server";

export async function GET() {
  const appId = process.env.RAKUTEN_APP_ID;
  const accessKey = process.env.RAKUTEN_ACCESS_KEY;

  if (!appId || !accessKey) {
    return NextResponse.json(
      { error: ".env.localにRAKUTEN_APP_IDまたはRAKUTEN_ACCESS_KEYが設定されていません" },
      { status: 500 }
    );
  }

  const url = new URL(
    "https://openapi.rakuten.co.jp/ichibaproduct/api/Product/Search/20250801"
  );
  url.searchParams.set("format", "json");
  url.searchParams.set("applicationId", appId);
  url.searchParams.set("accessKey", accessKey);
  url.searchParams.set("keyword", "エアコン");
  url.searchParams.set("hits", "3"); // テストなので3件だけ取得

  try {
    const res = await fetch(url.toString());
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { status: res.status, error: data },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "APIリクエストに失敗しました", detail: String(e) },
      { status: 500 }
    );
  }
}