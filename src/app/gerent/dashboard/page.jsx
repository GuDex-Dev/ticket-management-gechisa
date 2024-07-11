"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function DashboardGerentPage() {
  return (
    <>
      <div className="mx-auto grid w-10/12 grid-cols-2 grid-rows-3 gap-4">
        <Link href="/gerent/dashboard/cities">
          <Button className="w-full text-2xl font-bold">
            Gestionar Ciudades
          </Button>
        </Link>
        <Link href="/gerent/dashboard/routes">
          <Button className="w-full text-2xl font-bold">Gestionar Rutas</Button>
        </Link>
        <Link href="/gerent/dashboard/buses">
          <Button className="w-full text-2xl font-bold">Gestionar Buses</Button>
        </Link>
        <Link href="/gerent/dashboard/drivers">
          <Button className="w-full text-2xl font-bold">
            Gestionar Conductores
          </Button>
        </Link>
        <Link href="/gerent/dashboard/administrators">
          <Button className="w-full text-2xl font-bold">
            Gestionar Administradores
          </Button>
        </Link>
        <Link href="/gerent/dashboard/salespersons">
          <Button className="w-full text-2xl font-bold">
            Gestionar Vendedores
          </Button>
        </Link>
      </div>
    </>
  );
}

export default DashboardGerentPage;
