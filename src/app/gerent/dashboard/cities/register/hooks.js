// hooks.js
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./validation";
import { apiRegisterCity } from "./api";
import { toast } from "sonner";

export const useRegisterCityForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city_name: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const json = await apiRegisterCity(data);
      toast.success("Ciudad registrada exitosamente", {
        duration: 2000,
      });
      form.reset();
    } catch (error) {
      console.error("Error during city registration:", error);
      toast.error(error.message, {
        duration: 2000,
      });
    }
  };

  return {
    form,
    onSubmit,
  };
};
