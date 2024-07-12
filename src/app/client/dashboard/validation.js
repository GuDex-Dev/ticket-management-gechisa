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
  date: z.date({
    required_error: "Este campo es obligatorio",
  }),
});
