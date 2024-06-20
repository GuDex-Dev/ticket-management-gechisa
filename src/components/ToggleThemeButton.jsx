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
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { getActualTheme, toggleDarkTheme, initializeTheme } = useAppContext();

  // * FUNCTIONS

  function toggleDarkLight() {
    toggleDarkTheme(pathname, document);
  }

  // * EFFECTS

  useEffect(() => {
    initializeTheme(pathname, document);
    setIsClient(true);
  }, [pathname]);

  useEffect(() => {
    setIsDarkTheme(getActualTheme(pathname).includes("dark"));
  }, [toggleDarkLight, pathname]);

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
