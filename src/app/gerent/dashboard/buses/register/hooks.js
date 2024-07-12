// hooks.js
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./validation";
import { apiRegisterBus } from "./api";
import { toast } from "sonner";

export const useRegisterBusForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ID_Bus: "",
      brand: "",
      model: "",
      seats_count: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const json = await apiRegisterBus(data);
      toast.success("Autobús registrado exitosamente", {
        duration: 2000,
      });
      form.reset();
    } catch (error) {
      console.error("Error during bus registration:", error);
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
