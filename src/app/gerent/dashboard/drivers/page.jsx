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
import { useDrivers } from "./hooks";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const columns = [
  {
    accessorKey: "ID",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("ID")}</div>,
  },
  {
    accessorKey: "Licencia",
    header: "Licencia",
    cell: ({ row }) => <div>{row.getValue("Licencia")}</div>,
  },
  {
    accessorKey: "Nombre",
    header: "Nombre",
    cell: ({ row }) => <div>{row.getValue("Nombre")}</div>,
  },
  ,
  {
    accessorKey: "Apellido",
    header: "Apellido",
    cell: ({ row }) => <div>{row.getValue("Apellido")}</div>,
  },
  ,
  {
    accessorKey: "Correo",
    header: "Correo",
    cell: ({ row }) => <div>{row.getValue("Correo")}</div>,
  },
  ,
  {
    accessorKey: "Telefono",
    header: "Telefono",
    cell: ({ row }) => <div>{row.getValue("Telefono")}</div>,
  },
  {
    accessorKey: "Direccion",
    header: "Direccion",
    cell: ({ row }) => <div>{row.getValue("Direccion")}</div>,
  },
  {
    accessorKey: "Estado",
    header: "Estado",
    cell: ({ row }) => <div>{row.getValue("Estado")}</div>,
  },
];

function DriverTable() {
  const { driver, isLoading, error } = useDrivers();
  const [filter, setFilter] = useState("");

  const filteredDriver = useMemo(() => {
    return driver.filter((driver) => {
      const search =
        driver.Nombre.toString().toLowerCase() +
        driver.ID.toString().toLowerCase() +
        driver.Apellido.toString().toLowerCase() +
        driver.Licencia.toString().toLowerCase();
      return search.includes(filter.toLowerCase());
    });
  }, [driver, filter]);

  const table = useReactTable({
    data: filteredDriver,
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
        <Link href="/gerent/dashboard/drivers/register">
          <Button className="w-full font-bold">Crear Conductor</Button>
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

export default DriverTable;
