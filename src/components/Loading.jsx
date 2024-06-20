"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { LoaderIcon } from "lucide-react";
import { useAppContext } from "@/components/context/AppSessionContextProvider";

const Loading = ({ children }) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const { initializeTheme } = useAppContext();

  useEffect(() => {
    initializeTheme(pathname, document);
    const checkSession = async () => {
      await getSession();
      setIsLoading(false);
    };
    checkSession();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderIcon className="h-32 w-32 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
};

export default Loading;
