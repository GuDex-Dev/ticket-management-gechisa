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

export const useBuyTicketForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      origin_city_id: null,
      destination_city_id: null,
      date: new Date(),
    },
  });

  const [options, setOptions] = useState({
    origin_city: [],
    destination_city: [],
  });
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDestinationDisabled, setIsDestinationDisabled] = useState(true);
  const [isDateDisabled, setIsDateDisabled] = useState(true);
  const [isUpdateDisabled, setIsUpdateDisabled] = useState(true);

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
        setIsDateDisabled(true);
        setIsUpdateDisabled(true);
        return;
      }
      setIsDestinationDisabled(false);
      setIsDateDisabled(true);
      setIsUpdateDisabled(true);
    } catch (error) {
      toast.error("No hay destinos disponibles para esta ciudad");
      console.error("Error loading destination cities:", error);
    }
  };

  const handleOriginCitySelect = async (selectedOption) => {
    setIsDestinationDisabled(true);
    setIsDateDisabled(true);
    setIsUpdateDisabled(true);
    setTrips([]);
    form.reset({
      origin_city_id: selectedOption,
      destination_city_id: null,
      date: new Date(),
    });
    await updateDestinationCityOptions(selectedOption.value);
  };

  const handleDestinationCitySelect = (selectedOption) => {
    setIsDateDisabled(false);
    setIsUpdateDisabled(false);
    setTrips([]);
  };

  const updateTripTable = async (data) => {
    try {
      const result = await apiGetTripsByRouteAndDate(
        data.origin_city_id.value,
        data.destination_city_id.value,
        data.date.toISOString().split("T")[0],
      );
      setTrips(result.data);
    } catch (error) {
      console.error("Error getting trips:", error);
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
    trips,
    isLoading,
    isDestinationDisabled,
    isDateDisabled,
    isUpdateDisabled,
    handleOriginCitySelect,
    handleDestinationCitySelect,
    loadOriginCityOptions: (inputValue, callback) =>
      loadOptionsCallback(options.origin_city, inputValue, callback),
    loadDestinationCityOptions: (inputValue, callback) =>
      loadOptionsCallback(options.destination_city, inputValue, callback),
    updateTripTable,
  };
};
