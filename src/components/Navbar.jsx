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
  SheetTrigger,
} from "@/components/ui/sheet";

// * IMPORTS UTILS
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useAppContext } from "./context/AppSessionContextProvider";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ROLES } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/utils";
import BreadcrumbNavbar from "@/components/NavbarElements";

function Navbar({ role }) {
  const { data } = useSession();
  const { navbarOptions } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (!role) {
    return "Rol no asignado";
  }

  const sidebarOptionsVariants = cva(
    "group inline-flex h-14 w-max items-center justify-center rounded-none transition-colors disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 font-bold",
    {
      variants: {
        role_selected: {
          CLIENT_true: `text-yellow-500 hover:text-yellow-500 decoration-yellow-500`,
          CLIENT_false: `hover:text-yellow-500 decoration-yellow-500`,
          NOCLIENT_true: `text-sky-600 hover:text-sky-600 decoration-sky-600`,
          NOCLIENT_false: `hover:text-sky-600 decoration-sky-600`,
        },
        type: {
          title: `w-full text-center text-3xl`,
          subtitle: `hover:underline text-lg`,
        },
      },
      defaultVariants: {
        type: "subtitle",
      },
    },
  );

  const navbarOptionsVariants = cva(
    `group inline-flex h-14 w-max items-center justify-center rounded-none px-4 text-primary-foreground py-2 transition-colors disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50`,
    {
      variants: {
        role_selected: {
          CLIENT_true: `text-yellow-500 hover:text-yellow-500 decoration-yellow-500`,
          CLIENT_false: `hover:text-yellow-500 decoration-yellow-500`,
          NOCLIENT_true: `text-sky-600 hover:text-sky-600 decoration-sky-600`,
          NOCLIENT_false: `hover:text-sky-600 decoration-sky-600`,
        },
      },
    },
  );

  function getVariantRoleSelected(href) {
    return `${role === ROLES.CLIENT ? "CLIENT" : "NOCLIENT"}_${href === pathname}`;
  }

  function getOptionClassname(isLast = false) {
    return navbarOptionsVariants({
      role_selected: `${role === ROLES.CLIENT ? "CLIENT" : "NOCLIENT"}_${isLast ? "true" : "false"}`,
    });
  }

  return (
    <header className="bg-primary shadow-md">
      <nav className="container mx-auto flex h-14 items-center justify-between px-4 font-bold sm:px-6 lg:px-8">
        <H1>
          <Link
            href={`/${role.toLowerCase()}/dashboard`}
            className={navbarOptionsVariants({
              role_selected: getVariantRoleSelected(
                `/${role.toLowerCase()}/dashboard`,
              ),
            })}
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
          <div className="hidden items-center space-x-4 text-xl md:flex">
            {data?.user?.role !== role ? (
              <>
                <Link
                  href={`/${role.toLowerCase()}/auth/login`}
                  className={navbarOptionsVariants({
                    role_selected: getVariantRoleSelected(
                      `/${role.toLowerCase()}/auth/login`,
                    ),
                  })}
                >
                  Iniciar Sesión
                </Link>
                {role === ROLES.CLIENT && (
                  <Link
                    href={`/client/register`}
                    className={navbarOptionsVariants({
                      role_selected: getVariantRoleSelected(`/client/register`),
                    })}
                  >
                    Regístrate
                  </Link>
                )}
              </>
            ) : (
              <>
                <BreadcrumbNavbar getOptionClassname={getOptionClassname} />

                {/* {navbarOptions?.options?.map((option, i) => (
                  <Link
                    key={i}
                    href={option.href}
                    className={navbarOptionsVariants({
                      role_selected: getVariantRoleSelected(option.href),
                    })}
                  >
                    {option.title}
                  </Link>
                ))} */}

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
            <SheetContent className="rounded- w-3/5">
              <div className="mt-4 flex h-full w-full flex-col justify-between">
                <H1>
                  <SheetClose asChild>
                    <Link
                      href={`/${role.toLowerCase()}/dashboard`}
                      className={cn(
                        sidebarOptionsVariants({
                          role_selected: getVariantRoleSelected(
                            `/${role.toLowerCase()}/dashboard`,
                          ),
                          type: "title",
                        }),
                      )}
                    >
                      {role === ROLES.ADMINISTRATOR
                        ? "ADMINISTRADOR"
                        : role === ROLES.CLIENT
                          ? "CLIENTE"
                          : role === ROLES.SALESPERSON
                            ? "VENDEDOR"
                            : ""}
                    </Link>
                  </SheetClose>
                </H1>
                <div className="flex h-full w-full flex-col justify-start">
                  {data?.user?.role !== role ? (
                    <>
                      <SheetClose asChild>
                        <Link
                          href={`/${role.toLowerCase()}/auth/login`}
                          className={cn(
                            sidebarOptionsVariants({
                              role_selected: getVariantRoleSelected(
                                `/${role.toLowerCase()}/auth/login`,
                              ),
                            }),
                          )}
                        >
                          Iniciar Sesión
                        </Link>
                      </SheetClose>
                      {role === ROLES.CLIENT && (
                        <SheetClose asChild>
                          <Link
                            href={`/client/register`}
                            className={cn(
                              sidebarOptionsVariants({
                                role_selected:
                                  getVariantRoleSelected(`/client/register`),
                              }),
                            )}
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
                            className={cn(
                              sidebarOptionsVariants({
                                role_selected: getVariantRoleSelected(
                                  option.href,
                                ),
                              }),
                            )}
                          >
                            {option.title}
                          </Link>
                        </SheetClose>
                      ))}
                    </>
                  )}
                </div>
                {data?.user?.role === role && (
                  <div className="flex h-full w-full flex-col justify-end">
                    <div className="my-4 flex items-center justify-center">
                      <hr className="mx-4 w-full border-t border-gray-500" />
                      <span className="mx-2 text-lg text-gray-500">O</span>
                      <hr className="mx-4 w-full border-t border-gray-500" />
                    </div>
                    <Button
                      className="mx-4 mb-6"
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
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
