'use client';

import { useState } from 'react';
import { StepOneData, StepTwoData, BrandFormData } from '@/app/brand/types';
import StepOne from './step-one';
import StepTwo from './step-two';
import { createBrand } from '@/app/brand/actions';
import { useRouter } from 'next/navigation';

export default function BrandForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<BrandFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleStepOneSubmit = (data: StepOneData) => {
    setFormData(prev => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  const handleStepTwoSubmit = async (data: StepTwoData) => {
    setIsSubmitting(true);
    
    // Combine data from both steps with a mock owner_id
    const completeFormData: BrandFormData = {
      ...formData as StepOneData,
      ...data,
      owner_id: "12345", // In a real app, this would come from authentication
    };
    
    try {
      await createBrand(completeFormData);
      // Redirect or show success message
      router.push('/brand/success'); // You would need to create this success page
    } catch (error) {
      console.error('Error submitting brand:', error);
      // Handle error (show message, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {currentStep === 1 ? (
        <StepOne 
          initialData={formData} 
          onNext={handleStepOneSubmit} 
        />
      ) : (
        <StepTwo 
          initialData={formData} 
          onSubmit={handleStepTwoSubmit} 
          onBack={handleBack}
          isSubmitting={isSubmitting}
        />
      )}
    </div>
  );
}