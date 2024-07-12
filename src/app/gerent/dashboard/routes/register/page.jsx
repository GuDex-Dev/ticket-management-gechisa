// RegisterRoutePage.jsx
"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useRegisterRouteForm } from "./hooks";

function RegisterRoutePage() {
  const { form, onSubmit } = useRegisterRouteForm();

  return (
    <Card className="mx-auto w-auto min-w-[calc(35vw)] max-w-max">
      <CardHeader>
        <CardTitle>Registrar Ruta</CardTitle>
        <CardDescription>
          Los campos con <span className="text-xs text-red-500">(*)</span> son obligatorios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="FK_ID_Origin_City"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad de Origen <span className="text-xs text-red-500">(*)</span></FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="ID de la ciudad de origen" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="FK_ID_Destination_City"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad de Destino <span className="text-xs text-red-500">(*)</span></FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="ID de la ciudad de destino" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="default_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio Predeterminado <span className="text-xs text-red-500">(*)</span></FormLabel>
                  <FormControl>
                    <Input {...field} type="number" step="0.01" placeholder="Precio predeterminado" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Registrar Ruta
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default RegisterRoutePage;
