"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useState, useContext, useEffect } from "react";
import { useTheme } from "next-themes";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export default function AppSessionContextProvider({ children, session }) {
  const { theme, setTheme } = useTheme();
  const [navbarOptions, setNavbarOptions] = useState(null);
  const [themeApp, setThemeApp] = useState({
    Client: {
      dark: "blue-dark",
      light: "blue-light",
      actual: "blue-dark",
    },
    Employee: {
      dark: "yellow-dark",
      light: "yellow-light",
      actual: "yellow-dark",
    },
    Default: {
      dark: "dark",
      light: "light",
      actual: "dark",
    },
  });
  const [themeLoaded, setThemeLoaded] = useState(false);

  function initializeTheme(pathname, document) {
    const themeType = getCurrentThemeType(pathname);
    const currentTheme = themeApp[themeType]?.actual;
    if (currentTheme) {
      document.body.className = currentTheme;
    }
  }

  function toggleDarkTheme(pathname, document) {
    const themeType = getCurrentThemeType(pathname);
    setThemeApp((prevThemes) => {
      const newTheme = prevThemes[themeType].actual.includes("dark")
        ? prevThemes[themeType].light
        : prevThemes[themeType].dark;
      document.body.className = newTheme;
      return {
        ...prevThemes,
        [themeType]: {
          ...prevThemes[themeType],
          actual: newTheme,
        },
      };
    });
  }

  function getCurrentThemeType(pathname) {
    if (pathname.includes("client")) {
      return "Client";
    } else if (
      pathname.includes("administrator") ||
      pathname.includes("salesperson")
    ) {
      return "Employee";
    } else {
      return "Default";
    }
  }

  function getActualTheme(pathname) {
    const themeType = getCurrentThemeType(pathname);
    return themeApp[themeType]?.actual;
  }

  useEffect(() => {
    // Save theme to localStorage
    if (!themeLoaded) return;
    localStorage.setItem("themeApp", JSON.stringify(themeApp));
  }, [themeApp, themeLoaded]);

  useEffect(() => {
    const savedThemes = localStorage.getItem("themeApp");
    if (savedThemes) {
      setThemeApp(JSON.parse(savedThemes));
    }
    setThemeLoaded(true);
  }, []);

  return (
    <AppContext.Provider
      value={{
        navbarOptions,
        setNavbarOptions,
        initializeTheme,
        toggleDarkTheme,
        getActualTheme,
        getCurrentThemeType,
      }}
    >
      <SessionProvider session={session}>{children}</SessionProvider>
    </AppContext.Provider>
  );
}
