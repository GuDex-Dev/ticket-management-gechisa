"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useAppContext } from "@/components/context/AppSessionContextProvider";

function ToggleThemeButton({ className = "" }) {
  // * HOOKS
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const { themeApp, toggleTheme } = useAppContext();

  // * FUNCTIONS

  function toggleDarkLight() {
    const isCurrentlyDark = document.body.className.includes("dark");
    toggleTheme(pathname, document, !isCurrentlyDark);
  }

  // * EFFECTS

  useEffect(() => {
    setIsClient(true);
    const isCurrentlyDark = document.body.className.includes("dark");
    toggleTheme(pathname, document, isCurrentlyDark);
  }, [pathname]);

  const currentTheme = themeApp.find((theme) => theme.id === pathname);
  const isDarkTheme = currentTheme
    ? currentTheme.theme.includes("dark")
    : document.body.className.includes("dark");

  return (
    <Button
      className={className}
      variant="outline"
      size="icon"
      onClick={toggleDarkLight}
    >
      {isClient &&
        (isDarkTheme ? (
          <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
        ))}
    </Button>
  );
}

export default ToggleThemeButton;
