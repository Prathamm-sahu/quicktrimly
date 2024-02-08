import { NextResponse } from "next/server";
import { crc32 } from "crc";
import { v4 as uuidv4 } from "uuid";
import shortid from "shortid"
import bcrypt from "bcrypt";
import connectDB from "@/config/db";
import ShortUrl, { IShortUrl } from "@/model/shorturl";

export async function POST(req: Request) {
  try {
    connectDB();
    const body = await req.json();
    const { url, userId } = body;

    const urlExists: IShortUrl | null = await ShortUrl.findOne({
      originalURL: url,
    });
    console.log(urlExists);

    // If tinyUrl already exists then return it.
    if (urlExists) {
      return NextResponse.json({
        tinyURL: urlExists.shortUrl,
      });
    }
    
    // If we want to make our application more scaleable we can use hashing to hash the original url so that we can more combinations so that it can cause less clash of two or more url are pointed by same tinyUrl

    // I'm using shortid package to generate random small Ids
    const shortId = shortid()

    const newShortUrl: IShortUrl | null = await ShortUrl.create({
      shortUrl: `http://localhost:3000/api/${shortId}`,
      originalURL: url,
      visits: [],
      user: userId
    })

    return NextResponse.json({
      tinyURL: newShortUrl?.shortUrl
    });
  } catch (error: any) {
    return NextResponse.json({
      msg: "Something went wrong",
      error: error.message,
    });
  }
}
