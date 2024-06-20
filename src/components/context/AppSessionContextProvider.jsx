"use client";
import { SessionProvider } from "next-auth/react";
import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export default function AppSessionContextProvider({ children, session }) {
  const [navbarOptions, setNavbarOptions] = useState(null);
  const [themeApp, setThemeApp] = useState(null);
  const [themeLoaded, setThemeLoaded] = useState(false);

  function initializeTheme(pathname, document) {
    if (!themeApp) return;

    const themeType = getCurrentThemeType(pathname);
    const currentTheme = themeApp[themeType]?.actual;
    if (currentTheme) {
      document.body.className = currentTheme;
      console.log("Theme initialized");
    }
  }

  function toggleDarkTheme(pathname, document) {
    if (!themeApp) return;

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
    if (!themeApp) return null;
    const themeType = getCurrentThemeType(pathname);
    return themeApp[themeType]?.actual;
  }

  useEffect(() => {
    const savedThemes = localStorage.getItem("themeApp");
    if (savedThemes) {
      setThemeApp(JSON.parse(savedThemes));
    } else {
      setThemeApp({
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
    }
    setThemeLoaded(true);
  }, []);

  useEffect(() => {
    // Save theme to localStorage
    if (themeLoaded && themeApp) {
      localStorage.setItem("themeApp", JSON.stringify(themeApp));
    }
  }, [themeApp, themeLoaded]);

  return (
    <AppContext.Provider
      value={{
        navbarOptions,
        setNavbarOptions,
        initializeTheme,
        toggleDarkTheme,
        getActualTheme,
        getCurrentThemeType,
        themeLoaded,
      }}
    >
      <SessionProvider session={session}>
        {themeLoaded && children}
      </SessionProvider>
    </AppContext.Provider>
  );
}
