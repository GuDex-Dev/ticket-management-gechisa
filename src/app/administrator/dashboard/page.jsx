"use client";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/components/context/AppSessionContextProvider";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

function DashboardAdministratorPage() {
  const session = useSession();
  const pathname = usePathname();
  const { setNavbarOptions } = useAppContext();
  useEffect(() => {
    setNavbarOptions({
      pathname: pathname,
      options: [{ href: "/administrator/dashboard/trip", title: "Viajes" }],
    });
  }, [session]);

  return (
    <>
      <div>DashboardAdministratorPage</div>
    </>
  );
}

export default DashboardAdministratorPage;
