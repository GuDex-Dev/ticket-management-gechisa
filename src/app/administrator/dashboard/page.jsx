"use client";
import { useSession } from "next-auth/react";
import { ROLES } from "@/constants";

function DashboardAdministratorPage() {
  const session = useSession();
  console.log(session);
  return (
    <>
      <div>DashboardAdministratorPage</div>
    </>
  );
}

export default DashboardAdministratorPage;
