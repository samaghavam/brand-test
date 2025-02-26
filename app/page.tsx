import { ProfileCard } from "@/components/shared/cards/ProfileCard";
import { Suspense } from "react";
import { ProfileCardSkeleton } from "@/components/shared/skeletons/ProfileCardSkeleton";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20">
      <Suspense fallback={<ProfileCardSkeleton />}>
        <ProfileCard />
      </Suspense>
    </div>
  );
}
