import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, registerSchema } from "./validation";
import {
  apiSearchClient,
  apiRegisterClient,
  apiGetDestinationCities,
  apiGetTripsByRoute,
  apiSellTicket,
} from "./api";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { set } from "date-fns";

export const useSalespersonForm = () => {
  const { data: sessionData } = useSession();
  const originCity = {
    value: sessionData?.user?.city?.id,
    label: sessionData?.user?.city?.name,
  };
  const salespersonId = sessionData?.user?.id;

  const [options, setOptions] = useState({
    destination_city: [],
  });

  const searchForm = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      dni: "",
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      dni: "",
      first_name: "",
      last_name: "",
      address: "",
      email: "",
      phone: "",
    },
  });

  const [isRegisterFormEnabled, setIsRegisterFormEnabled] = useState(false);
  const [isSellButtonEnabled, setIsSellButtonEnabled] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDestinationCity, setSelectedDestinationCity] = useState(null);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const result = await apiGetDestinationCities(originCity.value);

        const formattedOptions = {
          destination_city: result.data.map((city) => ({
            value: city.destination_city_id,
            label: city.destination_city_name,
          })),
        };

        setOptions(formattedOptions);
        setIsLoading(false);
      } catch (error) {
        toast.error("Error loading destination cities: " + error.message);
        console.error("Error loading destination cities:", error);
      }
    };
    loadOptions();
  }, [sessionData]);

  const handleSearchClient = async (data) => {
    try {
      const { data: result } = await apiSearchClient(data.dni);
      if (result.StatusCode === 0) {
        const { first_name, last_name, email, address, phone } = result;
        registerForm.setValue("dni", data.dni);
        registerForm.setValue("first_name", first_name);
        registerForm.setValue("last_name", last_name);
        registerForm.setValue("email", email);
        registerForm.setValue("address", address);
        registerForm.setValue("phone", phone);
        setClientId(`CLI${data.dni}`);
        setIsRegisterFormEnabled(false);
        setIsSellButtonEnabled(true);
        toast.success(result.Message);
      } else if (result.StatusCode === 1) {
        registerForm.reset({
          dni: data.dni,
        });
        toast.error(result.Message);
        setIsRegisterFormEnabled(true);
        setIsSellButtonEnabled(false);
      } else {
        toast.error(result.ErrorMessage);
      }
    } catch (error) {
      toast.error("Error al buscar el cliente");
      console.error("Error searching client:", error);
    }
  };

  const handleRegisterClient = async (data) => {
    try {
      const { data: result } = await apiRegisterClient(data);
      if (result.StatusCode === 0) {
        console.log(data);
        toast.success(result.Message);
        setIsRegisterFormEnabled(false);
        setIsSellButtonEnabled(true);
        setClientId(`CLI${data.dni}`);
      } else {
        toast.error(result.ErrorMessage);
      }
    } catch (error) {
      toast.error(error.Message);
      console.error("Error registering client:", error);
    }
  };

  const handleDestinationCitySelect = async (destinationCity) => {
    setSelectedTrip(null);
    const destinationCityId = destinationCity.value;
    await updateTrips(originCity.value, destinationCityId);
    setSelectedDestinationCity(destinationCity);
  };

  const updateTrips = async (originCityId, destinationCityId) => {
    try {
      const result = await apiGetTripsByRoute(originCityId, destinationCityId);
      setTrips(result.data);
    } catch (error) {
      setTrips([]);
      toast.error("No hay viajes disponibles para esta ruta");
      console.error("Error getting trips:", error);
    }
  };

  const handleSellTicket = async () => {
    try {
      await apiSellTicket(clientId, salespersonId, selectedTrip);
      toast.success("Boleto vendido exitosamente");
      searchForm.reset();
      registerForm.reset();
      updateTrips(originCity.value, selectedDestinationCity.value);
      setIsRegisterFormEnabled(false);
      setIsSellButtonEnabled(false);
    } catch (error) {
      toast.error("Error al vender boleto: " + error.message);
      console.error("Error selling ticket:", error);
    }
  };

  const loadOptionsCallback = (options, inputValue, callback) => {
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
    callback(filteredOptions);
  };

  return {
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
    loadDestinationCityOptions: (inputValue, callback) =>
      loadOptionsCallback(options.destination_city, inputValue, callback),
    isLoading,
    options,
  };
};
