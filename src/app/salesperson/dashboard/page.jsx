"use client";
import { useSession } from "next-auth/react";
import { ROLES } from "@/constants";

function DashboardSalespersonPage() {
  const session = useSession();
  console.log(session);
  return (
    <>
      <div>DashboardSalespersonPage</div>
    </>
  );
}

export default DashboardSalespersonPage;
