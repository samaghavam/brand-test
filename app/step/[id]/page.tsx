"use client";

import { StepLayout } from "@/components/shared/StepLayout";
import { Suspense, use } from "react";
import { ProfileCardSkeleton } from "@/components/shared/skeletons/ProfileCardSkeleton";
import { BrandForm } from "@/app/components/BrandForm";
import { useTranslation } from "react-i18next";

export default function StepPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const stepNumber = parseInt(resolvedParams.id);
  const { t } = useTranslation("step");

  return (
    <Suspense fallback={<ProfileCardSkeleton />}>
      <StepLayout currentStep={stepNumber}>
        <div className="min-h-[400px]">
          <h1 className="text-2xl font-bold mb-4">
            {t(`titles.${stepNumber}`)}
          </h1>
          <BrandForm stepNumber={stepNumber} />
        </div>
      </StepLayout>
    </Suspense>
  );
}
