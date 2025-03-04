"use client";

import { StepLayout } from "@/components/shared/StepLayout";
import { Suspense, use, useEffect } from "react";
import { ProfileCardSkeleton } from "@/components/skeletons/ProfileCardSkeleton";
import StepOne from "@/components/brand/step-one";
import StepTwo from "@/components/brand/step-two";
import StepThree from "@/components/brand/step-three";
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
  const [error, setError] = useState<string | null>(null);

  const {
    stepOneData,
    stepTwoData,
    setStepOneData,
    setStepTwoData,
    resetForm,
  } = useBrandFormStore();

  const handleStepOneSubmit = (data: StepOneData) => {
    setError(null);
    setStepOneData(data);
    router.push("/step/2");
  };

  const handleStepTwoSubmit = async (data: StepTwoData) => {
    setIsSubmitting(true);
    setError(null);
    setStepTwoData(data);

    const completeFormData: BrandFormData = {
      ...(stepOneData as StepOneData),
      ...data,
      owner_id: "12345", // In a real app, this would come from authentication
    };

    try {
      await createBrand(completeFormData);
      resetForm();
      router.push("/step/3");
    } catch (err) {
      console.error("Error submitting brand:", err);
      setError("Failed to submit brand. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setError(null);
    router.push("/step/1");
  };

  // Use useEffect for redirection to avoid React errors
  useEffect(() => {
    // Redirect to step 1 if trying to access step 2 without step 1 data
    if (stepNumber === 2 && Object.keys(stepOneData).length === 0) {
      router.push("/step/1");
    }

    // Redirect to step 1 if trying to access step 3 without completed form data
    if (stepNumber === 3 && (Object.keys(stepOneData).length === 0 || Object.keys(stepTwoData).length === 0)) {
      router.push("/step/1");
    }
  }, [stepNumber, stepOneData, stepTwoData, router]);

  return (
    <Suspense fallback={<ProfileCardSkeleton />}>
      <StepLayout currentStep={stepNumber}>
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded dark:bg-red-900 dark:text-red-100">
              {error}
            </div>
          )}
          {stepNumber === 1 ? (
            <StepOne initialData={stepOneData} onNext={handleStepOneSubmit} />
          ) : stepNumber === 2 ? (
            <StepTwo
              initialData={stepTwoData}
              onSubmit={handleStepTwoSubmit}
              onBack={handleBack}
              isSubmitting={isSubmitting}
            />
          ) : stepNumber === 3 ? (
            <StepThree />
          ) : (
            <div>Invalid step number</div>
          )}
        </div>
      </StepLayout>
    </Suspense>
  );
}