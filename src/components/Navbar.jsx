"use client";
import ToggleThemeButton from "@/components/ToggleThemeButton";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ROLES } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useAppContext } from "./context/AppSessionContextProvider";
import { H1 } from "./ui/typography";
import { useEffect, useState } from "react";

function Navbar({ role }) {
  const { data } = useSession();
  const { navbarOptions } = useAppContext();
  const [isYellow, setIsYellow] = useState(false);

  useEffect(() => {
    setIsYellow(role === ROLES.ADMINISTRATOR || role === ROLES.SALESPERSON);
  }, [role]);

  if (!role) {
    return "Rol no asignado";
  }

  const navigationMenuTriggerStyle = cva(
    `group inline-flex h-16 w-max items-center justify-center rounded-none bg-primary text-primary-foreground px-4 py-2 transition-colors ${
      isYellow ? "hover:text-sky-700" : "hover:text-yellow-400"
    } disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`
  );

  return (
    <header className="bg-primary shadow-md">
      <nav className="container h-16 mx-auto flex items-center text-lg font-bold ">
        <H1>
          <Link
            href={`/${role.toLowerCase()}/dashboard`}
            className={cn(navigationMenuTriggerStyle(), "text-4xl -ml-10")}
          >
            GECHISA
            {role === ROLES.ADMINISTRATOR
              ? " - ADMINISTRADOR"
              : role === ROLES.CLIENT
              ? ""
              : role === ROLES.SALESPERSON
              ? " - VENDEDOR"
              : ""}
          </Link>
        </H1>

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
              {navbarOptions?.options?.map((option, i) => (
                <Link
                  key={i}
                  href={option.href}
                  className={navigationMenuTriggerStyle()}
                >
                  {option.title}
                </Link>
              ))}

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

export default Navbar;
