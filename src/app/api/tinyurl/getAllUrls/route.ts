import connectDB from "@/config/db";
import ShortUrl, { IShortUrl } from "@/model/shorturl";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    connectDB();
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId")

    const rawAllUrl: IShortUrl[] | null = await ShortUrl.find({
      user: userId,
    }, {
      _id: 1,
      originalURL: 1,
      shortUrl: 1,
      visits: 1,
    });

    if (!rawAllUrl) {
      return new Response("URL doesn't exist", { status: 400 });
    }

    const allUrl = rawAllUrl.map((item) => {
      return {
        id: item._id,
        originalUrl: item.originalURL,
        tinyUrl: item.shortUrl,
        totalVists: item.visits.length,
      }
    })

    return NextResponse.json({
      allUrl
    });
  } catch (error: any) {
    return NextResponse.json({
      msg: "Something went wrong",
      err: error.message,
    });
  }
}
