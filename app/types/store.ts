import { Language, Direction } from "@/store/useLanguageStore";
import { StepOneData, StepTwoData } from "@/app/brand/types";

// Common store types
export type LoadingState = {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

export type ErrorState = {
  error: string | null;
  setError: (error: string | null) => void;
};

// Brand form store types
export type BrandFormState = {
  stepOneData: Partial<StepOneData>;
  stepTwoData: Partial<StepTwoData>;
  currentStep: number;
} & LoadingState &
  ErrorState;

export type BrandFormActions = {
  setStepOneData: (data: StepOneData) => void;
  setStepTwoData: (data: StepTwoData) => void;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
  getDirection: () => Direction;
  getFont: () => string;
};

// Language store types
export type LanguageState = {
  currentLanguage: Language;
};

export type LanguageActions = {
  setLanguage: (lang: Language) => void;
  getDirection: () => Direction;
  getFont: () => string;
};
