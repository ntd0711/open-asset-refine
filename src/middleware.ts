import { auth } from "@auth";
import { authRoutes, protectedRoutes } from "@routes";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  if (nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  const isLoggedIn = !!req.auth;
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth", req.url));
  }
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
