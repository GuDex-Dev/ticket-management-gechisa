"use client";
import ToggleThemeButton from "@/components/ToggleThemeButton";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ROLES } from "@/constants";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

function Navbar({ role }) {
  const { data } = useSession();

  if (!role) {
    return "Rol no asignado";
  }

  return (
    <header className="bg-primary shadow-md">
      <nav className="container h-16 mx-auto flex items-center text-lg font-bold ">
        <Link
          href={`/${role.toLowerCase()}/dashboard`}
          className={cn(navigationMenuTriggerStyle(), "text-3xl")}
        >
          GECHISA
          {role === ROLES.ADMINISTRATOR
            ? " - Admin"
            : role === ROLES.CLIENT
            ? ""
            : role === ROLES.SALESPERSON
            ? " - Vendedor"
            : ""}
        </Link>
        <div className="flex ml-auto items-center">
          {data?.user?.role !== role ? (
            <>
              <Link
                href={`/${role.toLowerCase()}/auth/login`}
                className={navigationMenuTriggerStyle()}
              >
                Inicia Sesión
              </Link>
              {role === ROLES.CLIENT && (
                <Link
                  href={`/client/register`}
                  className={navigationMenuTriggerStyle()}
                >
                  Regístrate
                </Link>
              )}
            </>
          ) : (
            <>
              {role === ROLES.ADMINISTRATOR ? (
                <Link
                  href={`/${role.toLowerCase()}/dashboard/create-trip`}
                  className={navigationMenuTriggerStyle()}
                >
                  Crear Viaje
                </Link>
              ) : role === ROLES.SALESPERSON ? (
                <Link
                  href={`/${role.toLowerCase()}/dashboard/sell-ticket`}
                  className={navigationMenuTriggerStyle()}
                >
                  Vender Boleto
                </Link>
              ) : null}
              <Button
                className="ml-4"
                variant="destructive"
                onClick={() => signOut()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                  />
                </svg>
              </Button>
            </>
          )}
          <ToggleThemeButton className="ml-4 -mr-16" />
        </div>
      </nav>
    </header>
  );
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-16 w-max items-center justify-center rounded-none bg-primary text-primary-foreground px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
);

export default Navbar;
