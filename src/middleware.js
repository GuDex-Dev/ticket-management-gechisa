import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { ROLES } from "@/constants";

export default withAuth(
  function middleware(req) {
    if (req.nextUrl.pathname.startsWith("/client/dashboard")) {
      if (req.nextauth?.token?.role !== ROLES.CLIENT) {
        const url = req.nextUrl.clone();
        url.pathname = "/client/auth/login";
        return NextResponse.next();
      }
    }
    if (req.nextUrl.pathname.startsWith("/salesperson/dashboard")) {
      if (req.nextauth?.user?.role !== ROLES.SALESPERSON) {
        const url = req.nextUrl.clone();
        url.pathname = "/salesperson/auth/login";
        return NextResponse.redirect(url);
      }
    }
    if (req.nextUrl.pathname.startsWith("/administrator/dashboard")) {
      if (req.nextauth?.user?.role !== ROLES.ADMINISTRATOR) {
        const url = req.nextUrl.clone();
        url.pathname = "/administrator/auth/login";
        return NextResponse.redirect(url);
      }
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
