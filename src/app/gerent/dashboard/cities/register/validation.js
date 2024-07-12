// validation.js
import { z } from "zod";

export const formSchema = z.object({
  city_name: z
    .string()
    .nonempty("El nombre de la ciudad es obligatorio")
    .max(50, "El nombre de la ciudad no puede tener más de 50 caracteres"),
});
