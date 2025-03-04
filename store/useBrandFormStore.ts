import { create } from "zustand";
import { persist } from "zustand/middleware";
import { StepOneData, StepTwoData } from "@/app/brand/types";
import { useLanguageStore } from "./useLanguageStore";

interface BrandFormStore {
  stepOneData: Partial<StepOneData>;
  stepTwoData: Partial<StepTwoData>;
  isLoading: boolean;
  error: string | null;
  currentStep: number;
  setStepOneData: (data: StepOneData) => void;
  setStepTwoData: (data: StepTwoData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
  getDirection: () => "ltr" | "rtl";
  getFont: () => string;
}

export const useBrandFormStore = create<BrandFormStore>()(
  persist(
    (set, get) => ({
      stepOneData: {},
      stepTwoData: {},
      isLoading: false,
      error: null,
      currentStep: 1,
      setStepOneData: (data) => set({ stepOneData: data, error: null }),
      setStepTwoData: (data) => set({ stepTwoData: data, error: null }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetForm: () =>
        set({
          stepOneData: {},
          stepTwoData: {},
          error: null,
          isLoading: false,
          currentStep: 1,
        }),
      getDirection: () => useLanguageStore.getState().getDirection(),
      getFont: () => useLanguageStore.getState().getFont(),
    }),
    {
      name: "brand-form-storage",
    }
  )
);
