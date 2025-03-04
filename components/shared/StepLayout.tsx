import { useTranslation } from "react-i18next";

export function StepLayout({
  children,
  currentStep,
}: {
  children: React.ReactNode;
  currentStep: number;
}) {
  const { t } = useTranslation();
  const totalSteps = 3;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className=" mx-auto">
        <div className="mb-8">
          <p className="text-sm text-neutral-gray-4">
            {t("step.progress", { current: currentStep, total: totalSteps })}
          </p>
          {/* Progress bar or step indicators can go here */}
        </div>
        {children}
      </div>
    </div>
  );
}
