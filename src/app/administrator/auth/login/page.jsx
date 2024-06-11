import FormLogin from "@/components/FormLogin";
import { ROLES } from "@/constants";

function AdministratorLoginPage() {
  return <FormLogin role={ROLES.ADMINISTRATOR} />;
}

export default AdministratorLoginPage;
