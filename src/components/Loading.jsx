"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { LoaderIcon } from "lucide-react";
import { useAppContext } from "@/components/context/AppSessionContextProvider";

const Loading = ({ children }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const { initializeTheme, themeLoaded } = useAppContext();

  useEffect(() => {
    initializeTheme(pathname, document);

    const checkSession = async () => {
      await getSession();
      setIsLoading(false);
    };
    checkSession();
  }, []);

  if (isLoading || !themeLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderIcon className="h-32 w-32 animate-spin text-primary" />
      </div>
    );
  }

  // At this point, isLoading is false and the theme is loaded
  return <>{children}</>;
};

export default Loading;
