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
import { useTheme } from "next-themes";
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
async function getInitialData() {
  const res = await fetch(
    "http://localhost:3000/api/administrator/create-trip/init"
  );
}

function CreateTripPage() {
  // * HOOKS
  const { data } = useSession();
  console.log(data);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const { toast } = useToast();
  const router = useRouter();

  // * VARIABLES
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const loadOptions = async (inputValue, callback) => {
    if (sessionLoaded) {
      // Aquí podrías hacer una llamada a la API para obtener las opciones dinámicamente
      callback([{ value: 1, label: "Lima" }]);
    } else {
      callback([{ value: 1, label: "Cargando..." }]);
    }
  };

  // * FUNCTIONS
  useEffect(() => {
    if (data) {
      setSessionLoaded(true);
    }
  }, [data]);

  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card className="max-w-max mx-auto min-w-[calc(35vw)]">
      <CardHeader>
        <CardTitle>Crear Viaje</CardTitle>
        <CardDescription>
          Los campos con <span className="text-red-500 text-xs">(*)</span> son
          obligatorios
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      loadOptions={loadOptions}
                      defaultOptions={true}
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

const selectStyles = {
  control: (baseStyles, state) => {
    const { theme } = useTheme();
    const isLightTheme = theme === "yellow-light";

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
    };
  },
  menu: (baseStyles) => {
    const { theme } = useTheme();
    const isLightTheme = theme === "yellow-light";

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
    const { theme } = useTheme();
    const isLightTheme = theme === "yellow-light";

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
    const { theme } = useTheme();
    const isLightTheme = theme === "yellow-light";

    return {
      ...baseStyles,
      color: isLightTheme ? "#6b7280" : "#9ca3af", // muted foreground color
    };
  },
  singleValue: (baseStyles) => {
    const { theme } = useTheme();
    const isLightTheme = theme === "yellow-light";

    return {
      ...baseStyles,
      color: isLightTheme ? "#111827" : "#e5e7eb", // foreground color
    };
  },
  multiValue: (baseStyles) => {
    const { theme } = useTheme();
    const isLightTheme = theme === "yellow-light";

    return {
      ...baseStyles,
      backgroundColor: isLightTheme ? "#e5e7eb" : "#4b5563", // secondary background color
      color: isLightTheme ? "#374151" : "#d1d5db", // secondary foreground color
      borderRadius: "9999px", // rounded-full
      padding: "0.25rem 0.5rem", // padding
    };
  },
  multiValueLabel: (baseStyles) => {
    const { theme } = useTheme();
    const isLightTheme = theme === "yellow-light";

    return {
      ...baseStyles,
      color: isLightTheme ? "#374151" : "#d1d5db", // secondary foreground color
    };
  },
  multiValueRemove: (baseStyles) => {
    const { theme } = useTheme();
    const isLightTheme = theme === "yellow-light";

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

export default CreateTripPage;
