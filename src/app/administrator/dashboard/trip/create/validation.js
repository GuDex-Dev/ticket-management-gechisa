import { z } from "zod";

export const formSchema = z.object({
  origin_city_id: z
    .object({
      value: z.number().int(),
      label: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Este campo es obligatorio",
    }),
  destination_city_id: z
    .object({
      value: z.number().int(),
      label: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Este campo es obligatorio",
    }),
  bus_id: z
    .object({
      value: z.string().regex(/^[0-9A-Za-z]{6}$/),
      label: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Este campo es obligatorio",
    }),
  driver_id: z
    .object({
      value: z.string().regex(/^DRI[0-9]{8}$/),
      label: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Este campo es obligatorio",
    }),

  datetime: z.date({
    required_error: "Este campo es obligatorio",
  }),
  price: z.number().positive("El precio debe ser positivo").nullable(),
});
