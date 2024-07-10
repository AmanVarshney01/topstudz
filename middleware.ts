import { auth } from "@/auth";

const protectedRoutes = ["/dashboard", "/leaderboards"];

export default auth((req) => {
  const isProtectedRoute = protectedRoutes.some((prefix) =>
    req.nextUrl.pathname.startsWith(prefix),
  );
  if (!req.auth && isProtectedRoute) {
    const newUrl = new URL("/login", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
