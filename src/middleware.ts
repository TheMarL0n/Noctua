import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: any) {
  const token = request.cookies.get("accessToken");
  const secret = process.env.JWT_SECRET ?? "";

  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  // this condition avoid to show the login page if the user is logged in
  /*if (token) {
    console.log('TRUE');
    if (request.nextUrl.pathname.includes("/login")) {
      try {
        await jwtVerify(token.value, new TextEncoder().encode(secret));
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch (error) {
        return NextResponse.next();
      }
    }
  }*/

  try {
    jwtVerify(token.value, new TextEncoder().encode(secret));
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/desktop/:path*", "/noctua-ai/:path*"],
};