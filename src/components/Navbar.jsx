"use client";
// * IMPORTS UI
import ToggleThemeButton from "@/components/ToggleThemeButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// * IMPORTS UTILS
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useAppContext } from "./context/AppSessionContextProvider";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ROLES } from "@/lib/utils";

function Navbar({ role }) {
  const { data } = useSession();
  const { navbarOptions } = useAppContext();
  const [isYellow, setIsYellow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setIsYellow(role === ROLES.ADMINISTRATOR || role === ROLES.SALESPERSON);
  }, [role]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!role) {
    return "Rol no asignado";
  }

  const navigationMenuTriggerStyle = cva(
    `group inline-flex h-14 w-max items-center justify-center rounded-none bg-primary text-primary-foreground px-4 py-2 transition-colors ${
      isYellow ? "hover:text-sky-700" : "hover:text-yellow-400"
    } disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`,
  );

  return (
    <header className="bg-primary shadow-md">
      <nav className="container mx-auto flex h-14 items-center justify-between px-4 text-lg font-bold sm:px-6 lg:px-8">
        <H1>
          <Link
            href={`/${role.toLowerCase()}/dashboard`}
            className={cn(navigationMenuTriggerStyle())}
          >
            GECHISA
            {role === ROLES.ADMINISTRATOR
              ? " - ADMIN"
              : role === ROLES.CLIENT
                ? ""
                : role === ROLES.SALESPERSON
                  ? " - VENDEDOR"
                  : ""}
          </Link>
        </H1>
        <div className="flex items-center space-x-4">
          <div className="hidden space-x-4 md:flex">
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
          </div>
          <ToggleThemeButton className="-mr-16 ml-4" />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="flex items-center md:hidden"
                onClick={toggleMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="grid gap-4 py-4">
                <H1>
                  <SheetClose asChild>
                    <Link
                      href={`/${role.toLowerCase()}/dashboard`}
                      className={cn(navigationMenuTriggerStyle(), "text-xl")}
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
                  </SheetClose>
                </H1>
                <div className="flex flex-col space-y-4">
                  {data?.user?.role !== role ? (
                    <>
                      <SheetClose asChild>
                        <Link
                          href={`/${role.toLowerCase()}/auth/login`}
                          className={navigationMenuTriggerStyle()}
                        >
                          Inicia Sesión
                        </Link>
                      </SheetClose>
                      {role === ROLES.CLIENT && (
                        <SheetClose asChild>
                          <Link
                            href={`/client/register`}
                            className={navigationMenuTriggerStyle()}
                          >
                            Regístrate
                          </Link>
                        </SheetClose>
                      )}
                    </>
                  ) : (
                    <>
                      {navbarOptions?.options?.map((option, i) => (
                        <SheetClose asChild>
                          <Link
                            key={i}
                            href={option.href}
                            className={navigationMenuTriggerStyle()}
                          >
                            {option.title}
                          </Link>
                        </SheetClose>
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
                </div>
              </div>
              <SheetClose asChild></SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
