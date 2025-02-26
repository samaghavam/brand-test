"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useBrandStore } from "@/store/useBrandStore";
import { fetchBrands } from "@/utils/api";
import { Skeleton } from "@heroui/react";
import { BrandCard } from "@/components/shared/cards/BrandCard";

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const { brands, isLoading, setBrands, setLoading } = useBrandStore();
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    async function loadBrands() {
      try {
        setLoading(true);
        const data = await fetchBrands(searchTerm);
        setBrands(data);
      } catch (error) {
        console.error("Error loading brands:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBrands();
  }, [searchTerm, setBrands, setLoading]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton
            key={i}
            className="h-[200px] rounded-lg dark:bg-slate-700"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-slate-800 dark:text-neutral-white">
        {searchTerm ? `Search Results for "${searchTerm}"` : "Explore Brands"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <BrandCard key={brand.brand_id} brand={brand} />
        ))}
      </div>
      {brands.length === 0 && !isLoading && (
        <div className="text-center py-10">
          <p className="text-slate-600 dark:text-neutral-light-2">
            No brands found{searchTerm ? ` for "${searchTerm}"` : ""}
          </p>
        </div>
      )}
    </div>
  );
}
