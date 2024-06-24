import { Inter } from "next/font/google";
import "./globals.css";
import AppSessionContextProvider from "@/components/context/AppSessionContextProvider";
import { Toaster } from "sonner";
import Loading from "@/components/Loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gechisa - Empresa de Transporte",
  description: "WebApp de gestión de boletos para la empresa Gechisa",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppSessionContextProvider session={session}>
          <Loading>{children}</Loading>
          <Toaster richColors />
        </AppSessionContextProvider>
      </body>
    </html>
  );
}
