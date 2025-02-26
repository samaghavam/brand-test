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
    .min(2, "Brand name must be at least 2 characters")
    .max(50, "Brand name must be less than 50 characters"),
  brand_image: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "Brand logo URL is required"),
  about_brand: z
    .string()
    .min(10, "About brand must be at least 10 characters")
    .max(500, "About brand must be less than 500 characters"),
  brand_country: z
    .string()
    .min(2, "Country name must be at least 2 characters")
    .max(50, "Country name must be less than 50 characters"),
  owner_id: z.string(),
  brand_tags: z
    .array(tagSchema)
    .min(1, "At least one tag is required")
    .max(5, "Maximum 5 tags allowed"),
  social_media: z
    .array(socialMediaSchema)
    .min(1, "At least one social media link is required")
    .max(5, "Maximum 5 social media links allowed"),
});

export type BrandFormData = z.infer<typeof brandFormSchema>;
