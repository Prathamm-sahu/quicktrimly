import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(request: NextRequest) {
  const token = request.headers.get("authorization");
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET!, (err) => {
      if (err) {
        return NextResponse.json(
          {
            msg: "Unauthorized",
          },
          { status: 403 }
        );
      }
    });
  } else {
    return NextResponse.json({
      msg: "Unauthorized"
    }, { status: 403 })
  }
}

export const config = {
  matcher: ["/api/tinyurl", "/api/:path"],
};
