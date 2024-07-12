// validation.js
import { z } from "zod";

export const formSchema = z.object({
  DNI_Person: z
    .string()
    .length(8, "El DNI debe contener exactamente 8 dígitos numéricos")
    .regex(/^\d{8}$/, "El DNI debe contener solo 8 dígitos numéricos"),
  first_name: z
    .string()
    .nonempty("El nombre es obligatorio")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  last_name: z
    .string()
    .nonempty("El apellido es obligatorio")
    .max(50, "El apellido no puede tener más de 50 caracteres"),
  email: z
    .string()
    .nonempty("El correo electrónico es obligatorio")
    .email("El correo electrónico no es válido")
    .max(50, "El correo electrónico no puede tener más de 50 caracteres"),
  address: z
    .string()
    .nonempty("La dirección es obligatoria")
    .max(50, "La dirección no puede tener más de 50 caracteres"),
  phone: z
    .string()
    .length(9, "El teléfono debe contener exactamente 9 dígitos numéricos")
    .regex(/^\d{9}$/, "El teléfono debe contener solo 9 dígitos numéricos"),
  license_number: z
    .string()
    .length(9, "El número de licencia debe contener exactamente 9 caracteres alfanuméricos")
    .regex(/^[A-Za-z0-9]{9}$/, "El número de licencia debe contener solo 9 caracteres alfanuméricos"),
});