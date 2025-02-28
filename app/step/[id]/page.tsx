"use client";

import { StepLayout } from "@/components/shared/StepLayout";
import { Suspense, use } from "react";
import { ProfileCardSkeleton } from "@/components/shared/skeletons/ProfileCardSkeleton";
import { BrandForm } from "@/app/components/BrandForm";

export default function StepPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const stepNumber = parseInt(resolvedParams.id);

  return (
    <Suspense fallback={<ProfileCardSkeleton />}>
      <StepLayout currentStep={stepNumber}>
        <BrandForm stepNumber={stepNumber} />
      </StepLayout>
    </Suspense>
  );
}
