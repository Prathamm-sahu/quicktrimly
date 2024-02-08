import connectDB from "@/config/db";
import ShortUrl, { IShortUrl } from "@/model/shorturl";
import { timeStamp } from "console";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { redirect: string } }
) {
  try {
    connectDB();
    const shortUrlExists: IShortUrl | null = await ShortUrl.findOne({
      shortUrl: `https://tinyurl-eight.vercel.app/api/${params.redirect}`,
    });

    if (!shortUrlExists) {
      return new Response("URL not found", { status: 400 });
    }

    // Increase the vists count of the url
    const shortUrl: IShortUrl | null = await ShortUrl.findOneAndUpdate(
      { _id: shortUrlExists._id },
      {
        $push: {
          visits: {
            timestamps: Date.now(),
          },
        },
      }
    );

    console.log(shortUrl);

    if (shortUrl) {
      return NextResponse.redirect(shortUrl.originalURL);
    }

    return NextResponse.json({
      msg: "Something Went wrong try again later",
    });
  } catch (error: any) {
    return NextResponse.json({
      msg: "Something went wrong",
      err: error.message,
    });
  }
}
