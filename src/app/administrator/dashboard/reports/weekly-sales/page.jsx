"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import useWeeklySalesReport from "./hooks";
import { columns } from "./columns";

function WeeklySalesReportPage() {
  const { report, isLoading } = useWeeklySalesReport();

  return (
    <Card className="mx-auto w-10/12 min-w-[calc(35vw)]">
      <CardHeader>
        <CardTitle>Informe de Ventas Semanales</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <DataTable columns={columns} data={report} />
        )}
      </CardContent>
    </Card>
  );
}

export default WeeklySalesReportPage;
