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
import CustomAsyncSelect from "@/components/formsElements/CustomAsyncSelect";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DateTimePicker from "@/components/formsElements/DateTimePicker";
import { useCreateTripForm } from "./hooks";

function CreateTripPage() {
  const {
    form,
    options,
    isLoading,
    loadDestinationCityOptions,
    loadBusOptions,
    loadDriverOptions,
    onSubmit,
  } = useCreateTripForm();

  return (
    <Card className="mx-auto w-auto min-w-[calc(35vw)] max-w-max">
      <CardHeader>
        <CardTitle>Crear Viaje</CardTitle>
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
              name="origin_city_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad de Origen</FormLabel>
                  <FormControl>
                    <CustomAsyncSelect field={field} isDisabled isTest />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destination_city_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad de Destino</FormLabel>
                  <FormControl>
                    <CustomAsyncSelect
                      field={field}
                      loadOptions={loadDestinationCityOptions}
                      defaultOptions={isLoading ? [] : options.destination_city}
                      isLoading={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bus_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bus</FormLabel>
                  <FormControl>
                    <CustomAsyncSelect
                      field={field}
                      loadOptions={loadBusOptions}
                      maxMenuHeight={200}
                      defaultOptions={isLoading ? [] : options.bus}
                      isLoading={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="driver_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conductor</FormLabel>
                  <FormControl>
                    <CustomAsyncSelect
                      field={field}
                      loadOptions={loadDriverOptions}
                      maxMenuHeight={100}
                      defaultOptions={isLoading ? [] : options.driver}
                      isLoading={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="datetime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha y hora programada</FormLabel>
                  <FormControl>
                    <DateTimePicker {...field} className="flex space-x-8" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      step="0.01"
                      placholder="5.00"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Crear Viaje
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default CreateTripPage;
