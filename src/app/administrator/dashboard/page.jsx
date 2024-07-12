"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

function DashboardAdministratorPage() {
  return (
    <>
      <div className="mx-auto grid w-8/12 grid-cols-1 gap-4">
        <Link href="/administrator/dashboard/trip/">
          <Button className="w-full text-2xl font-bold">
            Gestionar Viajes
          </Button>
        </Link>
        <Link href="/administrator/dashboard/reports">
          <Button className="w-full text-2xl font-bold">
            Mostrar Informes
          </Button>
        </Link>
      </div>
    </>
  );
}

export default DashboardAdministratorPage;
