import { create } from "zustand";

interface BrandFormStore {
  isSubmitting: boolean;
  error: string | null;
  setIsSubmitting: (isSubmitting: boolean) => void;
  setError: (error: string | null) => void;
  resetState: () => void;
}

export const useBrandFormStore = create<BrandFormStore>((set) => ({
  isSubmitting: false,
  error: null,
  setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  setError: (error) => set({ error }),
  resetState: () => set({ isSubmitting: false, error: null }),
}));
