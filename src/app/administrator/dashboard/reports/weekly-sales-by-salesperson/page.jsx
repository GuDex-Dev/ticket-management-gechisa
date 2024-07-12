"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import useWeeklySalesReportBySalesperson from "./hooks";
import { columnsSalesperson } from "./columns";

function WeeklySalesReportBySalespersonPage() {
  const { report, isLoading } = useWeeklySalesReportBySalesperson();

  return (
    <Card className="mx-auto w-10/12 min-w-[calc(35vw)]">
      <CardHeader>
        <CardTitle>Informe de Ventas Semanal por Vendedor</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <DataTable columns={columnsSalesperson} data={report} />
        )}
      </CardContent>
    </Card>
  );
}

export default WeeklySalesReportBySalespersonPage;
