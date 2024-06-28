"use client";
// * IMPORTS UI
import CustomAsyncSelect from "@/components/CustomAsyncSelect";

// * IMPORTS UTILS
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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

    console.log("api finished");
    return json;
  } catch (error) {
    throw new Error(error.message);
  }
}

// ! MAIN COMPONENT
function CreateTripPage() {
  // * HOOKS
  const { data: sessionData } = useSession();

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
        console.log("API result:", result);

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
        console.log("Formatted options:", formattedOptions);
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
    console.log("Filtered options:", filteredOptions);
    callback(filteredOptions);
  };

  return (
    <CustomAsyncSelect
      loadOptions={loadDestinationCityOptions}
      defaultOptions={isLoading ? [] : options.destination_city}
      isLoading={isLoading}
    />
  );
}

export default CreateTripPage;
