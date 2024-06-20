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
import AsyncSelect from "react-select/async";
import Select from "react-select";

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
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppContext } from "@/components/context/AppSessionContextProvider";
import { usePathname } from "next/navigation";

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
// async function fetchGetOptions() {

  


// ! MAIN COMPONENT
function CreateTripPage() {
  // * HOOKS
  useAppContext();
  const { data } = useSession();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  // * VARIABLES
  const selectStyles = {
    control: (baseStyles, state) => {
      const isLightTheme = document.body.className.includes("light");

      return {
        ...baseStyles,
        display: "flex",
        alignItems: "center",
        borderColor: state.isFocused
          ? isLightTheme
            ? "#fbbf24" // primary color for light theme
            : "#f59e0b" // primary color for dark theme
          : isLightTheme
            ? "#d1d5db" // input border color for light theme
            : "#a3a3a3", // input border color for dark theme
        backgroundColor: isLightTheme ? "#ffffff" : "#1f2937", // background color
        borderRadius: "0.375rem", // rounded-md
        boxShadow: state.isFocused
          ? `0 0 0 2px ${isLightTheme ? "#fbbf24" : "#f59e0b"}` // ring color
          : "none",
        padding: "0.2rem", // padding
        "&:hover": {
          borderColor: isLightTheme ? "#fbbf24" : "#f59e0b", // hover border color
        },
        ...(state.isDisabled && {
          backgroundColor: isLightTheme ? "#f9fafb" : "#374151",
          borderColor: isLightTheme ? "#e5e7eb" : "#4b5563",
          cursor: "not-allowed",
          opacity: "0.6",
        }),
      };
    },
    menu: (baseStyles) => {
      const isLightTheme = document.body.className.includes("light");

      return {
        ...baseStyles,
        backgroundColor: isLightTheme ? "#ffffff" : "#374151", // card background color
        borderColor: isLightTheme ? "#d1d5db" : "#a3a3a3", // input border color
        marginTop: "0.25rem", // margin top
        borderRadius: "0.375rem", // rounded-md
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // shadow-lg
      };
    },
    option: (baseStyles, state) => {
      const isLightTheme = document.body.className.includes("light");

      return {
        ...baseStyles,
        cursor: "pointer", // cursor-pointer
        padding: "0.2rem 0.5rem", // padding
        backgroundColor: state.isSelected
          ? isLightTheme
            ? "#fbbf24" // primary color for selected option
            : "#f59e0b" // primary color for selected option in dark theme
          : isLightTheme
            ? "#ffffff" // card background color
            : "#374151", // card background color for dark theme
        color: state.isSelected
          ? "#ffffff" // text color for selected option
          : isLightTheme
            ? "#111827" // foreground color
            : "#fbbf24", // foreground color for dark theme
        "&:hover": {
          backgroundColor: state.isFocused
            ? isLightTheme
              ? "#f3f4f6" // secondary background color for light theme
              : "#4b5563" // secondary background color for dark theme
            : isLightTheme
              ? "#ffffff" // card background color
              : "#374151", // card background color for dark theme
        },
      };
    },
    placeholder: (baseStyles) => {
      const isLightTheme = document.body.className.includes("light");

      return {
        ...baseStyles,
        color: isLightTheme ? "#6b7280" : "#9ca3af", // muted foreground color
      };
    },
    singleValue: (baseStyles) => {
      const isLightTheme = document.body.className.includes("light");

      return {
        ...baseStyles,
        color: isLightTheme ? "#111827" : "#e5e7eb", // foreground color
      };
    },
    multiValue: (baseStyles) => {
      const isLightTheme = document.body.className.includes("light");

      return {
        ...baseStyles,
        backgroundColor: isLightTheme ? "#e5e7eb" : "#4b5563", // secondary background color
        color: isLightTheme ? "#374151" : "#d1d5db", // secondary foreground color
        borderRadius: "9999px", // rounded-full
        padding: "0.25rem 0.5rem", // padding
      };
    },
    multiValueLabel: (baseStyles) => {
      const isLightTheme = document.body.className.includes("light");

      return {
        ...baseStyles,
        color: isLightTheme ? "#374151" : "#d1d5db", // secondary foreground color
      };
    },
    multiValueRemove: (baseStyles) => {
      const isLightTheme = document.body.className.includes("light");

      return {
        ...baseStyles,
        color: isLightTheme ? "#374151" : "#d1d5db", // secondary foreground color
        "&:hover": {
          backgroundColor: isLightTheme ? "#ef4444" : "#991b1b", // destructive background color
          color: "#ffffff", // destructive foreground color
        },
        borderRadius: "9999px", // rounded-full
        padding: "0.25rem", // padding
        cursor: "pointer", // cursor-pointer
      };
    },
  };

  // * FUNCTIONS
  const loadOptions = {
    origin_city_id: (inputValue, callback) => {
      callback([
        {
          value: data.user?.city?.id,
          label: data.user?.city?.name,
        },
      ]);
    },


  };

  return (
    <Card className="mx-auto min-w-[calc(35vw)] max-w-max">
      <CardHeader>
        <CardTitle>Crear Viaje</CardTitle>
        <CardDescription>
          Los campos con <span className="text-xs text-red-500">(*)</span> son
          obligatorios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit()} className="space-y-8">
            <FormField
              control={form.control}
              name="origin_city_id"
              render={() => (
                <FormItem>
                  <FormLabel>Ciudad de Origen</FormLabel>
                  <FormControl>
                    <AsyncSelect
                      styles={selectStyles}
                      onChange={(value) =>
                        form.setValue("origin_city_id", value.value)
                      }
                      loadOptions={loadOptions.origin_city_id}
                      defaultOptions
                      defaultValue={{
                        value: data.user?.city?.id,
                        label: data.user?.city?.name,
                      }}
                      isDisabled
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
                    <AsyncSelect
                      styles={selectStyles}
                      onChange={(value) =>
                        form.setValue("destination_city_id", value.value)
                      }
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
