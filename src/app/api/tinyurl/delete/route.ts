import connectDB from "@/config/db";
import ShortUrl, { IShortUrl } from "@/model/shorturl";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    connectDB()
    const searchParams = req.nextUrl.searchParams;
    const shortUrl = searchParams.get("miniUrl")
    const shortUrlExist: IShortUrl | null = await ShortUrl.findOne({ shortUrl })

    if(!shortUrlExist) {
      return new Response("The item you are trying to delete doesn't exists", { status: 400 })
    }

    await ShortUrl.deleteOne({ shortUrl })
    return new Response("ShortUrl delete successfully", { status: 200 })
  } catch (error: any) {
    return NextResponse.json({
      msg: "Something went wrong",
      err: error.message
    })
  }
}