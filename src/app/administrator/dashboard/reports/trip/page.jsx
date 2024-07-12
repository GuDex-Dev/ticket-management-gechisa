"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import useTrips from "./hooks";
import { pendingColumns, startedColumns, completedColumns } from "./columns";
import Link from "next/link";

function TripsPage() {
  const {
    tripsPending,
    tripsStarted,
    tripsCompleted,
    startTrip,
    finishTrip,
    fetchTrips,
  } = useTrips();

  return (
    <Card className="mx-auto w-10/12 min-w-[calc(35vw)]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Link href="/administrator/dashboard/trip/create">
            <Button>Crear Viaje</Button>
          </Link>
          <Button onClick={() => fetchTrips()}>Actualizar</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardTitle>Viajes Pendientes</CardTitle>
        <DataTable columns={pendingColumns(startTrip)} data={tripsPending} />

        <CardTitle>Viajes Iniciados</CardTitle>
        <DataTable columns={startedColumns(finishTrip)} data={tripsStarted} />

        <CardTitle>Viajes Completados</CardTitle>
        <DataTable columns={completedColumns} data={tripsCompleted} />
      </CardContent>
    </Card>
  );
}

export default TripsPage;
