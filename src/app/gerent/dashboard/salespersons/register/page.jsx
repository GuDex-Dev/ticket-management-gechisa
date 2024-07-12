// RegisterSalespersonPage.jsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRegisterSalespersonForm } from "./hooks";

function RegisterSalespersonPage() {
  const { form, onSubmit } = useRegisterSalespersonForm();

  return (
    <Card className="mx-auto w-auto min-w-[calc(35vw)] max-w-max">
      <CardHeader>
        <CardTitle>Registrar Vendedor</CardTitle>
        <CardDescription>
          Los campos con <span className="text-xs text-red-500">(*)</span> son
          obligatorios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="DNI_Person"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    DNI <span className="text-xs text-red-500">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="DNI de la persona" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre <span className="text-xs text-red-500">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nombre" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Apellido <span className="text-xs text-red-500">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Apellido" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-xs text-red-500">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Correo electrónico" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Dirección <span className="text-xs text-red-500">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Dirección" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Teléfono <span className="text-xs text-red-500">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Teléfono" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="plain_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Contraseña <span className="text-xs text-red-500">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Contraseña"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="FK_ID_City"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Ciudad <span className="text-xs text-red-500">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="ID de la ciudad" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Registrar Vendedor
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default RegisterSalespersonPage;
