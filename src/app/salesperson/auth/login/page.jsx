import FormLogin from "@/components/FormLogin";
import { ROLES } from "@/constants";

function SalespersonLoginPage() {
  return <FormLogin role={ROLES.SALESPERSON} />;
}

export default SalespersonLoginPage;
