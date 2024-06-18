"use client";

import { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { LoaderIcon } from "lucide-react";

const Loading = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      await getSession();
      setIsLoading(false);
    };
    checkSession();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderIcon className="animate-spin h-32 w-32 text-primary" />
      </div>
    );
  }

  return <>{children}</>;
};

export default Loading;
