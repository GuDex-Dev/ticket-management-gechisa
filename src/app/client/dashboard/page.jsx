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
    loadOriginCityOptions,
    loadDestinationCityOptions,
    handleOriginCitySelect,
    handleDestinationCitySelect,
    updateTripTable,
    handleBuyTicket,
    setSelectedTrip,
  } = useBuyTicketForm();

  return (
    <Card className="mx-auto w-10/12 min-w-[calc(35vw)]">
      <CardHeader>
        <CardTitle>Comprar Boleto</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(updateTripTable)}
            className="space-y-4"
          >
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
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => {
                  const { onChange: onChangeField, ...rest } = field;

                  return (
                    <FormItem>
                      <FormLabel className="mr-4">Fecha:</FormLabel>
                      <FormControl>
                        <DatePicker
                          {...rest}
                          onChange={(value) => {
                            onChangeField(value);
                            if (
                              form.getValues("origin_city_id") &&
                              form.getValues("destination_city_id")
                            ) {
                              updateTripTable(form.getValues());
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button type="submit" className="mr-8">
                Actualizar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <DataTable
        columns={columns}
        data={trips}
        updateSelectedTrip={setSelectedTrip}
      />
      <Button className="mt-4 w-full" onClick={handleBuyTicket}>
        Comprar Boleto
      </Button>
    </Card>
  );
}

export default BuyTicketPage;
