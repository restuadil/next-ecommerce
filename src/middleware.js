import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Redirect root path to login
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Get token to check user role
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // Redirect to login if token is not available
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const userRole = token.role;

  // Restrict access based on user role
  if (pathname.startsWith("/admin") && userRole !== "admin") {
    return NextResponse.redirect(new URL("/staff/profile", req.url));
  }

  if (pathname.startsWith("/staff") && userRole !== "staff") {
    return NextResponse.redirect(new URL("/403", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/staff/:path*"],
};
