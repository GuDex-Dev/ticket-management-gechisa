"use client";
// pages/index.js
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the schema using zod
const formSchema = z.object({
  city: z
    .object({
      value: z.number().int(),
      label: z.string(),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "City is required",
    }),
});

const options = [
  { value: 1, label: "Piura" },
  { value: 2, label: "Sullana" },
  { value: 3, label: "Mancora" },
];

export default function Home() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: null,
    },
  });

  const onSubmit = (data) => {
    // Extract the integer value for the API
    const cityValue = data.city?.value;
    console.log(cityValue);
    // Make your API call here
  };

  const handleReset = () => {
    reset({
      city: null,
    });
  };

  return (
    <div>
      <h1>React Hook Form with React Select and Zod</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <div>
              <Select
                {...field}
                options={options}
                isClearable
                placeholder="Select a city"
              />
              {errors.city && (
                <p style={{ color: "red" }}>{errors.city.message}</p>
              )}
            </div>
          )}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
}
