"use client";

import { SessionProvider } from "next-auth/react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useEffect, createContext } from "react";

export const AppContext = createContext();

export default function AppSessionContextProvider({ children, session }) {
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
  }, [pathname]);

  useEffect(() => {
    if (theme) {
      document.body.className = theme;
      console.log(`Theme applied: ${theme}`);
    }
  }, [theme]);

  return (
    <AppContext.Provider value={{ toggleTheme }}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </AppContext.Provider>
  );
}
