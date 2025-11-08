export type FormType = "email-capture" | "contact" | "speaking" | "quiz";

export interface FormSubmission {
  id: string;
  type: FormType;
  data: Record<string, any>;
  email: string;
  source: string; // Page URL where form was submitted
  timestamp: string;
  tags: string[];
  convertKitSubscriberId?: string;
}

export interface FormError {
  field: string;
  message: string;
}

export interface EmailCaptureFormProps {
  variant: "inline" | "modal" | "slide-in";
  leadMagnet?: string;
  tags?: string[];
  onSuccess?: () => void;
}

export interface ContactFormProps {
  type: "general" | "speaking" | "media";
  onSubmit: (data: FormData) => Promise<void>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  type: "single" | "multiple";
}

export interface QuizResults {
  score: number;
  answers: Record<string, string | string[]>;
  recommendedPath: string;
}

export interface QuizFormProps {
  questions: QuizQuestion[];
  onComplete: (results: QuizResults) => void;
}
