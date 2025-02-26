"use client";

import { createContext, useContext, ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/config";

const LanguageContext = createContext({});

export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider value={{}}>{children}</LanguageContext.Provider>
    </I18nextProvider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
