"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button, Input } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useBrandFormStore } from "@/store/useBrandFormStore";
import { brandFormSchema } from "../types/brand";
import { BrandFormData } from "../types/brand";

export function BrandForm({ stepNumber }: { stepNumber: number }) {
  const t = useTranslation("step");
  const router = useRouter();
  const { isSubmitting, error, setIsSubmitting, setError } =
    useBrandFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BrandFormData>({
    resolver: zodResolver(brandFormSchema),
  });

  const onSubmit = async (data: BrandFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/brand`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Refresh-Token": localStorage.getItem("refreshToken") || "",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit brand data");
      }

      // Move to next step or finish
      if (stepNumber < 4) {
        router.push(`/step/${stepNumber + 1}`);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render different form fields based on step number
  const renderStepFields = () => {
    switch (stepNumber) {
      case 1:
        return (
          <>
            <Input
              {...register("brand_name")}
              placeholder="Brand Name"
              errorMessage={errors.brand_name?.message}
            />
            <Input
              {...register("brand_image")}
              placeholder="Brand Image URL"
              errorMessage={errors.brand_image?.message}
            />
          </>
        );
      // Add cases for other steps...
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {renderStepFields()}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div className="flex justify-between">
        {stepNumber > 1 && (
          <Button
            type="button"
            onClick={() => router.push(`/step/${stepNumber - 1}`)}
          >
            Back
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? "Loading..."
            : stepNumber === 4
            ? t.t("finish")
            : t.t("next")}
        </Button>
      </div>
    </form>
  );
}
