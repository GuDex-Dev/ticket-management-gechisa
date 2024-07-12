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
import { useAdminsitrator } from "./hooks";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const columns = [
  {
    accessorKey: "ID",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("ID")}</div>,
  },
  {
    accessorKey: "Ciudad",
    header: "Ciudad",
    cell: ({ row }) => <div>{row.getValue("Ciudad")}</div>,
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

function AdministratorTable() {
  const { administrator, isLoading, error } = useAdminsitrator();
  const [filter, setFilter] = useState("");

  const filteredAdministrator = useMemo(() => {
    return administrator.filter((administrator) => {
      const search =
        administrator.Nombre.toString().toLowerCase() +
        administrator.ID.toString().toLowerCase() +
        administrator.Apellido.toString().toLowerCase();
      return search.includes(filter.toLowerCase());
    });
  }, [administrator, filter]);

  const table = useReactTable({
    data: filteredAdministrator,
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
        <Link href="/gerent/dashboard/administrators/register">
          <Button className="w-full font-bold">Crear Administrador</Button>
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
