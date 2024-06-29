"use client";
// * IMPORTS UI
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
import CustomAsyncSelect from "@/components/CustomAsyncSelect";

// * IMPORTS UTILS
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useAppContext } from "@/components/context/AppSessionContextProvider";

// * FORM VALIDATION
const formSchema = z.object({
  origin_city_id: z
    .number({ required_error: "Este campo es obligatorio" })
    .int(),
  destination_city_id: z
    .number({ required_error: "Este campo es obligatorio" })
    .int(),
  bus_id: z
    .string({
      required_error: "Este campo es obligatorio",
    })
    .regex(/^[0-9A-Za-z]{6}$/),
  driver_id: z
    .string({
      required_error: "Este campo es obligatorio",
    })
    .regex(/^DRI[0-9]{8}$/),
  datetime: z.date({
    required_error: "Este campo es obligatorio",
  }),
  price: z.number().positive("El precio debe ser positivo"),
});

// * FETCH DATA
async function apiGetOptions(origin_city_id) {
  try {
    const res = await fetch("/api/administrator/create-trip/get-options", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ origin_city_id }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message);
    }

    return json;
  } catch (error) {
    throw new Error(error.message);
  }
}

// ! MAIN COMPONENT
function CreateTripPage() {
  // * HOOKS
  const { data: sessionData } = useSession();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // * VARIABLES
  const [options, setOptions] = useState({
    destination_city: [],
    bus: [],
    driver: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  // * FUNCTIONS
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const origin_city_id = sessionData?.user?.city?.id;
        if (!origin_city_id) {
          setIsLoading(false);
          return;
        }

        const result = await apiGetOptions(origin_city_id);
        const formattedOptions = {
          destination_city: result.data.destination_city.map((city) => ({
            value: city.id,
            label: city.name,
          })),
          bus: result.data.bus.map((bus) => ({
            value: bus.placa,
            label: `${bus.placa} - ${bus.seats_count} asientos`,
          })),
          driver: result.data.driver.map((driver) => ({
            value: driver.id,
            label: `${driver.id} - ${driver.last_name}`,
          })),
        };
        setOptions(formattedOptions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading options:", error);
        setIsLoading(false);
      }
    };
    loadOptions();
  }, [sessionData]);

  const loadDestinationCityOptions = (inputValue, callback) => {
    const filteredOptions = options.destination_city.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
    callback(filteredOptions);
  };

  const loadBusOptions = (inputValue, callback) => {
    const filteredOptions = options.bus.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
    callback(filteredOptions);
  };

  const loadDriverOptions = (inputValue, callback) => {
    const filteredOptions = options.driver.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
    callback(filteredOptions);
  };

  return (
    <Card className="mx-auto min-w-[calc(35vw)] w-auto max-w-max">
      <CardHeader>
        <CardTitle>Crear Viaje</CardTitle>
        <CardDescription>
          Los campos con <span className="text-xs text-red-500">(*)</span> son
          obligatorios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit()} className="space-y-4">
            <FormField
              control={form.control}
              name="origin_city_id"
              render={() => (
                <FormItem>
                  <FormLabel>Ciudad de Origen</FormLabel>
                  <FormControl>
                    <CustomAsyncSelect
                      onChange={(value) =>
                        form.setValue("origin_city_id", value.value)
                      }
                      defaultValue={{
                        value: sessionData.user?.city?.id,
                        label: sessionData.user?.city?.name,
                      }}
                      isDisabled
                      isTest
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destination_city_id"
              render={() => (
                <FormItem>
                  <FormLabel>Ciudad de Destino</FormLabel>
                  <FormControl>
                    <CustomAsyncSelect
                      loadOptions={loadDestinationCityOptions}
                      onChange={(value) =>
                        form.setValue("destination_city_id", value.value)
                      }
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
              render={() => (
                <FormItem>
                  <FormLabel>Bus</FormLabel>
                  <FormControl>
                    <CustomAsyncSelect
                      loadOptions={loadBusOptions}
                      onChange={(value) => form.setValue("bus_id", value.value)}
                      maxMenuHeight={200}
                      defaultOptions={isLoading ? [] : options.bus}
                      isLoading={isLoading}
                      isTest
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="driver_id"
              render={() => (
                <FormItem>
                  <FormLabel>Conductor</FormLabel>
                  <FormControl>
                    <CustomAsyncSelect
                      loadOptions={loadDriverOptions}
                      onChange={(value) =>
                        form.setValue("driver_id", value.value)
                      }
                      maxMenuHeight={100}
                      defaultOptions={isLoading ? [] : options.driver}
                      isLoading={isLoading}
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
