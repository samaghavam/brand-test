"use client";

import { useState } from "react";
import { StepOneData, StepTwoData, BrandFormData } from "@/app/brand/types";
import StepOne from "@/app/step/1/page";
import StepTwo from "@/app/step/2/page";
import { createBrand } from "@/app/brand/actions";
import { useBrandFormStore } from "@/store/useBrandFormStore";
import { motion } from "framer-motion";

export default function BrandForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      await createBrand(completeFormData);
      // The redirect will be handled by the createBrand function
      resetForm();
    } catch (error) {
      console.error("Error submitting brand:", error);
      setError("Failed to submit brand. Please try again.");
      setIsSubmitting(false);
      }
  };

  // Rest of the component remains the same...
}