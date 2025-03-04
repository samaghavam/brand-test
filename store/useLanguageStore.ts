import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { languageConfig } from "@/i18n/config";
import { LanguageState, LanguageActions } from "@/app/types/store";

export type Language = "en" | "fa";
export type Direction = "ltr" | "rtl";

type LanguageStore = LanguageState & LanguageActions;

const initialState: LanguageState = {
  currentLanguage: "en",
};

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      setLanguage: (lang) => set({ currentLanguage: lang }),
      getDirection: () => languageConfig[get().currentLanguage].dir as Direction,
      getFont: () => languageConfig[get().currentLanguage].font,
    }),
    {
      name: "language-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        currentLanguage: state.currentLanguage,
      }),
    }
  )
);
