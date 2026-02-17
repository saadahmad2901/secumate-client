// app/middleware.js
import { NextResponse } from "next/server";

// Protected routes
const protectedRoutes = ["/authorized"];

/** @type {import('next/server').NextRequest} */
export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Skip routes that don't require authentication
  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get token from cookies
  const tokenCookie = req.cookies.get("token");
  const token = tokenCookie?.value;

  // If no token, redirect to login
  if (!token) {
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);
  }

  // OPTIONAL: Validate token (e.g., JWT)
  // You can verify JWT signature here if needed
  // Example:
  // try {
  //   jwt.verify(token, process.env.JWT_SECRET);
  // } catch (err) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // Token exists and is valid -> continue
  return NextResponse.next();
}

// Apply middleware to all /authorized/* routes
export const config = {
  matcher: ["/authorized/:path*"],
};
