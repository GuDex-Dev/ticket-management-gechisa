import { ChevronRight } from "lucide-react";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/utils"; // Ruta donde guardaste las rutas

export default function BreadcrumbNavbar({ getOptionClassname }) {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);
  let parentRoute = ROUTES;
  let currentPath = "";

  const breadcrumbItems = pathnames.map((path, index) => {
    const route = parentRoute[`${currentPath}/${path}`];

    if (!route) {
      currentPath += `/${path}`;
      return null;
    }

    const isLast = index === pathnames.length - 1;
    const routeName = route?.name || route;
    const href = `/${pathnames.slice(0, index + 1).join("/")}`;

    if (isLast) {
      return (
        <>
          {routeName !== "-" && (
            <Link href={href} className={getOptionClassname(true)}>
              {routeName}
            </Link>
          )}

          {route?.children && (
            <>
              <ChevronRight className="pt-1 text-primary-foreground" />
              {Object.keys(route.children).map((child) => {
                const childRoute = route.children[child];
                const childRouteName = childRoute?.name || childRoute;
                const childHref = `${href}${child}`;

                return (
                  <>
                    <Link href={childHref} className={getOptionClassname()}>
                      {childRouteName}
                    </Link>
                  </>
                );
              })}
            </>
          )}
        </>
      );
    }

    parentRoute = route?.children || parentRoute;
    currentPath = route?.children ? "" : currentPath;

    return (
      <>
        {routeName !== "-" && (
          <Link href={href} className={getOptionClassname()}>
            {routeName}
          </Link>
        )}
        <ChevronRight className="pt-1 text-primary-foreground" />
      </>
    );
  });

  return (
    <>
      <nav className="flex items-center">{breadcrumbItems}</nav>
    </>
  );
}
