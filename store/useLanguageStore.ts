import { create } from "zustand";
import { persist } from "zustand/middleware";
import { languageConfig } from "@/i18n/config";

type Language = "en" | "fa";

interface LanguageStore {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  getDirection: () => "ltr" | "rtl";
  getFont: () => string;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      currentLanguage: "en",
      setLanguage: (lang) => set({ currentLanguage: lang }),
      getDirection: () => languageConfig[get().currentLanguage].dir,
      getFont: () => languageConfig[get().currentLanguage].font,
    }),
    {
      name: "language-storage",
    }
  )
);
