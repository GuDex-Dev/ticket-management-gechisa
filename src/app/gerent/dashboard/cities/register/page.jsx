// RegisterCityPage.jsx
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
import { useRegisterCityForm } from "./hooks";

function RegisterCityPage() {
  const { form, onSubmit } = useRegisterCityForm();

  return (
    <Card className="mx-auto w-auto min-w-[calc(35vw)] max-w-max">
      <CardHeader>
        <CardTitle>Registrar Ciudad</CardTitle>
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
              name="city_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nombre de la Ciudad{" "}
                    <span className="text-xs text-red-500">(*)</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nombre de la ciudad" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Registrar Ciudad
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default RegisterCityPage;
