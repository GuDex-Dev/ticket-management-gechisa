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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// * IMPORTS UTILS
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

// * FORM VALIDATION
const formSchema = z
  .object({
    dni: z
      .string({
        required_error: "El DNI es obligatorio",
      })
      .min(1, "El DNI es obligatorio")
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
    plain_password: z
      .string({
        required_error: "La contraseña es obligatoria",
      })
      .min(1, "La contraseña es obligatoria")
      .max(50, "La contraseña no puede tener más de 50 caracteres"),
    password_confirmation: z
      .string({
        required_error: "La confirmación de contraseña es obligatoria",
      })
      .min(1, "La confirmación de contraseña es obligatoria")
      .max(
        50,
        "La confirmación de contraseña no puede tener más de 50 caracteres"
      ),
  })
  .refine((data) => data.email || data.phone, {
    message: "El correo o el teléfono es obligatorio",
    path: ["phone"],
  })
  .refine((data) => data.email || data.phone, {
    message: "El correo o el teléfono es obligatorio",
    path: ["email"],
  })
  .refine((data) => data.plain_password === data.password_confirmation, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirmation"],
  });

// * FETCH API

export function RegisterClientPage() {
  // * HOOKS
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/client/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        toast({
          title: "Registro exitoso",
          className: "bg-primary shadow-md text-primary-foreground font-bold",
        });
        form.reset();
        router.push("/client/auth/login");
      } else if (res.status === 400) {
        toast({
          title: "Error en el registro",
          description: json.message,
          variant: "destructive",
        });
      } else if (res.status === 500) {
        toast({
          title: "Error interno del servidor",
          description: json.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast({
        title: "Error durante el registro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-max mx-auto min-w-[calc(35vw)]">
      <CardHeader>
        <CardTitle>Regístrate</CardTitle>
        <CardDescription>
          Los campos con <span className="text-red-500 text-xs">(*)</span> son
          obligatorios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 sm:grid-cols-1 md:grid-cols-2"
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
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre <span className="text-red-500 text-xs">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs font-normal" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Apellidos <span className="text-red-500 text-xs">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Apellido" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs font-normal" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input placeholder="Dirección" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs font-normal" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="correo@ejemplo.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-normal" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="000000001" {...field} />
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
                    Contraseña <span className="text-red-500 text-xs">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="***********"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-normal" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Confirmar contraseña{" "}
                    <span className="text-red-500 text-xs">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="***********"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-normal" />
                </FormItem>
              )}
            />

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
        </Form>
      </CardContent>
    </Card>
  );
}

export default RegisterClientPage;
