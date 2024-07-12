// page.jsx
"use client";

import React, { useState, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useRoutes } from "./hooks"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";

const columns = [
  {
    accessorKey: "ID", 
    header: "ID", 
    cell: ({ row }) => <div>{row.getValue("ID")}</div>, 
  },
  {
    accessorKey: "Origen", 
    header: "Origen", 
    cell: ({ row }) => <div>{row.getValue("Origen")}</div>, 
  },
  {
    accessorKey: "Destino", 
    header: "Destino", 
    cell: ({ row }) => <div>{row.getValue("Destino")}</div>, 
  },
  {
    accessorKey: "Precio", 
    header: "Precio", 
    cell: ({ row }) => <div>{row.getValue("Precio")}</div>, 
  },
  {
    accessorKey: "Estado", 
    header: "Estado", 
    cell: ({ row }) => <div>{row.getValue("Estado")}</div>, 
  },
];

function RoutesTable() { 
  const { routes, isLoading, error } = useRoutes(); 
  const [filter, setFilter] = useState("");

  const filteredRoutes = useMemo(() => { 
    return routes.filter((route) => { 
      const search = route.Origen.toString().toLowerCase() + route.Destino.toString().toLowerCase() + route.ID.toString().toLowerCase(); 
      return search.includes(filter.toLowerCase());
    });
  }, [routes, filter]);

  const table = useReactTable({
    data: filteredRoutes, 
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full">
      <div className="flex justify-between py-4">
        <Input
          placeholder="Buscar..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
        <Link href="/gerent/dashboard/routes/register"> 
          <Button className="w-full font-bold">Crear Ruta</Button> 
        </Link>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default RoutesTable;
