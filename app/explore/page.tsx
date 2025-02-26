"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useBrandStore } from "@/store/useBrandStore";
import { fetchBrands } from "@/utils/api";
import { Skeleton } from "@heroui/react";

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
          <div
            key={brand.brand_id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow
                     bg-neutral-white dark:bg-slate-700 
                     border-neutral-light-3 dark:border-slate-600"
          >
            <h2 className="text-xl font-semibold text-slate-800 dark:text-neutral-white">
              {brand.brand_name}
            </h2>
            {brand.brand_country && (
              <p className="text-slate-600 dark:text-neutral-light-2">
                {brand.brand_country}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              {brand.brand_tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-sm rounded-full
                           bg-neutral-light-3 dark:bg-slate-600
                           text-slate-700 dark:text-neutral-light-2"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
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
