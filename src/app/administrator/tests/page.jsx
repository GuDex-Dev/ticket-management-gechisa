"use client";
// * IMPORTS UI
import CustomAsyncSelect from "@/components/CustomAsyncSelect";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  return (
    <>
      <CustomAsyncSelect
        loadOptions={loadDestinationCityOptions}
        defaultOptions={isLoading ? [] : options.destination_city}
        isLoading={isLoading}
        isTest
      />
      <br />

      <CustomAsyncSelect
        loadOptions={loadDestinationCityOptions}
        defaultOptions={isLoading ? [] : options.destination_city}
        isLoading={isLoading}
        isTest
        isDisabled
      />
      <br />
      <CustomAsyncSelect
        loadOptions={loadDestinationCityOptions}
        defaultOptions={isLoading ? [] : options.destination_city}
        isLoading={isLoading}
        isDisabled
      />
      <br />

      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <br />

      <div className="grid grid-cols-10">
        <div className="h-20 w-20 bg-background text-green-500">background</div>
        <div className="h-20 w-20 bg-foreground text-green-500">foreground</div>
        <div className="h-20 w-20 bg-card text-green-500">card</div>
        <div className="h-20 w-20 bg-card-foreground text-green-500">
          card-foreground
        </div>
        <div className="h-20 w-20 bg-popover text-green-500">popover</div>
        <div className="h-20 w-20 bg-popover-foreground text-green-500">
          popover-foreground
        </div>
        <div className="h-20 w-20 bg-primary text-green-500">primary</div>
        <div className="h-20 w-20 bg-primary-foreground text-green-500">
          primary-foreground
        </div>
        <div className="h-20 w-20 bg-secondary text-green-500">secondary</div>
        <div className="h-20 w-20 bg-secondary-foreground text-green-500">
          secondary-foreground
        </div>
        <div className="h-20 w-20 bg-muted text-green-500">muted</div>
        <div className="h-20 w-20 bg-muted-foreground text-green-500">
          muted-foreground
        </div>
        <div className="h-20 w-20 bg-accent text-green-500">accent</div>
        <div className="h-20 w-20 bg-accent-foreground text-green-500">
          accent-foreground
        </div>
        <div className="h-20 w-20 bg-destructive text-green-500">
          destructive
        </div>
        <div className="h-20 w-20 bg-destructive-foreground text-green-500">
          destructive-foreground
        </div>
        <div className="h-20 w-20 bg-border text-green-500">border</div>
        <div className="h-20 w-20 bg-input text-green-500">input</div>
        <div className="h-20 w-20 bg-ring text-green-500">ring</div>
        <div className="bg-radius h-20 w-20 text-green-500"></div>
      </div>
    </>
  );
}

export default CreateTripPage;
