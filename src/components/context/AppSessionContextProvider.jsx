"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useState, useContext } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export default function AppSessionContextProvider({ children, session }) {
  const [navbarOptions, setNavbarOptions] = useState(null);
  const [themeApp, setThemeApp] = useState([]);

  function toggleTheme(pathname, document, isDark) {
    const newTheme = getThemeByPathname(pathname, isDark);
    setThemeApp((prevThemes) => {
      const existingThemeIndex = prevThemes.findIndex(
        (theme) => theme.id === pathname,
      );
      if (existingThemeIndex !== -1) {
        // Update existing theme
        const updatedThemes = [...prevThemes];
        updatedThemes[existingThemeIndex].theme = newTheme;
        return updatedThemes;
      } else {
        // Add new theme
        return [...prevThemes, { id: pathname, theme: newTheme }];
      }
    });
    document.body.className = newTheme;
  }

  function getThemeByPathname(pathname, isDark) {
    if (pathname.includes("client")) {
      return isDark ? "blue-dark" : "blue-light";
    } else if (
      pathname.includes("administrator") ||
      pathname.includes("salesperson")
    ) {
      return isDark ? "yellow-dark" : "yellow-light";
    } else {
      return isDark ? "dark" : "light";
    }
  }

  return (
    <AppContext.Provider
      value={{ navbarOptions, setNavbarOptions, toggleTheme, themeApp }}
    >
      <SessionProvider session={session}>{children}</SessionProvider>
    </AppContext.Provider>
  );
}
