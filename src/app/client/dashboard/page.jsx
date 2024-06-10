"use client";
import { useSession } from "next-auth/react";
import { ROLES } from "@/constants";

function DashboardClientPage() {
  const session = useSession();
  console.log(session);
  return (
    <>
      <div>DashboardClientPage</div>
    </>
  );
}

export default DashboardClientPage;
