"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./context/AppSessionContextProvider";

function ToggleThemeButton({ className = "" }) {
  const { theme } = useTheme();
  const { toggleTheme } = useContext(AppContext);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  function handleClickButton() {
    if (theme.includes("dark")) {
      toggleTheme(false);
    } else {
      toggleTheme(true);
    }
  }

  return (
    <Button
      className={className}
      variant="outline"
      size="icon"
      onClick={handleClickButton}
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
