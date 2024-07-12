// validation.js
import { z } from "zod";

export const formSchema = z.object({
  ID_Bus: z
    .string()
    .length(
      6,
      "El ID del autobús debe contener exactamente 6 caracteres alfanuméricos",
    )
    .regex(
      /^[a-zA-Z0-9]{6}$/,
      "El ID del autobús debe contener exactamente 6 caracteres alfanuméricos",
    ),
  brand: z
    .string()
    .nonempty("La marca del autobús es obligatoria")
    .max(50, "La marca del autobús no puede tener más de 50 caracteres"),
  model: z
    .string()
    .nonempty("El modelo del autobús es obligatorio")
    .max(50, "El modelo del autobús no puede tener más de 50 caracteres"),
  seats_count: z
    .string()
    .nonempty("El número de asientos es obligatorio")
    .refine(
      (val) => {
        const numberVal = parseInt(val, 10);
        return !isNaN(numberVal) && numberVal > 0;
      },
      {
        message: "El número de asientos debe ser un número entero positivo",
      },
    ),
});
