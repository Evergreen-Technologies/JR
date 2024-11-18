import { NextRequest, NextResponse } from "next/server";
import { i18nRouter } from "next-i18n-router";
import i18nConfig from "../i18nConfig";
import { getToken } from "next-auth/jwt";

async function handleAuthMiddleware(request) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin")) {
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    }
  }
  return NextResponse.next(); // Allow subsequent middleware
}

async function handleI18nMiddleware(request) {
  const { pathname } = request.nextUrl;
  if (
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/static") &&
    !pathname.includes(".") &&
    !pathname.startsWith("/_next")
  ) {
    return i18nRouter(request, i18nConfig);
  }
  return NextResponse.next();
}

export async function middleware(request) {
  // Apply both middlewares in sequence
  const authResponse = await handleAuthMiddleware(request);
  if (!authResponse.ok) return authResponse;

  const i18nResponse = await handleI18nMiddleware(request);
  return i18nResponse;
}

// Updated matcher to cover all paths for sequential middlewares
export const config = {
  matcher: ["/((?!static|.*\\..*|_next).*)"],
};
