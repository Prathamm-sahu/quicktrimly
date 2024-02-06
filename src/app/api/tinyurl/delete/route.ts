import connectDB from "@/config/db";
import ShortUrl, { IShortUrl } from "@/model/shorturl";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    connectDB()
    const body = await req.json()
    const { url } = body
    const shortUrlExist: IShortUrl | null = await ShortUrl.findOne({ shortUrl: url })

    if(!shortUrlExist) {
      return new Response("The item you are trying to delete doesn't exists", { status: 400 })
    }

    await ShortUrl.deleteOne({ shortUrl: url })
    return new Response("ShortUrl delete successfully", { status: 200 })
  } catch (error: any) {
    return NextResponse.json({
      msg: "Something went wrong",
      err: error.message
    })
  }
}