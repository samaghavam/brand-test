import { z } from "zod";

export const socialMediaSchema = z.object({
  name: z
    .string()
    .min(2, "Platform name must be at least 2 characters")
    .max(30, "Platform name must be less than 30 characters"),
  link: z.string().url("Please enter a valid URL"),
});

export const tagSchema = z.object({
  tag_name: z
    .string()
    .min(2, "Tag must be at least 2 characters")
    .max(20, "Tag must be less than 20 characters"),
});

export const brandFormSchema = z.object({
  brand_name: z
    .string()
    .min(2, "brand.fields.name.error.minLength")
    .max(50, "brand.fields.name.error.maxLength"),
  brand_image: z.string().url("brand.fields.image.error.invalid"),
  about_brand: z
    .string()
    .min(10, "About brand must be at least 10 characters")
    .max(500, "About brand must be less than 500 characters"),
  brand_country: z
    .string()
    .min(3, "brand.fields.country.error.minLength")
    .max(50, "brand.fields.country.error.maxLength"),
  brand_category: z
    .string()
    .min(3, "brand.fields.category.error.minLength")
    .max(50, "brand.fields.category.error.maxLength"),
  owner_id: z.string(),
  brand_tags: z.array(
    z.object({
      tag_name: z.string().min(1, "brand.fields.tags.error.required"),
    })
  ),
  social_media: z
    .array(socialMediaSchema)
    .min(1, "At least one social media link is required")
    .max(5, "Maximum 5 social media links allowed"),
});

export type BrandFormData = z.infer<typeof brandFormSchema>;
