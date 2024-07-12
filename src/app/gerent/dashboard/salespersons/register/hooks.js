// hooks.js
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./validation";
import { apiRegisterSalesperson } from "./api";
import { toast } from "sonner";

export const useRegisterSalespersonForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      DNI_Person: "",
      first_name: "",
      last_name: "",
      email: "",
      address: "",
      phone: "",
      plain_password: "",
      FK_ID_City: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const json = await apiRegisterSalesperson(data);
      toast.success("Vendedor registrado exitosamente", {
        duration: 2000,
      });
      form.reset();
    } catch (error) {
      console.error("Error during salesperson registration:", error);
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
