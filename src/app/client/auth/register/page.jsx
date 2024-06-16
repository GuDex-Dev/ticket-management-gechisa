"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";

export function RegisterClientPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const watchEmail = watch("email"); // Observa el campo de email
  const watchPhone = watch("phone"); // Observa el campo de teléfono

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/client/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const json = await res.json();
      console.log(json);
      // Aquí podrías redirigir al usuario o mostrar un mensaje de éxito
    } catch (error) {
      console.error("Error during registration:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  return (
    <Card className="max-w-max mx-auto">
      <CardHeader>
        <CardTitle>Regístrate</CardTitle>
        <CardDescription>
          Los campos con <span className="text-red-500 text-xs">(*)</span> son
          obligatorios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 sm:grid-cols-1 md:grid-cols-2"
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="dni">
                DNI <span className="text-red-500 text-xs">(*)</span>
              </Label>
              <Input
                id="dni"
                placeholder="00000001"
                {...register("dni", {
                  required: {
                    value: true,
                    message: "El DNI es obligatorio",
                  },
                  pattern: {
                    value: /^\d{8}$/,
                    message: "El DNI debe contener exactamente 8 números",
                  },
                })}
              />
              {errors?.dni?.message && (
                <span className="text-red-500 text-xs">
                  {errors.dni.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="first_name">
                Nombre <span className="text-red-500 text-xs">(*)</span>
              </Label>
              <Input
                id="first_name"
                placeholder="Nombre"
                {...register("first_name", {
                  required: "El nombre es obligatorio",
                  maxLength: {
                    value: 50,
                    message: "El nombre no puede tener más de 50 caracteres",
                  },
                })}
              />
              {errors?.first_name?.message && (
                <span className="text-red-500 text-xs">
                  {errors.first_name.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="last_name">
                Apellidos <span className="text-red-500 text-xs">(*)</span>
              </Label>
              <Input
                id="last_name"
                placeholder="Apellido"
                {...register("last_name", {
                  required: "El apellido es obligatorio",
                  maxLength: {
                    value: 50,
                    message: "El apellido no puede tener más de 50 caracteres",
                  },
                })}
              />
              {errors?.last_name?.message && (
                <span className="text-red-500 text-xs">
                  {errors.last_name.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="address">Dirección</Label>
              <Input
                id="address"
                placeholder="Dirección"
                {...register("address", {
                  maxLength: {
                    value: 50,
                    message: "La dirección no puede tener más de 50 caracteres",
                  },
                })}
              />
              {errors?.address?.message && (
                <span className="text-red-500 text-xs">
                  {errors.address.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <div>
              <Label htmlFor="email">Correo</Label>
              <Input
                id="email"
                placeholder="correo@ejemplo.com"
                type="email"
                {...register("email", {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "El correo electrónico no es válido",
                  },
                  maxLength: {
                    value: 50,
                    message: "El correo no puede tener más de 50 caracteres",
                  },
                  validate: {
                    required: (value) =>
                      value || watchPhone
                        ? true
                        : "El correo o el teléfono es obligatorio",
                  },
                })}
              />
              {errors?.email?.message && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                placeholder="000000001"
                {...register("phone", {
                  pattern: {
                    value: /^\d{9}$/,
                    message: "El teléfono debe contener exactamente 9 números",
                  },
                  validate: {
                    required: (value) =>
                      value || watchEmail
                        ? true
                        : "El correo o el teléfono es obligatorio",
                  },
                })}
              />
              {errors?.phone?.message && (
                <span className="text-red-500 text-xs">
                  {errors.phone.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="plain_password">
                Contraseña <span className="text-red-500 text-xs">(*)</span>
              </Label>
              <Input
                id="plain_password"
                placeholder="***********"
                type="password"
                {...register("plain_password", {
                  required: "La contraseña es obligatoria",
                  maxLength: {
                    value: 50,
                    message:
                      "La contraseña no puede tener más de 50 caracteres",
                  },
                })}
              />
              {errors?.plain_password?.message && (
                <span className="text-red-500 text-xs">
                  {errors.plain_password.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="password_confirmation">
                Confirmar contraseña{" "}
                <span className="text-red-500 text-xs">(*)</span>
              </Label>
              <Input
                id="password_confirmation"
                type="password"
                placeholder="***********"
                {...register("password_confirmation", {
                  required: {
                    value: true,
                    message: "La confirmación de contraseña es obligatoria",
                  },
                  maxLength: 50,
                  validate: (value) =>
                    value === watch("plain_password") ||
                    "Las contraseñas no coinciden",
                })}
              />
              {errors?.password_confirmation?.message && (
                <span className="text-red-500 text-xs">
                  {errors.password_confirmation.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col space-y-4 items-center">
            <CardDescription>
              Ya tienes una cuenta?{" "}
              <Link href="/client/auth/login" className="text-blue-500">
                Inicia sesión
              </Link>
            </CardDescription>
            <Button className="w-full" type="submit">
              Registrar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default RegisterClientPage;
