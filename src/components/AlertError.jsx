import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function AlertError({ message }) {
  return (
    <Alert className="w-[350px] mx-auto" variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {message || "Ha ocurrido un error inesperado."}
      </AlertDescription>
    </Alert>
  );
}

export default AlertError;
