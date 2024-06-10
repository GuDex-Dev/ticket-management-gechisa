"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AlertError from "@/components/AlertError";
import { ROLES } from "@/constants";

export function LoginClientPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(null);

  const router = useRouter();

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      DNI: data.dni,
      password: data.plain_password,
      role: ROLES.CLIENT,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      router.push("/client/dashboard");
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      {error && <AlertError message={error} />}
      <Card className="w-[350px] mx-auto">
        <CardHeader>
          <CardTitle>Inicia Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col space-y-4"
            onSubmit={handleSubmit(onSubmit)}
          >
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

            <div className="flex flex-col space-y-4 items-center">
              <CardDescription>
                No tienes una cuenta?{" "}
                <Link href="/client/auth/register" className="text-blue-500">
                  Regístrate
                </Link>
              </CardDescription>
              <Button className="w-full" type="submit">
                Iniciar Sesión
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginClientPage;
