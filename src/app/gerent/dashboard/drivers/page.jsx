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
import { useDrivers } from "./hooks"; // ! Change
import { Button } from "@/components/ui/button";
import Link from "next/link";

const columns = [
  {
    accessorKey: " ID", // ! Change
    header: " ID", // ! Change
    cell: ({ row }) => <div>{row.getValue(" ID")}</div>, // ! Change
  },
  {
    accessorKey: "Licencia", // ! Change
    header: "Licencia", // ! Change
    cell: ({ row }) => <div>{row.getValue("Licencia")}</div>, // ! Change
  },
  {
    accessorKey: "Nombre", // ! Change
    header: "Nombre", // ! Change
    cell: ({ row }) => <div>{row.getValue("Nombre")}</div>, // ! Change
  },
  ,
  {
    accessorKey: "Apellido", // ! Change
    header: "Apellido", // ! Change
    cell: ({ row }) => <div>{row.getValue("Apellido")}</div>, // ! Change
  },
  ,
  {
    accessorKey: "Correo", // ! Change
    header: "Correo", // ! Change
    cell: ({ row }) => <div>{row.getValue("Correo")}</div>, // ! Change
  },
  ,
  {
    accessorKey: "Telefono", // ! Change
    header: "Telefono", // ! Change
    cell: ({ row }) => <div>{row.getValue("Telefono")}</div>, // ! Change
  },
  {
    accessorKey: "Direccion", // ! Change
    header: "Direccion", // ! Change
    cell: ({ row }) => <div>{row.getValue("Direccion")}</div>, // ! Change
  }
  ,
  {
    accessorKey: "Estado", // ! Change
    header: "Estado", // ! Change
    cell: ({ row }) => <div>{row.getValue("Estado")}</div>, // ! Change
  }
];

function DriverTable() { // ! Change
  const { driver, isLoading, error } = useDrivers(); // ! Change
  const [filter, setFilter] = useState("");

  const filteredDriver = useMemo(() => { // ! Change
    return driver.filter((driver) => { // ! Change
      const search = driver.Nombre.toString().toLowerCase() + driver.ID.toString()+ driver.apellido.toString()+ driver.licencia.toString(); // ! Change
      return search.includes(filter.toLowerCase());
    });
  }, [driver, filter]);

  const table = useReactTable({
    data: filteredDriver, // ! Change
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
        <Link href="/gerent/dashboard/administrator/create"> // ! Change
          <Button className="w-full font-bold">Crear Ciudad</Button> // ! Change
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

export default AdministratorTable;
