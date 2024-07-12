"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import useMonthlySalesReport from "./hooks";
import { columnsMonthly } from "./columns";

function MonthlySalesReportPage() {
  const { report, isLoading } = useMonthlySalesReport();

  return (
    <Card className="mx-auto w-10/12 min-w-[calc(35vw)]">
      <CardHeader>
        <CardTitle>Informe de Ventas Mensuales</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <DataTable columns={columnsMonthly} data={report} />
        )}
      </CardContent>
    </Card>
  );
}

export default MonthlySalesReportPage;
