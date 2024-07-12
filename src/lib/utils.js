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
          "/edit": "Editar Viaje",
          "/view": {
            name: "Ver Viaje",
            children: {
              "/passenger": "Pasajeros",
              "/route": "Ruta",
            },
          },
        },
      },
      "/route": {
        name: "Rutas",
        children: {
          "/create": "Crear Ruta",
          "/edit": "Editar Ruta",
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
