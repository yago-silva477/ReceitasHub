import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sessionCookieName } from "@/config/auth";

const privateRoutes = ["/perfil", "/favoritos"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  if (!isPrivateRoute) {
    return NextResponse.next();
  }

  const hasSession = Boolean(request.cookies.get(sessionCookieName)?.value);

  if (!hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("erro", "Entre para acessar esta area.");

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/perfil/:path*", "/favoritos/:path*"]
};
