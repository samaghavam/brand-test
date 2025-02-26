import { Card } from "@heroui/react";
import type { Brand } from "@/store/useBrandStore";

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Card
      className="p-4 hover:shadow-md transition-shadow relative
                bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-900/20 dark:to-slate-700
                border-neutral-light-3 dark:border-slate-600"
      radius="lg"
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
    </Card>
  );
}
