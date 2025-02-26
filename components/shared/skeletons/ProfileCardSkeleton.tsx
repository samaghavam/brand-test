import { Card, Skeleton } from "@heroui/react";

export function ProfileCardSkeleton() {
  return (
    <Card
      className="flex flex-col items-center max-w-md mx-auto p-8 space-y-6"
        radius="lg"
      style={{ backgroundColor: "#9691EF" }}
    >
      {/* Icon skeleton */}
      <Skeleton className="rounded-full w-16 h-16">
        <div className="w-16 h-16 rounded-full bg-default-300" />
      </Skeleton>

      {/* Title skeleton */}
      <Skeleton className="w-3/4 rounded-lg">
        <div className="h-8 rounded-lg bg-default-300" />
      </Skeleton>

      {/* Description skeleton */}
      <div className="w-full space-y-2">
        <Skeleton className="w-full rounded-lg">
          <div className="h-4 rounded-lg bg-default-300" />
        </Skeleton>
        <Skeleton className="w-5/6 rounded-lg">
          <div className="h-4 rounded-lg bg-default-300" />
        </Skeleton>
      </div>

      {/* Button skeletons */}
      <Skeleton className="w-full rounded-lg">
        <div className="h-12 rounded-lg bg-default-300" />
      </Skeleton>

      <Skeleton className="w-1/3 rounded-lg">
        <div className="h-6 rounded-lg bg-default-300" />
      </Skeleton>
    </Card>
  );
}
