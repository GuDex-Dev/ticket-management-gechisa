import FormLogin from "@/components/FormLogin";
import { ROLES } from "@/constants";

function ClientLoginPage() {
  return <FormLogin role={ROLES.CLIENT} />;
}

export default ClientLoginPage;
