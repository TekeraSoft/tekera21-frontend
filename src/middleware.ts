import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

import { sellerRoles } from "./constants/roles";
import { getUser } from "./app/actions/server/auth.actions";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const user = await getUser()

  const { pathname, } = request.nextUrl;


  const publicRoutes = ["/giris", "/forgot-password", "/reset-password", "/kayit", "/digital-fashion", "/verify"];
  const protectedRoutes = ["/seller", "/manage", "/register"];
  const sellerRoutes = ["/seller", "/register", "/register/edit"]
  const customerRole = "CUSTOMER"

  const isSellerRoute = sellerRoutes.some((route) => pathname.includes(route))

  if (protectedRoutes.some((route) => pathname.includes(route)) && !user) {
    const loginUrl = new URL(`/giris`, request.url);
    return NextResponse.redirect(loginUrl);
  }


  if (user) {
    const isSeller = user.roles.some((role) => sellerRoles.includes(role));
    const isSuperAdmin = user.roles.includes("SUPER_ADMIN") || user.roles.includes("SELLER_SUPPORT");
    const isCustomer = user.roles.includes(customerRole);

    if (publicRoutes.some((route) => pathname.includes(route))) {
      const redirectUrl = new URL(isSeller ? `/seller` : isSuperAdmin ? `/manage` : `/register`, request.url);
      return NextResponse.redirect(redirectUrl);
    }

    if (isSuperAdmin && !pathname.includes("manage")) {
      const redirectUrl = new URL(`/manage`, request.url);
      return NextResponse.redirect(redirectUrl);
    }


    if (isCustomer && !isSeller && !pathname.includes("/register")) {
      const redirectUrl = new URL(`/register`, request.url);
      return NextResponse.redirect(redirectUrl);
    }

    if (isSeller && !isSellerRoute) {
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
