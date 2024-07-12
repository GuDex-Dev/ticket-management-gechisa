"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

function DashboardAdministratorPage() {
  return (
    <>
      <div className="mx-auto grid w-8/12 grid-cols-1 gap-4">
        <Link href="/administrator/dashboard/reports/weekly-sales">
          <Button className="w-full text-2xl font-bold">
            Informe Ventas Semanales
          </Button>
        </Link>
        <Link href="/administrator/dashboard/reports/monthly-sales">
          <Button className="w-full text-2xl font-bold">
            Informe Ventas Mensuales
          </Button>
        </Link>
        <Link href="/administrator/dashboard/reports/weekly-sales-by-salesperson">
          <Button className="w-full text-2xl font-bold">
            Informe Ventas Semanales por Vendedor
          </Button>
        </Link>
        <Link href="/administrator/dashboard/reports/sales-ranking">
          <Button className="w-full text-2xl font-bold">
            Informe de Ranking de Vendedores
          </Button>
        </Link>
      </div>
    </>
  );
}

export default DashboardAdministratorPage;
