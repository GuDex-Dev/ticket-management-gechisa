"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AlertError from "@/components/AlertError";
import { ROLES } from "@/constants";

export function FormLogin({ role = ROLES.CLIENT }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(null);

  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role === role) {
        router.push(`/${role.toLowerCase()}/dashboard`);
        setTimeout(() => {
          if (window.location.pathname !== `/${role.toLowerCase()}/dashboard`) {
            console.log("Fallback redirect using window.location");
            window.location.href = `/${role.toLowerCase()}/dashboard`;
          }
        }, 1000);
      }
    }
  }, [session, status, role, router]);

  const onSubmit = async (data) => {
    const res = await signIn("credentials", {
      DNI: data.dni,
      password: data.plain_password,
      role: role,
      redirect: false,
    });

    if (res.error) {
      setError(res.error);
    } else {
      setError(null);
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

export default FormLogin;
