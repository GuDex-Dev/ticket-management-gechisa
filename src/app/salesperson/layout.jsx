import Navbar from "@/components/Navbar";
import { ROLES } from "@/lib/utils";

export const metadata = {
  title: "Venta de Boletos - Gechisa - Boletería",
  description: "WebApp de gestión de boletos para la empresa Gechisa",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar role={ROLES.SALESPERSON} />
      <main className="container mx-auto mt-16 px-4 py-6">{children}</main>
    </>
  );
}
