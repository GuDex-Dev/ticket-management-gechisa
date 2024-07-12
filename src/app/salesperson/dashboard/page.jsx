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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import CustomAsyncSelect from "@/components/formsElements/CustomAsyncSelect";
import { useSalespersonForm } from "./hooks";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

function SalespersonPage() {
  const {
    searchForm,
    registerForm,
    originCity,
    isRegisterFormEnabled,
    isSellButtonEnabled,
    trips,
    selectedTrip,
    setSelectedTrip,
    handleSearchClient,
    handleRegisterClient,
    handleDestinationCitySelect,
    handleSellTicket,
    loadDestinationCityOptions,
    isLoading,
    options
  } = useSalespersonForm();

  return (
    <Card className="mx-auto w-10/12 min-w-[calc(35vw)]">
      <CardHeader>
        <CardTitle>Vender Boleto</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...searchForm}>
          <form
            onSubmit={searchForm.handleSubmit(handleSearchClient)}
            className="space-y-4"
          >
            <FormField
              control={searchForm.control}
              name="dni"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNI del Cliente</FormLabel>
                  <FormControl>
                    <Input placeholder="00000001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Buscar Cliente
            </Button>
          </form>
        </Form>

        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(handleRegisterClient)}
            className="space-y-4"
          >
            <FormField
              control={registerForm.control}
              name="dni"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormLabel>DNI</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!isRegisterFormEnabled}
                      placeholder="00000001"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!isRegisterFormEnabled}
                      placeholder="Nombre"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellidos</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!isRegisterFormEnabled}
                      placeholder="Apellido"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!isRegisterFormEnabled}
                      placeholder="Dirección"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!isRegisterFormEnabled}
                      placeholder="correo@ejemplo.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      disabled={!isRegisterFormEnabled}
                      placeholder="000000001"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={!isRegisterFormEnabled}
              type="submit"
              className="w-full"
            >
              Registrar Cliente
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardContent>
        <Form {...registerForm}>
          <form className="space-y-4">
            <FormField
              control={registerForm.control}
              name="destination_city_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ciudad de Destino</FormLabel>
                  <FormControl>
                    <CustomAsyncSelect
                      field={field}
                      loadOptions={loadDestinationCityOptions}
                      defaultOptions={isLoading ? [] : options.destination_city}
                      onChange={(selected) => {
                        handleDestinationCitySelect(selected);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>

      <DataTable
        columns={columns}
        data={trips}
        updateSelectedTrip={setSelectedTrip}
      />
      <Button
        className="mt-4 w-full"
        onClick={handleSellTicket}
        disabled={!isSellButtonEnabled || !selectedTrip}
      >
        Vender Boleto
      </Button>
    </Card>
  );
}

export default SalespersonPage;
