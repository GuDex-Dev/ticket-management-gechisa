// hooks.js
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./validation";
import { apiRegisterDriver } from "./api";
import { toast } from "sonner";

export const useRegisterDriverForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      DNI_Person: "",
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      phone: "",
      license_number: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const json = await apiRegisterDriver(data);
      toast.success("Conductor registrado exitosamente", {
        duration: 2000,
      });
      form.reset();
    } catch (error) {
      console.error("Error durante el registro del conductor:", error);
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
