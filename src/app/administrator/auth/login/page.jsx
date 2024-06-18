import FormLogin from "@/components/FormLogin";
import { ROLES } from "@/lib/utils";

function AdministratorLoginPage() {
  return <FormLogin role={ROLES.ADMINISTRATOR} />;
}

export default AdministratorLoginPage;
