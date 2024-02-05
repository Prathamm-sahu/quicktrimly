import bcrypt from "bcrypt";
import connectDB from "@/config/db";
import User, { IUser } from "@/model/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("Hello1")
    connectDB();
    console.log("Hello2")
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    const userExits: IUser | null = await User.findOne({ email });
    console.log(userExits)
    if (userExits) {
      return new Response("User Already Exits", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return new Response("Something went wrong try again later", {
        status: 500,
      });
    }

    return new Response("User SignUp Successfull", { status: 201 });
  } catch (error: any) {
    return NextResponse.json({
      msg: "Could not sign up this time try again later",
      error: error.message
    }, {
      status: 500,
    });
  }
}
