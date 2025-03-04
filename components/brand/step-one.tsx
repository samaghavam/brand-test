"use client";

import { useForm, Controller } from "react-hook-form";
import Input from "@/components/shared/input";
import Button from "@/components/shared/button";
import TagInput from "@/components/shared/tag-input";
import { StepOneData } from "@/app/brand/types";

interface StepOneProps {
  initialData?: Partial<StepOneData>;
  onNext: (data: StepOneData) => void;
}

export default function StepOne({ initialData, onNext }: StepOneProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StepOneData>({
    defaultValues: {
      brand_name: initialData?.brand_name || "",
      brand_country: initialData?.brand_country || "",
      brand_tags: initialData?.brand_tags || [],
      brand_image: initialData?.brand_image || "",
    },
  });

  const onSubmit = (data: StepOneData) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold">Brand Information</h2>
      <p className="text-gray-600">Step 1 of 2: Enter your brand details</p>

      <Controller
        name="brand_name"
        control={control}
        rules={{ required: "Brand name is required" }}
        render={({ field }) => (
          <Input
            label="Brand Name"
            placeholder="Enter your brand name"
            error={errors.brand_name?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="brand_country"
        control={control}
        rules={{ required: "Country is required" }}
        render={({ field }) => (
          <Input
            label="Country"
            placeholder="Enter brand country"
            error={errors.brand_country?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="brand_image"
        control={control}
        rules={{ required: "Brand image URL is required" }}
        render={({ field }) => (
          <Input
            label="Brand Image URL"
            placeholder="https://example.com/logo.png"
            error={errors.brand_image?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="brand_tags"
        control={control}
        rules={{
          required: "At least one tag is required",
          validate: (value) =>
            value.length > 0 || "At least one tag is required",
        }}
        render={({ field: { value, onChange } }) => (
          <TagInput
            label="Brand Tags"
            placeholder="Type a tag and press Enter"
            value={value}
            onChange={onChange}
            error={errors.brand_tags?.message}
          />
        )}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="min-w-[120px]"
        >
          Continue
        </Button>
      </div>
    </form>
  );
}
