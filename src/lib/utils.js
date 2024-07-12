import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const ROLES = {
  CLIENT: "Client",
  SALESPERSON: "Salesperson",
  ADMINISTRATOR: "Administrator",
  GERENT: "Gerent",
};

export const ROUTES = {
  "/administrator/dashboard": {
    children: {
      "/trip": {
        name: "Viajes",
        children: {
          "/create": "Crear Viaje",
        },
      },
      "/reports": {
        name: "Informes",
        children: {
          "/weekly-sales": "Ventas Semanales",
          "/monthly-sales": "Ventas Mensuales",
          "/weekly-sales-by-salesperson": "Ventas Semanales por Vendedor",
          "/sales-ranking": "Ranking Vendedores",
        },
      },
    },
  },
  "/gerent/dashboard": {
    children: {
      "/cities": {
        name: "Ciudades",
        children: {
          "/register": "Crear Ciudad",
        },
      },
      "/routes": {
        name: "Rutas",
        children: {
          "/register": "Crear Ruta",
        },
      },
      "/buses": {
        name: "Buses",
        children: {
          "/register": "Crear Bus",
        },
      },
      "/drivers": {
        name: "Conductores",
        children: {
          "/register": "Crear Conductor",
        },
      },
      administrators: {
        name: "Administradores",
        children: {
          "/register": "Crear Administrador",
        },
      },
      salespersons: {
        name: "Vendedores",
        children: {
          "/register": "Crear Vendedor",
        },
      },
    },
  },
};
