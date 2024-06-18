import FormLogin from "@/components/FormLogin";
import { ROLES } from "@/lib/utils";

function SalespersonLoginPage() {
  return <FormLogin role={ROLES.SALESPERSON} />;
}

export default SalespersonLoginPage;
