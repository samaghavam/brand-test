import { create } from "zustand";

export interface Brand {
  brand_id: string;
  brand_name: string;
  background_image: string | null;
  main_image: string | null;
  brand_country: string | null;
  brand_tags: string[];
  total_contributions: number;
  total_contributed_amount: number;
}

interface BrandStore {
  brands: Brand[];
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setBrands: (brands: Brand[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useBrandStore = create<BrandStore>((set) => ({
  brands: [],
  isLoading: false,
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
  setBrands: (brands) => set({ brands }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
