"use client";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/components/context/AppSessionContextProvider";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

function TripAdministratorPage() {
  const { setNavbarOptions } = useAppContext();
  const session = useSession();
  const pathname = usePathname();

  useEffect(() => {
    setNavbarOptions({
      pathname: pathname,
      options: [
        { href: "/administrator/dashboard/trip/create", title: "Crear Viaje" },
      ],
    });
  }, [session]);

  return (
    <>
      <div>TripAdministratorPage</div>
    </>
  );
}

export default TripAdministratorPage;
