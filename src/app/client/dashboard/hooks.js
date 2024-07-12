import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./validation";
import {
  apiGetCities,
  apiGetDestinations,
  apiGetTripsByRouteAndDate,
  apiBuyTicket,
} from "./api";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export const useBuyTicketForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin_city_id: null,
      destination_city_id: null,
      date: new Date(new Date().setHours(0, 0, 0, 0)),
    },
  });

  const { data: sessionData } = useSession();

  const [options, setOptions] = useState({
    origin_city: [],
    destination_city: [],
  });
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDestinationDisabled, setIsDestinationDisabled] = useState(true);

  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const result = await apiGetCities();

        const formattedOptions = {
          origin_city: result.data.map((city) => ({
            value: city.city_id,
            label: city.city_name,
          })),
        };

        console.log(formattedOptions);

        setOptions(formattedOptions);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading cities:", error);
        setIsLoading(false);
      }
    };
    loadOptions();
  }, []);

  const updateDestinationCityOptions = async (originCityId) => {
    try {
      const result = await apiGetDestinations(originCityId);

      const formattedOptions = result.data.map((city) => ({
        value: city.id,
        label: city.name,
      }));

      console.log(formattedOptions);

      setOptions((prevOptions) => ({
        ...prevOptions,
        destination_city: formattedOptions,
      }));

      if (formattedOptions.length === 0) {
        toast.error("No hay destinos disponibles para esta ciudad");
        setIsDestinationDisabled(true);
        return;
      }
      setIsDestinationDisabled(false);
    } catch (error) {
      toast.error("No hay destinos disponibles para esta ciudad");
      console.error("Error loading destination cities:", error);
    }
  };

  const handleOriginCitySelect = async (selectedOption) => {
    setIsDestinationDisabled(true);
    setTrips([]);
    form.reset({
      origin_city_id: selectedOption,
      destination_city_id: null,
      date: form.getValues("date"),
    });
    await updateDestinationCityOptions(selectedOption.value);
  };

  const handleDestinationCitySelect = async (selectedOption) => {
    setTrips([]);
    await updateTripTable(form.getValues());
  };

  const updateTripTable = async (data) => {
    try {
      console.log(convertToUTC(data.date));
      const result = await apiGetTripsByRouteAndDate(
        data.origin_city_id.value,
        data.destination_city_id.value,
        convertToUTC(data.date),
      );
      setTrips(result.data);
    } catch (error) {
      setTrips([]);
      toast.error("No hay viajes disponibles para esta ruta y fecha");
      console.error("Error getting trips:", error);
    }
  };

  const loadOptionsCallback = (options, inputValue, callback) => {
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
    callback(filteredOptions);
  };

  const convertToUTC = (date) => {
    const dateTime = new Date(date);
    return new Date(
      dateTime.getTime() - dateTime.getTimezoneOffset() * 60000,
    ).toISOString();
  };

  const handleBuyTicket = async () => {
    if (!selectedTrip) {
      toast.error("No hay viaje seleccionado");
      return;
    }
    try {
      await apiBuyTicket(sessionData?.user?.id, selectedTrip);
      toast.success("Boleto comprado exitosamente");
      updateTripTable(form.getValues());
    } catch (error) {
      toast.error("Error al comprar boleto: " + error.message);
      console.error("Error buying ticket:", error);
    }
  };

  return {
    form,
    options,
    trips,
    isLoading,
    isDestinationDisabled,
    handleOriginCitySelect,
    handleDestinationCitySelect,
    loadOriginCityOptions: (inputValue, callback) =>
      loadOptionsCallback(options.origin_city, inputValue, callback),
    loadDestinationCityOptions: (inputValue, callback) =>
      loadOptionsCallback(options.destination_city, inputValue, callback),
    updateTripTable,
    handleBuyTicket,
    selectedTrip,
    setSelectedTrip,
  };
};
