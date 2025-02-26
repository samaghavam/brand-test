import { Card, Skeleton } from "@heroui/react";

export function BrandCardSkeleton() {
  return (
    <Card
      className="w-full space-y-4 p-4 bg-neutral-white dark:bg-slate-700"
      radius="lg"
    >
      <Skeleton className="rounded-lg">
        <div className="h-32 rounded-lg bg-neutral-light-3 dark:bg-slate-600" />
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-4 rounded-lg bg-neutral-light-3 dark:bg-slate-600" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 rounded-lg bg-neutral-light-3 dark:bg-slate-600" />
        </Skeleton>
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="w-16 rounded-full">
              <div className="h-6 rounded-full bg-neutral-light-3 dark:bg-slate-600" />
            </Skeleton>
          ))}
        </div>
      </div>
    </Card>
  );
}
