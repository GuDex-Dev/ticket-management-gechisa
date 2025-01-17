import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./validation";
import { apiGetOptions, apiCreateTrip, apiGetDefaultPrice } from "./api";
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
    datetime: new Date(),
    price: "",
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
  const [isPriceDisabled, setIsPriceDisabled] = useState(true);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const origin_city_id = sessionData?.user?.city?.id;
        if (!origin_city_id) {
          setIsLoading(false);
          return;
        }

        const result = await apiGetOptions({ origin_city_id });
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

  const handleDestinationCitySelect = async (selectedOption) => {
    try {
      const originCityId = form.getValues("origin_city_id").value;
      const destinationCityId = selectedOption.value;

      const result = await apiGetDefaultPrice({
        origin_city_id: originCityId,
        destination_city_id: destinationCityId,
      });

      if (result.ok) {
        form.setValue("price", result.data.price.toString());
        setIsPriceDisabled(false); // Enable price field after receiving price
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error getting default price:", error);
      toast.error(error.message, {
        duration: 2000,
      });
      setIsPriceDisabled(true); // Keep price field disabled in case of error
    }
  };

  const convertToUTC = (date) => {
    const dateTime = new Date(date);
    return new Date(
      dateTime.getTime() - dateTime.getTimezoneOffset() * 60000,
    ).toISOString();
  };

  const onSubmit = async (data) => {
    try {
      const formData = {
        origin_city_id: data.origin_city_id.value,
        destination_city_id: data.destination_city_id.value,
        bus_id: data.bus_id.value,
        driver_id: data.driver_id.value,
        datetime: convertToUTC(data.datetime),
        price: parseFloat(data.price),
      };

      const json = await apiCreateTrip(formData);

      toast.success(
        <div>
          <p className="text-sm font-bold opacity-90">
            Viaje creado exitosamente:
          </p>
          <p className="">Origen: {sessionData?.user?.city?.name}</p>
          <p>Destino: {data.destination_city_id.label}</p>
          <p>Bus: {data.bus_id.label}</p>
          <p>Conductor: {data.driver_id.label}</p>
          <p>Fecha: {data.datetime.toString()}</p>
          <p>Precio: {data.price}</p>
        </div>,
        {
          duration: 2000,
        },
      );
      form.reset(defaultValues);
      setIsPriceDisabled(true); // Disable price field on submit
    } catch (error) {
      console.error("Error during trip creation:", error);
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

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
    isPriceDisabled,
    handleDestinationCitySelect,
    loadDestinationCityOptions: (inputValue, callback) =>
      loadOptionsCallback(options.destination_city, inputValue, callback),
    loadBusOptions: (inputValue, callback) =>
      loadOptionsCallback(options.bus, inputValue, callback),
    loadDriverOptions: (inputValue, callback) =>
      loadOptionsCallback(options.driver, inputValue, callback),
    onSubmit,
  };
};
