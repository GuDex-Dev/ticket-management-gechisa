import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';

export const columns = [
  {
    accessorKey: 'ID',
    header: 'ID',
  },
  {
    accessorKey: 'Hora_Salida',
    header: 'Hora de Salida',
  },
  {
    accessorKey: 'Precio',
    header: 'Precio',
  },
  {
    accessorKey: 'Bus',
    header: 'Bus',
  },
  {
    accessorKey: 'Asientos',
    header: 'Asientos',
  },
  {
    accessorKey: 'Disponibles',
    header: 'Disponibles',
  },
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(value)}
      />
    ),
  },
];
