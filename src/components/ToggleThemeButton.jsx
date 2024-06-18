"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function ToggleThemeButton({ className = "" }) {
  // * HOOKS
  const { theme } = useTheme();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  // * FUNCTIONS

  function toggleDarkLight() {
    if (document.body.className.includes("dark")) {
      toggleTheme(false);
    } else {
      toggleTheme(true);
    }
  }

  function toggleTheme(isDark) {
    if (!isDark) {
      if (pathname.includes("client")) {
        document.body.className = "blue-light";
      } else if (
        pathname.includes("administrator") ||
        pathname.includes("salesperson")
      ) {
        document.body.className = "yellow-light";
      } else {
        document.body.className = "light";
      }
    } else {
      if (pathname.includes("client")) {
        document.body.className = "blue-dark";
      } else if (
        pathname.includes("administrator") ||
        pathname.includes("salesperson")
      ) {
        document.body.className = "yellow-dark";
      } else {
        document.body.className = "dark";
      }
    }
  }

  // * EFFECTS

  useEffect(() => {
    setIsClient(true);
    toggleTheme(document.body.className.includes("dark"));
  }, []);

  return (
    <Button
      className={className}
      variant="outline"
      size="icon"
      onClick={toggleDarkLight}
    >
      {isClient &&
        (theme?.includes("dark") ? (
          <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
        ))}
    </Button>
  );
}

export default ToggleThemeButton;
