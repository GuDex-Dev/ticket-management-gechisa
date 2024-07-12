"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import useSalesRankingReport from "./hooks";
import { columnsRanking } from "./columns";

function SalesRankingReportPage() {
  const { report, isLoading } = useSalesRankingReport();

  return (
    <Card className="mx-auto w-10/12 min-w-[calc(35vw)]">
      <CardHeader>
        <CardTitle>Informe de Ranking de Vendedores</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <DataTable columns={columnsRanking} data={report} />
        )}
      </CardContent>
    </Card>
  );
}

export default SalesRankingReportPage;
