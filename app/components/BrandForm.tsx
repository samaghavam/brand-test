"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button, Input, Textarea } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useBrandFormStore } from "@/store/useBrandFormStore";
import { brandFormSchema } from "../types/brand";
import { BrandFormData } from "../types/brand";
import { FiTrash2, FiPlus } from "react-icons/fi";
  
export function BrandForm({ stepNumber }: { stepNumber: number }) {
  const { t } = useTranslation(["common"]);
  const router = useRouter();
  const { isSubmitting, error, setIsSubmitting, setError } =
    useBrandFormStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BrandFormData>({
    resolver: zodResolver(brandFormSchema),
    defaultValues: {
      brand_tags: [{ tag_name: "" }],
      social_media: [{ name: "", link: "" }],
    },
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "brand_tags",
  });

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control,
    name: "social_media",
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Brand Name</label>
                <Input
                  {...register("brand_name")}
                  placeholder="Enter brand name"
                  isInvalid={!!errors.brand_name}
                  errorMessage={errors.brand_name?.message}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Brand Logo URL</label>
                <Input
                  {...register("brand_image")}
                  placeholder="Enter logo URL"
                  isInvalid={!!errors.brand_image}
                  errorMessage={errors.brand_image?.message}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">About Brand</label>
                <Textarea
                  {...register("about_brand")}
                  placeholder="Describe your brand"
                  rows={4}
                  isInvalid={!!errors.about_brand}
                  errorMessage={errors.about_brand?.message}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Country</label>
                <Input
                  {...register("brand_country")}
                  placeholder="Enter country"
                  isInvalid={!!errors.brand_country}
                  errorMessage={errors.brand_country?.message}
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">Brand Tags</label>
                {tagFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`brand_tags.${index}.tag_name`)}
                      placeholder="Enter tag"
                      isInvalid={!!errors.brand_tags?.[index]?.tag_name}
                      errorMessage={
                        errors.brand_tags?.[index]?.tag_name?.message
                      }
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => removeTag(index)}
                        variant="flat"
                        size="md"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                {tagFields.length < 5 && (
                  <Button
                    type="button"
                    onClick={() => appendTag({ tag_name: "" })}
                    variant="flat"
                    className="w-full"
                  >
                    <FiPlus className="h-4 w-4 mr-2" />
                    Add Tag
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">
                  Social Media Links
                </label>
                {socialFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="grid grid-cols-1 md:grid-cols-2 gap-2"
                  >
                    <Input
                      {...register(`social_media.${index}.name`)}
                      placeholder="Platform name"
                      isInvalid={!!errors.social_media?.[index]?.name}
                      errorMessage={errors.social_media?.[index]?.name?.message}
                    />
                    <div className="flex gap-2">
                      <Input
                        {...register(`social_media.${index}.link`)}
                        placeholder="Profile URL"
                        isInvalid={!!errors.social_media?.[index]?.link}
                        errorMessage={
                          errors.social_media?.[index]?.link?.message
                        }
                      />
                      {index > 0 && (
                        <Button
                          type="button"
                          onClick={() => removeSocial(index)}
                          variant="flat"
                          size="md"
                        >
                          <FiTrash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {socialFields.length < 5 && (
                  <Button
                    type="button"
                    onClick={() => appendSocial({ name: "", link: "" })}
                    variant="flat"
                    className="w-full"
                  >
                    <FiPlus className="h-4 w-4 mr-2" />
                    Add Social Media
                  </Button>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">{/* Available for new content */}</div>
        );

      case 3:
        return (
          <div className="space-y-6">{/* Available for new content */}</div>
        );

      case 4:
        return (
          <div className="space-y-6">{/* Available for new content */}</div>
        );
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
            ? t("step.finish")
            : t("step.next")}
        </Button>
      </div>
    </form>
  );
}
