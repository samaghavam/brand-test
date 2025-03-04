"use client";

import { useState } from "react";
import { StepOneData, StepTwoData, BrandFormData } from "@/app/brand/types";
import StepOne from "./step-one";
import StepTwo from "./step-two";
import { createBrand } from "@/app/brand/actions";
import { useRouter } from "next/navigation";
import { useBrandFormStore } from "@/store/useBrandFormStore";
import { motion } from "framer-motion";

export default function BrandForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Use the store for form data persistence
  const {
    stepOneData,
    stepTwoData,
    setStepOneData,
    setStepTwoData,
    resetForm,
  } = useBrandFormStore();

  const handleStepOneSubmit = (data: StepOneData) => {
    setStepOneData(data);
    setCurrentStep(2);
    // Clear any previous errors
    setError(null);
  };

  const handleStepTwoSubmit = async (data: StepTwoData) => {
    setIsSubmitting(true);
    setError(null);
    setStepTwoData(data);

    // Combine data from both steps with a mock owner_id
    const completeFormData: BrandFormData = {
      ...(stepOneData as StepOneData),
      ...data,
      owner_id: "12345", // In a real app, this would come from authentication
    };

    try {
      const result = await createBrand(completeFormData);
      console.log("Brand created successfully:", result);
      // Navigate directly instead of using state
      router.push("/step/3");
      // Reset form after navigation
      resetForm();
    } catch (error) {
      console.error("Error submitting brand:", error);
      setError("Failed to submit brand. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    // Clear any previous errors
    setError(null);
  };

  // Animation variants for step transitions
  const variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              1
            </div>
            <div
              className={`h-1 w-12 ${
                currentStep > 1 ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>
          </div>
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= 2
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              2
            </div>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Form steps */}
      <motion.div
        key={currentStep}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.3 }}
      >
        {currentStep === 1 ? (
          <StepOne initialData={stepOneData} onNext={handleStepOneSubmit} />
        ) : (
          <StepTwo
            initialData={stepTwoData}
            onSubmit={handleStepTwoSubmit}
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        )}
      </motion.div>
    </div>
  );
}
