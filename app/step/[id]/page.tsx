import { StepLayout } from "@/components/shared/StepLayout";
import { Suspense } from "react";
import { ProfileCardSkeleton } from "@/components/shared/skeletons/ProfileCardSkeleton";

export default function StepPage({ params }: { params: { id: string } }) {
  const stepNumber = parseInt(params.id);

  return (
    <Suspense fallback={<ProfileCardSkeleton />}>
      <StepLayout currentStep={stepNumber}>
        {/* Step content will go here */}
        <div className="min-h-[400px]">
          <h1 className="text-2xl font-bold mb-4">Step {stepNumber}</h1>
          {/* Add step-specific content */}
        </div>
      </StepLayout>
    </Suspense>
  );
}
