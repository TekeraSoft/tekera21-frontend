import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./app/actions";
import { TUserTypes } from "@/types/AuthTypes";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const user = await getUser()

  const { pathname } = request.nextUrl;

  const publicRoutes = ["/login", "/forgot-password", "/reset-password", "/signup", "/digital-fashion", "/verify"];
  const protectedRoutes = ["/seller", "/superadmin", "/register"];

  if (protectedRoutes.some((route) => pathname.includes(route)) && !user) {
    const loginUrl = new URL(`/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }
  if (publicRoutes.some((route) => pathname.includes(route)) && user) {
    const redirectUrl = new URL(`/`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (user) {
    if (user.roles.includes("SUPER_ADMIN") && !pathname.includes("superadmin")) {
      const redirectUrl = new URL(`/superadmin`, request.url);
      return NextResponse.redirect(redirectUrl);
    }
    const sellerRoles: TUserTypes[] = ["COMPANY_ADMIN", "COMPANY_EMPLOYEE"];
    if (user.roles.some((role) => sellerRoles.includes(role)) && !pathname.includes("/seller")) {
      const redirectUrl = new URL(`/seller`, request.url);
      return NextResponse.redirect(redirectUrl);
    }

  }

  response.headers.set("x-pathname", request.nextUrl.pathname);

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
