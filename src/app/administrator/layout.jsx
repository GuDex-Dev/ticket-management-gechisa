import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { ROLES } from "@/lib/utils";

export const metadata = {
  title: "ADMIN - Gechisa - Boletería",
  description: "WebApp de gestión de boletos para la empresa Gechisa",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Navbar role={ROLES.ADMINISTRATOR} />
      <main className="mt-16 container mx-auto py-6 px-4">{children}</main>
    </>
  );
}
