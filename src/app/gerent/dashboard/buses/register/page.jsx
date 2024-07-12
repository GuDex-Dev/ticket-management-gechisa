// RegisterBusPage.jsx
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
import { useRegisterBusForm } from "./hooks";

function RegisterBusPage() {
  const { form, onSubmit } = useRegisterBusForm();

  return (
    <Card className="mx-auto w-auto min-w-[calc(35vw)] max-w-max">
      <CardHeader>
        <CardTitle>Registrar Autobús</CardTitle>
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
              name="ID_Bus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ID del Autobús{" "}
                    <span className="text-xs text-red-500">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="ID del autobús" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Marca <span className="text-xs text-red-500">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Marca del autobús" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Modelo <span className="text-xs text-red-500">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Modelo del autobús" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seats_count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Número de Asientos{" "}
                    <span className="text-xs text-red-500">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      placeholder="Número de asientos"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Registrar Autobús
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default RegisterBusPage;
