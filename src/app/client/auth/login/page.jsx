import FormLogin from "@/components/FormLogin";
import { ROLES } from "@/lib/utils";

function ClientLoginPage() {
  return <FormLogin role={ROLES.CLIENT} />;
}

export default ClientLoginPage;
