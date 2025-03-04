import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { useLanguageStore } from "@/store/useLanguageStore";
import { BrandFormState, BrandFormActions } from "@/app/types/store";

type BrandFormStore = BrandFormState & BrandFormActions;

const initialState: BrandFormState = {
  stepOneData: {},
  stepTwoData: {},
  isLoading: false,
  error: null,
  currentStep: 1,
  setLoading: () => {},
  setError: () => {},
};

export const useBrandFormStore = create<BrandFormStore>()(
  persist(
    (set) => ({
      ...initialState,
      setStepOneData: (data) => set({ stepOneData: data, error: null }),
      setStepTwoData: (data) => set({ stepTwoData: data, error: null }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetForm: () => set(initialState),
      getDirection: () => useLanguageStore.getState().getDirection(),
      getFont: () => useLanguageStore.getState().getFont(),
    }),
    {
      name: "brand-form-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        stepOneData: state.stepOneData,
        stepTwoData: state.stepTwoData,
        currentStep: state.currentStep,
      }),
    }
  )
);
