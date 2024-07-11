import Navbar from "@/components/Navbar";
import { ROLES } from "@/lib/utils";

export const metadata = {
  title: "Gestión de Entidades - Gechisa - Boletería",
  description: "WebApp de gestión de boletos para la empresa Gechisa",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar role={ROLES.GERENT} />
      <main className="container mx-auto mt-16 px-4 py-6">{children}</main>
    </>
  );
}
