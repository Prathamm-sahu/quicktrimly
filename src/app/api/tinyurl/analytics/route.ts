import connectDB from "@/config/db";
import ShortUrl, { IShortUrl } from "@/model/shorturl";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    connectDB();
    const searchParams = req.nextUrl.searchParams;
    const shortUrl = searchParams.get("miniUrl")

    const urlExits: IShortUrl | null = await ShortUrl.findOne({
      shortUrl,
    });

    if (!urlExits) {
      return new Response("URL doesn't exist", { status: 400 });
    }

    const visitsCount = urlExits.visits.length;

    return NextResponse.json({
      id: urlExits._id,
      totalVisitsCount: visitsCount,
      originalUrl: urlExits.originalURL,
      createdAt: urlExits.createdAt
    });
  } catch (error: any) {
    return NextResponse.json({
      msg: "Something went wrong",
      err: error.message,
    });
  }
}
