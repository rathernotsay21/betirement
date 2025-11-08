/**
 * ConvertKit API Client
 * Handles email subscription and tagging functionality
 */

export interface Subscriber {
  id: number;
  email_address: string;
  state: string;
  created_at: string;
  fields: Record<string, string>;
}

export interface ConvertKitResponse {
  subscription: Subscriber;
}

export interface ConvertKitError {
  message: string;
  errors?: string[];
}

/**
 * ConvertKit API client for managing email subscribers
 */
export class ConvertKitClient {
  private apiKey: string;
  private apiSecret: string;
  private baseUrl = 'https://api.convertkit.com/v3';

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  /**
   * Add a new subscriber to ConvertKit
   * @param email - Subscriber email address
   * @param tags - Array of tag names to apply
   * @param firstName - Optional first name
   * @returns Subscriber data
   */
  async addSubscriber(
    email: string,
    tags: string[] = [],
    firstName?: string
  ): Promise<Subscriber> {
    try {
      const response = await fetch(`${this.baseUrl}/forms/${this.getFormId()}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: this.apiKey,
          email,
          first_name: firstName,
          tags: tags,
        }),
      });

      if (!response.ok) {
        const error: ConvertKitError = await response.json();
        throw new Error(error.message || 'Failed to add subscriber');
      }

      const data: ConvertKitResponse = await response.json();
      return data.subscription;
    } catch (error) {
      console.error('ConvertKit API Error:', error);
      throw error;
    }
  }

  /**
   * Tag an existing subscriber
   * @param subscriberId - ConvertKit subscriber ID
   * @param tagId - ConvertKit tag ID
   */
  async tagSubscriber(subscriberId: number, tagId: number): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/tags/${tagId}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_secret: this.apiSecret,
          email: subscriberId,
        }),
      });

      if (!response.ok) {
        const error: ConvertKitError = await response.json();
        throw new Error(error.message || 'Failed to tag subscriber');
      }
    } catch (error) {
      console.error('ConvertKit Tag Error:', error);
      throw error;
    }
  }

  /**
   * Get subscriber by email
   * @param email - Subscriber email address
   * @returns Subscriber data or null if not found
   */
  async getSubscriber(email: string): Promise<Subscriber | null> {
    try {
      const response = await fetch(
        `${this.baseUrl}/subscribers?api_secret=${this.apiSecret}&email_address=${encodeURIComponent(email)}`
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.subscribers?.[0] || null;
    } catch (error) {
      console.error('ConvertKit Get Subscriber Error:', error);
      return null;
    }
  }

  /**
   * Unsubscribe a subscriber
   * @param email - Subscriber email address
   */
  async unsubscribe(email: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/unsubscribe`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_secret: this.apiSecret,
          email,
        }),
      });

      if (!response.ok) {
        const error: ConvertKitError = await response.json();
        throw new Error(error.message || 'Failed to unsubscribe');
      }
    } catch (error) {
      console.error('ConvertKit Unsubscribe Error:', error);
      throw error;
    }
  }

  /**
   * Get the default form ID from environment
   * In production, this should be configured per form
   */
  private getFormId(): string {
    return process.env.CONVERTKIT_FORM_ID || 'default';
  }
}

/**
 * Create a ConvertKit client instance
 */
export function createConvertKitClient(): ConvertKitClient {
  const apiKey = process.env.CONVERTKIT_API_KEY;
  const apiSecret = process.env.CONVERTKIT_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error('ConvertKit API credentials not configured');
  }

  return new ConvertKitClient(apiKey, apiSecret);
}

/**
 * Tag strategy for different signup sources
 */
export const CONVERTKIT_TAGS = {
  // Source tags
  WEBSITE_HOME: 'website-home',
  WEBSITE_BLOG: 'website-blog',
  WEBSITE_RESOURCES: 'website-resources',
  WEBSITE_VIDEO: 'website-video',
  LEAD_MAGNET: 'lead-magnet',
  EXIT_INTENT: 'exit-intent',
  SLIDE_IN: 'slide-in',
  START_HERE: 'start-here',
  EMAIL_COURSE: 'email-course',
  HOMEPAGE_SLIDE_IN: 'homepage-slide-in',
  SLIDE_IN_CAPTURE: 'slide-in-capture',
  DEMO_PAGE: 'demo-page',
  
  // Interest tags
  BITCOIN: 'bitcoin',
  RETIREMENT: 'retirement',
  INVESTING: 'investing',
  
  // Engagement tags
  VIDEO_VIEWER: 'video-viewer',
  BLOG_READER: 'blog-reader',
  RESOURCE_DOWNLOADER: 'resource-downloader',
  CALCULATOR_USER: 'calculator-user',
  QUIZ_COMPLETED: 'quiz-completed',
} as const;

export type ConvertKitTag = typeof CONVERTKIT_TAGS[keyof typeof CONVERTKIT_TAGS];
