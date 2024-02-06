import connectDB from "@/config/db";
import ShortUrl, { IShortUrl } from "@/model/shorturl";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    connectDB();
    const searchParams = req.nextUrl.searchParams;
    const urlId = searchParams.get("urlId")

    const urlExits: IShortUrl | null = await ShortUrl.findOne({
      shortUrl: `http://localhost:3000/api/${urlId}`,
    });

    if (!urlExits) {
      return new Response("URL doesn't exist", { status: 400 });
    }

    const visitsCount = urlExits.visits.length;

    return NextResponse.json({
      totalVisitsCount: visitsCount,
    });
  } catch (error: any) {
    return NextResponse.json({
      msg: "Something went wrong",
      err: error.message,
    });
  }
}
