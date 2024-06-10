import { Button } from "@/components/ui/button";
import Link from "next/link";

function HomePage() {
  return (
    <div className="flex flex-col m-auto w-96 space-y-5 mt-10">
      <Link href="/client/dashboard">
        <Button className="w-full text-2xl font-bold">Cliente</Button>
      </Link>
      <Link href="/salesperson/dashboard">
        <Button className="w-full text-2xl font-bold">Vendedor</Button>
      </Link>
      <Link href="/administrator/dashboard">
        <Button className="w-full text-2xl font-bold">Admin</Button>
      </Link>
    </div>
  );
}

export default HomePage;
