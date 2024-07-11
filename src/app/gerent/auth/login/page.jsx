import FormLogin from "@/components/FormLogin";
import { ROLES } from "@/lib/utils";

function GerentLoginPage() {
  return <FormLogin role={ROLES.GERENT} />;
}

export default GerentLoginPage;
