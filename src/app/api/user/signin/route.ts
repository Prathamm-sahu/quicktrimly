import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import connectDB from "@/config/db";
import User, { IUser } from "@/model/user";
import { NextResponse } from "next/server";

const runtime = "nodejs"

export async function POST(req: Request) {
  try {
    connectDB();
    const body = await req.json();
    const { email, password } = body;

    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      return new Response("Invalid email or password", { status: 401 });
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return new Response("Invalid email or password", { status: 401 });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

    return NextResponse.json({
      token,
      userID: user._id
    })
  } catch (error) {
    return new Response("Something went wrong", { status: 500 })
  }
}
