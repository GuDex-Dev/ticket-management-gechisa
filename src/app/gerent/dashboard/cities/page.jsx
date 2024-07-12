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
import { useCities } from "./hooks"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";

const columns = [
  {
    accessorKey: "ID", 
    header: "ID", 
    cell: ({ row }) => <div>{row.getValue("ID")}</div>, 
  },
  {
    accessorKey: "Nombre", 
    header: "Nombre", 
    cell: ({ row }) => <div>{row.getValue("Nombre")}</div>, 
  },
];

function CitiesTable() { 
  const { cities, isLoading, error } = useCities(); 
  const [filter, setFilter] = useState("");

  const filteredCities = useMemo(() => { 
    return cities.filter((city) => { 
      const search = city.Nombre.toString().toLowerCase() + city.ID.toString().toLowerCase(); 
      return search.includes(filter.toLowerCase());
    });
  }, [cities, filter]);

  const table = useReactTable({
    data: filteredCities, 
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
        <Link href="/gerent/dashboard/cities/register"> 
          <Button className="w-full font-bold">Crear Ciudad</Button> 
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

export default CitiesTable;
