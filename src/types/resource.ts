export type ResourceType = "pdf" | "calculator" | "template" | "checklist";

export type ResourceDifficulty = "beginner" | "intermediate" | "advanced";

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  category: string;
  difficulty: ResourceDifficulty;
  downloadUrl?: string;
  requiresEmail: boolean;
  fileSize?: string;
  pageCount?: number;
  thumbnail: string;
  tags: string[];
  downloadCount: number;
}

export interface ResourceCardProps {
  title: string;
  description: string;
  type: ResourceType;
  downloadUrl?: string;
  requiresEmail: boolean;
  difficulty: ResourceDifficulty;
}
