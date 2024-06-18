"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useState, useContext } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export default function AppSessionContextProvider({ children, session }) {
  const [navbarOptions, setNavbarOptions] = useState(null);

  return (
    <AppContext.Provider value={{ navbarOptions, setNavbarOptions }}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </AppContext.Provider>
  );
}
