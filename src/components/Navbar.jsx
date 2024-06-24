"use client";
// * IMPORTS UI
import ToggleThemeButton from "@/components/ToggleThemeButton";
import { ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";

// * IMPORTS UTILS
import { signOut, useSession } from "next-auth/react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ROLES } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  useState,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { ROUTES } from "@/lib/utils";

// * DEFINE STYLES
const sidebarOptionsVariants = cva(
  "group inline-flex items-center rounded-none transition-colors disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 font-semibold",
  {
    variants: {
      role_selected: {
        CLIENT_true: `text-yellow-500 hover:text-yellow-500 decoration-yellow-500`,
        CLIENT_false: `hover:text-yellow-500 decoration-yellow-500`,
        NOCLIENT_true: `text-sky-600 hover:text-sky-600 decoration-sky-600`,
        NOCLIENT_false: `hover:text-sky-600 decoration-sky-600`,
      },
      type: {
        title: `text-center text-2xl md:text-3xl h-12 md:h-14 justify-center`,
        subtitle: `w-full hover:underline text-base md:text-lg h-10 md:h-12 justify-start`,
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

// Añadir contexto SIDEBAR
const NavbarContext = createContext();

function useNavbar() {
  return useContext(NavbarContext);
}

function Navbar({ role }) {
  const { data } = useSession();
  const pathname = usePathname();
  const roleType = role === ROLES.CLIENT ? "CLIENT" : "NOCLIENT";
  const [sidebarActive, setSidebarActive] = useState(false);
  function toggleSidebar() {
    setSidebarActive(!sidebarActive);
  }
  const [expandedRoutes, setExpandedRoutes] = useState({});

  useEffect(() => {
    const paths = pathname.split("/").filter(Boolean);
    let pathnameExpandedRoutes = {};
    let accumulatedPath = "";

    paths.forEach((path, index) => {
      if (index === paths.length - 1) {
        return;
      }
      accumulatedPath += `/${path}`;
      pathnameExpandedRoutes[accumulatedPath] = true;
    });

    setExpandedRoutes(pathnameExpandedRoutes);
  }, [pathname]);

  if (!role) {
    return "Rol no asignado";
  }

  function getVariantRoleSelected(href) {
    return `${roleType}_${href === pathname}`;
  }

  function getOptionClassname(isLast = false) {
    return navbarOptionsVariants({
      role_selected: `${roleType}_${isLast ? "true" : "false"}`,
    });
  }

  return (
    <NavbarContext.Provider
      value={{
        sidebarActive,
        data,
        role,
        getVariantRoleSelected,
        toggleSidebar,
        pathname,
        expandedRoutes,
        setExpandedRoutes,
      }}
    >
      <header className="fixed top-0 z-50 flex w-full bg-primary shadow-md">
        <SidebarToggle />
        <nav className="mx-auto flex h-14 w-full items-center justify-between pr-4 font-bold md:pr-8">
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
            </Link>
          </H1>
          <div className="flex items-center space-x-4">
            <NavbarLinks />
            <ToggleThemeButton className="-mr-16 ml-4" />
            <>
              {/* <Sheet>
            <SheetTrigger asChild>
              <Button className="flex items-center md:hidden">
                <MenuIcon />
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
          </Sheet> */}
            </>
          </div>
        </nav>
      </header>
      <Sidebar />
    </NavbarContext.Provider>
  );
}

function NavbarLinks() {
  const { data, role, getVariantRoleSelected } = useNavbar();

  if (data?.user?.role !== role) {
    return (
      <div className="hidden items-center space-x-4 text-xl md:flex">
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
      </div>
    );
  }

  return (
    <Button className="ml-4" variant="destructive" onClick={() => signOut()}>
      <SignOutIcon />
    </Button>
  );
}

function SidebarToggle() {
  const { toggleSidebar } = useNavbar();
  return (
    <div className="flex items-center">
      <Button onClick={toggleSidebar}>
        <MenuIcon />
      </Button>
    </div>
  );
}

function Sidebar() {
  const { sidebarActive, role, getVariantRoleSelected } = useNavbar();
  const [sidebarOpen, setSidebarOpen] = useState(sidebarActive);

  useEffect(() => {
    setSidebarOpen(sidebarActive);
  }, [sidebarActive]);

  const sidebarAnimationClass = sidebarOpen
    ? "transform translate-x-0"
    : "transform -translate-x-full";

  return (
    <>
      <div
        className={`fixed left-0 top-14 z-50 flex h-full w-1/2 flex-col bg-secondary text-secondary-foreground shadow-inner transition-transform duration-300 sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-1/6 ${sidebarAnimationClass}`}
      >
        <H1 className="flex w-full justify-center pt-2 md:pt-4">
          <SidebarClose>
            <Link
              href={`/${role.toLowerCase()}/dashboard`}
              className={sidebarOptionsVariants({
                role_selected: getVariantRoleSelected(),
                type: "title",
              })}
            >
              {role === ROLES.ADMINISTRATOR
                ? "ADMINISTRADOR"
                : role === ROLES.CLIENT
                  ? "CLIENTE"
                  : role === ROLES.SALESPERSON
                    ? "VENDEDOR"
                    : ""}
            </Link>
          </SidebarClose>
        </H1>
        <div className="flex h-full w-full flex-col justify-start px-4">
          <SidebarLinks />
        </div>
      </div>
      {sidebarOpen && (
        <SidebarClose
          className="fixed right-0 top-14 h-full w-full cursor-default"
          onClick={() => setSidebarOpen(false)}
          alwaysClose
        ></SidebarClose>
      )}
    </>
  );
}

function SidebarLinks() {
  const {
    data,
    role,
    getVariantRoleSelected,
    expandedRoutes,
    setExpandedRoutes,
  } = useNavbar();

  if (data?.user?.role !== role) {
    return (
      <>
        <SidebarClose>
          <Link
            href={`/${role.toLowerCase()}/auth/login`}
            className={sidebarOptionsVariants({
              role_selected: getVariantRoleSelected(
                `/${role.toLowerCase()}/auth/login`,
              ),
            })}
          >
            Iniciar Sesión
          </Link>
        </SidebarClose>
        {role === ROLES.CLIENT && (
          <SidebarClose>
            <Link
              href={`/client/register`}
              className={cn(
                sidebarOptionsVariants({
                  role_selected: getVariantRoleSelected(`/client/register`),
                }),
              )}
            >
              Regístrate
            </Link>
          </SidebarClose>
        )}
      </>
    );
  }

  const toggleExpand = (route) => {
    setExpandedRoutes((prev) => ({
      ...prev,
      [route]: !prev[route],
    }));
  };

  const roleRoutes = useMemo(() => {
    return role ? ROUTES[`/${role.toLowerCase()}/dashboard`]?.children : {};
  }, [role]);

  const parentRoute = useMemo(() => {
    return role ? `/${role.toLowerCase()}/dashboard` : "";
  }, [role]);

  const renderRoutes = useCallback(
    (routes, parentRoute = "") => {
      console.log("rendering");
      return Object.keys(routes).map((key) => {
        const fullPath = `${parentRoute}${key}`;
        const route = routes[key];
        const isExpanded = expandedRoutes[fullPath] || false;

        if (typeof route === "string") {
          return (
            <SidebarClose>
              <Link
                key={fullPath}
                href={fullPath}
                className={sidebarOptionsVariants({
                  role_selected: getVariantRoleSelected(fullPath),
                })}
              >
                {route}
              </Link>{" "}
            </SidebarClose>
          );
        }

        return (
          <div key={fullPath} className="flex flex-col">
            <div className="flex items-center justify-between">
              <SidebarClose>
                <Link
                  href={fullPath}
                  className={sidebarOptionsVariants({
                    role_selected: getVariantRoleSelected(fullPath),
                  })}
                >
                  {route.name}
                </Link>{" "}
              </SidebarClose>
              <div
                onClick={() => toggleExpand(fullPath)}
                className="cursor-pointer"
              >
                {isExpanded ? <ChevronDown /> : <ChevronRight />}
              </div>
            </div>
            {isExpanded && (
              <div className="pl-4">
                {renderRoutes(route.children, `${fullPath}`)}
              </div>
            )}
          </div>
        );
      });
    },
    [expandedRoutes, toggleExpand],
  );

  return <>{renderRoutes(roleRoutes, parentRoute)}</>;
}

function SignOutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function SidebarClose({ children, className, alwaysClose = false }) {
  const { toggleSidebar } = useNavbar();

  if (alwaysClose) {
    return (
      <div className={className} onClick={toggleSidebar}>
        {children}
      </div>
    );
  }

  return (
    <>
      <div className={cn(className, "md:hidden")} onClick={toggleSidebar}>
        {children}
      </div>
      <div className={cn(className, "hidden md:flex")}>{children}</div>
    </>
  );
}
export default Navbar;
