import { NextResponse } from "next/server";
import https from "https";

function fetchWithReferer(url: string, referer: string): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          Referer: referer,
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () =>
          resolve({ status: res.statusCode ?? 500, body: data })
        );
      }
    );
    req.on("error", reject);
  });
}

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
  url.searchParams.set("hits", "3");

  try {
    const { status, body } = await fetchWithReferer(
      url.toString(),
      "https://select-support-site.select-support-site.workers.dev"
    );
    const data = JSON.parse(body);

    if (status !== 200) {
      return NextResponse.json({ status, error: data }, { status });
    }

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(
      { error: "APIリクエストに失敗しました", detail: String(e) },
      { status: 500 }
    );
  }
}