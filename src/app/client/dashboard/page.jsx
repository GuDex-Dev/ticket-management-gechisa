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
import CustomAsyncSelect from "@/components/formsElements/CustomAsyncSelect";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DatePicker from "@/components/formsElements/DatePicker";
import { useBuyTicketForm } from "./hooks";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

function BuyTicketPage() {
  const {
    form,
    options,
    trips,
    isLoading,
    isDestinationDisabled,
    isDateDisabled,
    isUpdateDisabled,
    loadOriginCityOptions,
    loadDestinationCityOptions,
    handleOriginCitySelect,
    handleDestinationCitySelect,
    updateTripTable,
  } = useBuyTicketForm();

  return (
    <Card className="mx-auto w-auto min-w-[calc(35vw)] max-w-max">
      <CardHeader>
        <CardTitle>Comprar Boleto</CardTitle>
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
                    <CustomAsyncSelect
                      field={field}
                      loadOptions={loadOriginCityOptions}
                      defaultOptions={isLoading ? [] : options.origin_city}
                      isLoading={isLoading}
                      onChange={(selected) => {
                        handleOriginCitySelect(selected);
                      }}
                    />
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
                      isDisabled={isDestinationDisabled}
                      onChange={(selected) =>
                        handleDestinationCitySelect(selected)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl>
                    <DatePicker {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Buscar Viajes</Button>
            <Button
              type="button"
              disabled={isUpdateDisabled}
              onClick={form.handleSubmit(onSubmit)}
            >
              Actualizar
            </Button>
          </form>
        </Form>
      </CardContent>
      <DataTable columns={columns} data={trips} />
      <Button
        className="mt-4 w-full"
        onClick={() => {
          /* lógica para comprar boleto */
        }}
      >
        Comprar Boleto
      </Button>
    </Card>
  );
}

export default BuyTicketPage;
