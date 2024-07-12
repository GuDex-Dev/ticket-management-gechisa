// hooks.js
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./validation";
import { apiRegisterRoute } from "./api";
import { toast } from "sonner";

export const useRegisterRouteForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      FK_ID_Origin_City: "",
      FK_ID_Destination_City: "",
      default_price: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const json = await apiRegisterRoute(data);
      toast.success("Ruta registrada exitosamente", {
        duration: 2000,
      });
      form.reset();
    } catch (error) {
      console.error("Error during route registration:", error);
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
