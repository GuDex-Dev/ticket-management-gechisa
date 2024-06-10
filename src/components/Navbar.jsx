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
      <nav className="container mx-auto flex p-4 items-center text-lg font-bold ">
        <Link href="/" className={cn(navigationMenuTriggerStyle(), "text-3xl")}>
          GECHISA
          {role === ROLES.ADMINISTRATOR
            ? " - Admin"
            : role === ROLES.CLIENT
            ? ""
            : role === ROLES.SALESPERSON
            ? " - Vendedor"
            : ""}
        </Link>
        <div className="flex ml-auto space-x-4 items-center">
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
                  href={`/client/auth/register`}
                  className={navigationMenuTriggerStyle()}
                >
                  Regístrate
                </Link>
              )}
            </>
          ) : (
            <>
              <Button variant="destructive" onClick={() => signOut()}>
                Cerrar Sesión
              </Button>
            </>
          )}

          <ToggleThemeButton />
        </div>
      </nav>
    </header>
  );
}

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
);

export default Navbar;
