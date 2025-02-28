"use client";

import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";

interface StepLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps?: number;
}

export function StepLayout({
  children,
  currentStep,
  totalSteps = 4,
}: StepLayoutProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleNext = () => {
    if (currentStep < totalSteps) {
      router.push(`/step/${currentStep + 1}`);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      router.push(`/step/${currentStep - 1}`);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {Array.from({ length: totalSteps }).map((_, idx) => (
            <div
              key={idx}
              className={`h-2 flex-1 mx-1 rounded ${
                idx + 1 <= currentStep
                  ? "bg-indigo-500"
                  : "bg-neutral-light-3 dark:bg-neutral-gray-2"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-neutral-gray-4 dark:text-neutral-light-1">
          {t("step.progress", { current: currentStep, total: totalSteps })}
        </p>
      </div>

      {children}

      <div className="flex justify-between mt-8">
        <Button variant="light" onClick={handleBack}>
          {t("step.back")}
        </Button>
        <Button
          color="primary"
          onClick={handleNext}
          disabled={currentStep === totalSteps}
        >
          {currentStep === totalSteps ? t("step.finish") : t("step.next")}
        </Button>
      </div>
    </div>
  );
}
