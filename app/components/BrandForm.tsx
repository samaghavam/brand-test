"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useBrandFormStore } from "@/store/useBrandFormStore";
import { brandFormSchema } from "../types/brand";
import { BrandFormData } from "../types/brand";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { FormField } from "@/app/components/shared/FormField";

export function BrandForm({ stepNumber }: { stepNumber: number }) {
  const { t } = useTranslation("common");
  const { error } = useBrandFormStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<BrandFormData>({
    resolver: zodResolver(brandFormSchema),
    mode: "onChange",
    defaultValues: {
      brand_tags: [{ tag_name: "" }],
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

  const onSubmit = (data: BrandFormData) => {
    if (isValid) {
      // Save form data to store
      useBrandFormStore.setState((state) => ({ ...state, formData: data }));
      // Move to next step
      if (stepNumber < 4) {
        window.location.href = `/step/${stepNumber + 1}`;
      }
    }
  };

  // Render different form fields based on step number
  const renderStepFields = () => {
    switch (stepNumber) {
      case 1:
        return (      
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-secondary">
                {t("brand.title")}
              </h1>
              <h2 className="text-2xl font-semibold text-neutral-gray-1">
                {t("brand.subtitle")}
              </h2>
              <p className="text-neutral-gray-4 text-lg">
                {t("brand.description")}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label={t("brand.fields.name.label")}
                  name="brand_name"
                  placeholder={t("brand.fields.name.placeholder")}
                  register={register}
                  error={
                    errors.brand_name?.message
                      ? t(errors.brand_name.message)
                      : ""
                  }
                />

                <FormField
                  label={t("brand.fields.image.label")}
                  name="brand_image"
                  placeholder={t("brand.fields.image.placeholder")}
                  register={register}
                  error={
                    errors.brand_image?.message
                      ? t(errors.brand_image.message)
                      : ""
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  label={t("brand.fields.country.label")}
                  name="brand_country"
                  placeholder={t("brand.fields.country.placeholder")}
                  register={register}
                  error={
                    errors.brand_country?.message
                      ? t(errors.brand_country.message)
                      : ""
                  }
                />

                <FormField
                  label={t("brand.fields.category.label")}
                  name="brand_category"
                  placeholder={t("brand.fields.category.placeholder")}
                  register={register}
                  error={
                    errors.brand_category?.message
                      ? t(errors.brand_category.message)
                      : ""
                  }
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium">
                  {t("brand.fields.tags.label")}
                </label>
                <div className="text-xs text-gray-500">
                  {t("brand.fields.tags.hint")}
                </div>
                {tagFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`brand_tags.${index}.tag_name`)}
                      placeholder={t("brand.fields.tags.placeholder")}
                      isInvalid={!!errors.brand_tags?.[index]?.tag_name}
                      errorMessage={t(
                        errors.brand_tags?.[index]?.tag_name?.message || ""
                      )}
                      variant="bordered"
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
                    {t("brand.fields.tags.addButton")}
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {renderStepFields()}
      {error && <div className="text-status-error text-sm">{error}</div>}
      <div className="flex justify-end space-x-4">
        <Button
          type="submit"
          color="primary"
          className="w-full md:w-auto"
        >
          {t("step.next")}
        </Button>
      </div>
    </form>
  );
}
