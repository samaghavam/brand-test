"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n/config";
import { languageConfig } from "@/i18n/config";

const LanguageContext = createContext({});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleFontChange = () => {
      const currentLang = i18n.language;
      const config = languageConfig[currentLang as keyof typeof languageConfig];

      // Update document properties
      document.documentElement.dir = config.dir;
      document.documentElement.lang = currentLang;
      document.documentElement.style.setProperty("--font-primary", config.font);

      // Force a re-render of the body
      document.body.className = document.body.className;

      console.log("Current language:", currentLang);
      console.log(
        "Current font:",
        getComputedStyle(document.documentElement).getPropertyValue(
          "--font-primary"
        )
      );
      console.log("Current direction:", document.documentElement.dir);
    };

    // Set initial language and font
    handleFontChange();

    // Listen for language changes
    i18n.on("languageChanged", handleFontChange);

    return () => {
      i18n.off("languageChanged", handleFontChange);
    };
  }, []);

  if (!mounted) return null;

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider value={{}}>{children}</LanguageContext.Provider>
    </I18nextProvider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
