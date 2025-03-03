import { create } from "zustand";
import { StepOneData, StepTwoData } from "@/app/brand/types";

interface BrandFormStore {
  stepOneData: Partial<StepOneData>;
  stepTwoData: Partial<StepTwoData>;
  setStepOneData: (data: StepOneData) => void;
  setStepTwoData: (data: StepTwoData) => void;
  resetForm: () => void;
}

export const useBrandFormStore = create<BrandFormStore>((set) => ({
  stepOneData: {},
  stepTwoData: {},
  setStepOneData: (data) => set({ stepOneData: data }),
  setStepTwoData: (data) => set({ stepTwoData: data }),
  resetForm: () => set({ stepOneData: {}, stepTwoData: {} }),
}));
