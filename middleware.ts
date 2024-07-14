import { auth } from "@/auth";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/leaderboards", "/friends", "/groups", "/study"];

export default auth((req) => {
  const isProtectedRoute = protectedRoutes.some((prefix) =>
    req.nextUrl.pathname.startsWith(prefix),
  );
  if (!req.auth && isProtectedRoute) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
