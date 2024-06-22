import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function AlertError({ message }) {
  return (
    <Alert
      className="mx-auto min-w-[calc(35vw)] max-w-max"
      variant="destructive"
    >
      <AlertCircle className="h-5 w-5" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {message || "Ha ocurrido un error inesperado."}
      </AlertDescription>
    </Alert>
  );
}

export default AlertError;
