"use client";

// * IMPORTS UI
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import AlertError from "@/components/AlertError";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// * IMPORTS UTILS
import { ROLES } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  dni: z
    .string({
      required_error: "El DNI es obligatorio",
    })
    .min(1, "El DNI es obligatorio")
    .regex(/^\d{8}$/, "El DNI debe contener exactamente 8 números"),
  plain_password: z
    .string({
      required_error: "La contraseña es obligatoria",
    })
    .min(1, "La contraseña es obligatoria")
    .max(50, "La contraseña no puede tener más de 50 caracteres"),
});
export function FormLogin({ role = ROLES.CLIENT }) {
  // * HOOKS
  const { data: session, status } = useSession();
  const router = useRouter();

  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // * VARIABLES
  const [error, setError] = useState(null);

  // * FUNCTIONS
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
      toast({
        title: "ÉXITO",
        description: "Inicio de sesión exitoso",
      });
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <FormField
                control={form.control}
                name="dni"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      DNI <span className="text-red-500 text-xs">(*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="00000001" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs font-normal" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="plain_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Contraseña{" "}
                      <span className="text-red-500 text-xs">(*)</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-normal" />
                  </FormItem>
                )}
              />

              <div className="flex flex-col space-y-4 items-center">
                {role === ROLES.CLIENT && (
                  <CardDescription>
                    No tienes una cuenta?{" "}
                    <Link href="/client/register" className="text-blue-500">
                      Regístrate
                    </Link>
                  </CardDescription>
                )}
                <Button className="w-full" type="submit">
                  Iniciar Sesión
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default FormLogin;
