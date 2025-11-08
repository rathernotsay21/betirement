export type MembershipTier = "free" | "premium" | "vip";

export interface MembershipTierInfo {
  id: MembershipTier;
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface SuccessStory {
  id: string;
  name: string;
  age?: number;
  story: string;
  achievement: string;
  image?: string;
  submittedAt: string;
  approved: boolean;
}

export interface SuccessStoryFormData {
  name: string;
  email: string;
  age?: string;
  achievement: string;
  story: string;
  consent: boolean;
}
