// validation.js
import { z } from "zod";

export const formSchema = z.object({
  FK_ID_Origin_City: z
    .string()
    .nonempty("La ciudad de origen es obligatoria")
    .refine(
      (val) => !isNaN(parseInt(val, 10)),
      "La ciudad de origen debe ser un número válido",
    ),
  FK_ID_Destination_City: z
    .string()
    .nonempty("La ciudad de destino es obligatoria")
    .refine(
      (val) => !isNaN(parseInt(val, 10)),
      "La ciudad de destino debe ser un número válido",
    ),
  default_price: z
    .string()
    .nonempty("El precio predeterminado es obligatorio")
    .refine(
      (val) => {
        const numberVal = parseFloat(val);
        return !isNaN(numberVal) && numberVal > 0;
      },
      {
        message: "El precio debe ser un número positivo",
      },
    ),
});
