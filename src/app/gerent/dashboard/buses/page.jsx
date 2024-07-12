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
import { useBuses } from "./hooks"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";

const columns = [
  {
    accessorKey: "Placa", 
    header: "Placa", 
    cell: ({ row }) => <div>{row.getValue("Placa")}</div>, 
  },
  {
    accessorKey: "Asientos", 
    header: "Asientos", 
    cell: ({ row }) => <div>{row.getValue("Asientos")}</div>, 
  },
  {
    accessorKey: "Marca", 
    header: "Marca", 
    cell: ({ row }) => <div>{row.getValue("Marca")}</div>, 
  },
  {
    accessorKey: "Modelo", 
    header: "Modelo", 
    cell: ({ row }) => <div>{row.getValue("Modelo")}</div>, 
  },
  {
    accessorKey: "Estado", 
    header: "Estado", 
    cell: ({ row }) => <div>{row.getValue("Estado")}</div>, 
  },
];

function BusesTable() { 
  const { buses, isLoading, error } = useBuses(); 
  const [filter, setFilter] = useState("");

  const filteredBuses = useMemo(() => { 
    return buses.filter((bus) => { 
      const search = bus.Placa.toString().toLowerCase() + bus.Marca.toString().toLowerCase() + bus.Modelo.toString().toLowerCase(); 
      return search.includes(filter.toLowerCase());
    });
  }, [buses, filter]);

  const table = useReactTable({
    data: filteredBuses, 
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
        <Link href="/gerent/dashboard/buses/register"> 
          <Button className="w-full font-bold">Crear BUS</Button> 
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

export default BusesTable;
