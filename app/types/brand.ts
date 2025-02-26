import { z } from "zod";

export const socialMediaSchema = z.object({
  name: z.string().min(1),
  link: z.string().url(),
});

export const tagSchema = z.object({
  tag_name: z.string().min(1),
});

export const brandFormSchema = z.object({
  brand_name: z.string().min(2, "Brand name is required"),
  brand_image: z.string().url("Valid URL is required"),
  about_brand: z.string().min(10, "Description must be at least 10 characters"),
  brand_country: z.string().min(2, "Country is required"),
  owner_id: z.string(),
  brand_tags: z.array(tagSchema).min(1, "At least one tag is required"),
  social_media: z
    .array(socialMediaSchema)
    .min(1, "At least one social media link is required"),
});

export type BrandFormData = z.infer<typeof brandFormSchema>;
