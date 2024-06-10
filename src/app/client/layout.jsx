import Navbar from "@/components/Navbar";
import { ROLES } from "@/constants";

export const metadata = {
  title: "Comprar Boleto - Gechisa - Boletería",
  description: "WebApp de gestión de boletos para la empresa Gechisa",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar role={ROLES.CLIENT} />
      <main className="container mx-auto py-6 px-4">{children}</main>
    </>
  );
}
