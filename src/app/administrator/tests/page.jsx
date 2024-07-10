"use client";
// pages/index.js
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

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
  price: z
    .string()
    .regex(/^\d+(\.\d{2})?$/, "Price must be in the format 5.00")
    .nonempty("Price is required"),
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
      price: "",
    },
  });

  const onSubmit = (data) => {
    // Extract the integer value for the API
    const cityValue = data.city?.value;
    const priceValue = parseFloat(data.price);
    console.log({ city: cityValue, price: priceValue });
    // Make your API call here
  };

  const handleReset = () => {
    reset({
      city: null,
      price: "",
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
        <div>
          <label htmlFor="price">Price</label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input {...field} type="number" step="0.01" placeholder="5.00" />
            )}
          />
          {errors.price && (
            <p style={{ color: "red" }}>{errors.price.message}</p>
          )}
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
    </div>
  );
}
