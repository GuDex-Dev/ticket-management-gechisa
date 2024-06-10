import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FormRoute() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Crear Ruta</CardTitle>
        <CardDescription>
          Completa los campos de la ruta a crear.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="destination_city">Ciudad de destino</Label>
              <Input id="destination_city" placeholder="Sullana" />
              <Label htmlFor="price">Precio</Label>
              <Input id="price" type="number" placeholder="5" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Create</Button>
      </CardFooter>
    </Card>
  );
}

export default FormRoute;
