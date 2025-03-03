"use client";

import { StepLayout } from "@/components/shared/StepLayout";
import { Suspense, use } from "react";
import { ProfileCardSkeleton } from "@/components/skeletons/ProfileCardSkeleton";
import StepOne from "@/components/brand/step-one";
import StepTwo from "@/components/brand/step-two";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { StepOneData, StepTwoData, BrandFormData } from "@/app/brand/types";
import { createBrand } from "@/app/brand/actions";
import { useBrandFormStore } from "@/store/useBrandFormStore";

export default function StepPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const stepNumber = parseInt(resolvedParams.id);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    stepOneData,
    stepTwoData,
    setStepOneData,
    setStepTwoData,
    resetForm,
  } = useBrandFormStore();

  const handleStepOneSubmit = (data: StepOneData) => {
    setStepOneData(data);
    router.push("/step/2");
  };

  const handleStepTwoSubmit = async (data: StepTwoData) => {
    setIsSubmitting(true);
    setStepTwoData(data);

    const completeFormData: BrandFormData = {
      ...(stepOneData as StepOneData),
      ...data,
      owner_id: "12345", // In a real app, this would come from authentication
    };

    try {
      await createBrand(completeFormData);
      resetForm();
      router.push("/brand/success");
    } catch (error) {
      console.error("Error submitting brand:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push("/step/1");
  };

  // Redirect to step 1 if trying to access step 2 without step 1 data
  if (stepNumber === 2 && Object.keys(stepOneData).length === 0) {
    router.push("/step/1");
    return null;
  }

  return (
    <Suspense fallback={<ProfileCardSkeleton />}>
      <StepLayout currentStep={stepNumber}>
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          {stepNumber === 1 ? (
            <StepOne initialData={stepOneData} onNext={handleStepOneSubmit} />
          ) : stepNumber === 2 ? (
            <StepTwo
              initialData={stepTwoData}
              onSubmit={handleStepTwoSubmit}
              onBack={handleBack}
              isSubmitting={isSubmitting}
            />
          ) : (
            <div>Invalid step number</div>
          )}
        </div>
      </StepLayout>
    </Suspense>
  );
}
