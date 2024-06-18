"use client";

import { SessionProvider } from "next-auth/react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, createContext, useState, useContext } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export default function AppSessionContextProvider({ children, session }) {
  const [navbarOptions, setNavbarOptions] = useState(null);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const toggleTheme = (isDark) => {
    if (pathname.includes("client")) {
      setTheme(isDark ? "dark" : "light");
    } else {
      setTheme(isDark ? "yellow-dark" : "yellow-light");
    }
  };

  useEffect(() => {
    const isDark = theme.includes("dark") || theme === undefined;
    toggleTheme(isDark);
    if (pathname !== navbarOptions?.pathname) {
      setNavbarOptions(null);
    }
  }, [pathname]);

  useEffect(() => {
    if (theme) {
      document.body.className = theme;
    }
  }, [theme]);

  return (
    <AppContext.Provider
      value={{ toggleTheme, navbarOptions, setNavbarOptions }}
    >
      <SessionProvider session={session}>{children}</SessionProvider>
    </AppContext.Provider>
  );
}
