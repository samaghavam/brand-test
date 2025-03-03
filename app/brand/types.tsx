export interface Tag {
  tag_name: string;
}

export interface SocialMedia {
  name: string;
  link: string;
}

export interface StepOneData {
  brand_name: string;
  brand_country: string;
  brand_tags: Tag[];
  brand_image: string;
}

export interface StepTwoData {
  about_brand: string;
  social_media: SocialMedia[];
}

export interface BrandFormData extends StepOneData, StepTwoData {
  owner_id: string; // Usually would come from auth
}