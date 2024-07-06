import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./validation";
import { apiGetOptions, apiCreateTrip } from "./api";
import { toast } from "sonner";

export const useCreateTripForm = () => {
  const { data: sessionData } = useSession();

  const defaultValues = {
    origin_city_id: {
      value: sessionData?.user?.city?.id,
      label: sessionData?.user?.city?.name,
    },
    destination_city_id: null,
    bus_id: null,
    driver_id: null,
    price: null,
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const [options, setOptions] = useState({
    destination_city: [],
    bus: [],
    driver: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const onSubmit = async (data) => {
    try {
      const json = await apiCreateTrip(data);

      toast.success(json.message, {
        duration: 2000,
      });
      form.reset();
    } catch (error) {
      console.error("Error during trip creation:", error);
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

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

  const loadOptionsCallback = (options, inputValue, callback) => {
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
    callback(filteredOptions);
  };

  return {
    form,
    options,
    sessionData,
    isLoading,
    loadDestinationCityOptions: (inputValue, callback) =>
      loadOptionsCallback(options.destination_city, inputValue, callback),
    loadBusOptions: (inputValue, callback) =>
      loadOptionsCallback(options.bus, inputValue, callback),
    loadDriverOptions: (inputValue, callback) =>
      loadOptionsCallback(options.driver, inputValue, callback),
    onSubmit,
  };
};
