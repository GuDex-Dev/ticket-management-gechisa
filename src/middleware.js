import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { ROLES } from "@/constants";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const { role } = req.nextauth?.token || {};

    if (pathname.startsWith("/client/auth/login") && role === ROLES.CLIENT) {
      const url = req.nextUrl.clone();
      url.pathname = "/client/dashboard";
      return NextResponse.redirect(url);
    }

    if (
      pathname.startsWith("/salesperson/auth/login") &&
      role === ROLES.SALESPERSON
    ) {
      const url = req.nextUrl.clone();
      url.pathname = "/salesperson/dashboard";
      return NextResponse.redirect(url);
    }

    if (
      pathname.startsWith("/administrator/auth/login") &&
      role === ROLES.ADMINISTRATOR
    ) {
      const url = req.nextUrl.clone();
      url.pathname = "/administrator/dashboard";
      return NextResponse.redirect(url);
    }

    if (
      pathname.startsWith("/salesperson/dashboard") &&
      role !== ROLES.SALESPERSON
    ) {
      const url = req.nextUrl.clone();
      url.pathname = "/salesperson/auth/login";
      return NextResponse.redirect(url);
    }

    if (
      pathname.startsWith("/administrator/dashboard") &&
      role !== ROLES.ADMINISTRATOR
    ) {
      const url = req.nextUrl.clone();
      url.pathname = "/administrator/auth/login";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: (params) => {
        return true;
      },
    },
  }
);
