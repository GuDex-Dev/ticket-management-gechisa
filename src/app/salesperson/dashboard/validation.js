import { z } from "zod";

export const searchSchema = z.object({
  dni: z
    .string({
      required_error: "El DNI es obligatorio",
    })
    .min(8, "El DNI debe contener exactamente 8 números")
    .max(8, "El DNI debe contener exactamente 8 números")
    .regex(/^\d{8}$/, "El DNI debe contener exactamente 8 números"),
});

export const registerSchema = z.object({
  dni: z
    .string({
      required_error: "El DNI es obligatorio",
    })
    .min(8, "El DNI debe contener exactamente 8 números")
    .max(8, "El DNI debe contener exactamente 8 números")
    .regex(/^\d{8}$/, "El DNI debe contener exactamente 8 números"),
  first_name: z
    .string({
      required_error: "El nombre es obligatorio",
    })
    .min(1, "El nombre es obligatorio")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  last_name: z
    .string({
      required_error: "El apellido es obligatorio",
    })
    .min(1, "El apellido es obligatorio")
    .max(50, "El apellido no puede tener más de 50 caracteres"),
  address: z
    .string()
    .max(50, "La dirección no puede tener más de 50 caracteres")
    .optional(),
  email: z
    .string()
    .email("El correo electrónico no es válido")
    .max(50, "El correo no puede tener más de 50 caracteres")
    .optional(),
  phone: z
    .string()
    .regex(/^\d{9}$/, "El teléfono debe contener exactamente 9 números")
    .optional(),
});