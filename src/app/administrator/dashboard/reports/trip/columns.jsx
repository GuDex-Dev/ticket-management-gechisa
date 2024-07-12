import { Button } from "@/components/ui/button";

export const pendingColumns = (startTrip) => [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "Hora_Programada",
    header: "Hora Programada",
  },
  {
    accessorKey: "Origen",
    header: "Origen",
  },
  {
    accessorKey: "Destino",
    header: "Destino",
  },
  {
    accessorKey: "Estado",
    header: "Estado",
  },
  {
    accessorKey: "Precio",
    header: "Precio",
  },
  {
    accessorKey: "Bus",
    header: "Bus",
  },
  {
    accessorKey: "Conductor",
    header: "Conductor",
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => (
      <Button onClick={() => startTrip(row.original.ID)}>
        Registrar Salida
      </Button>
    ),
  },
];

export const startedColumns = (finishTrip) => [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "Hora_Salida",
    header: "Hora Salida",
  },
  {
    accessorKey: "Origen",
    header: "Origen",
  },
  {
    accessorKey: "Destino",
    header: "Destino",
  },
  {
    accessorKey: "Estado",
    header: "Estado",
  },
  {
    accessorKey: "Precio",
    header: "Precio",
  },
  {
    accessorKey: "Bus",
    header: "Bus",
  },
  {
    accessorKey: "Conductor",
    header: "Conductor",
  },
  {
    id: "acciones",
    header: "Acciones",
    cell: ({ row }) => (
      <Button onClick={() => finishTrip(row.original.ID)}>
        Registrar Llegada
      </Button>
    ),
  },
];

export const completedColumns = [
  {
    accessorKey: "ID",
    header: "ID",
  },
  {
    accessorKey: "Hora_Salida",
    header: "Hora Salida",
  },
  {
    accessorKey: "Hora_Llegada",
    header: "Hora Llegada",
  },
  {
    accessorKey: "Origen",
    header: "Origen",
  },
  {
    accessorKey: "Destino",
    header: "Destino",
  },
  {
    accessorKey: "Estado",
    header: "Estado",
  },
  {
    accessorKey: "Precio",
    header: "Precio",
  },
  {
    accessorKey: "Bus",
    header: "Bus",
  },
  {
    accessorKey: "Conductor",
    header: "Conductor",
  },
];
