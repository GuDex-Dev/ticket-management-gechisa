"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

function DashboardAdministratorPage() {
  return (
    <>
      <div className="mx-auto grid w-8/12 grid-cols-1 gap-4">
        <Link href="/administrator/reports/weekly-sells">
          <Button className="w-full text-2xl font-bold">
            Informe Ventas Semanales
          </Button>
        </Link>
        <Link href="/administrator/reports/monthly-sells">
          <Button className="w-full text-2xl font-bold">
            Informe Ventas Mensuales
          </Button>
        </Link>
        <Link href="/administrator/reports/weekly-salesperson">
          <Button className="w-full text-2xl font-bold">
            Informe Ventas Semanales por Vendedor
          </Button>
        </Link>
        <Link href="/administrator/reports/ranking-salesperson">
          <Button className="w-full text-2xl font-bold">
            Informe de Ranking de Vendedores
          </Button>
        </Link>
      </div>
    </>
  );
}

export default DashboardAdministratorPage;
