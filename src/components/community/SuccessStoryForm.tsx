"use client";

import { useState, FormEvent } from "react";
import { Button, Input } from "@/components/ui";
import type { SuccessStoryFormData } from "@/types/community";

export function SuccessStoryForm() {
  const [formData, setFormData] = useState<SuccessStoryFormData>({
    name: "",
    email: "",
    age: "",
    achievement: "",
    story: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Partial<SuccessStoryFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<SuccessStoryFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.achievement.trim()) {
      newErrors.achievement = "Achievement is required";
    }

    if (!formData.story.trim()) {
      newErrors.story = "Story is required";
    } else if (formData.story.trim().length < 50) {
      newErrors.story = "Please share at least 50 characters";
    }

    if (!formData.consent) {
      newErrors.consent = "You must agree to share your story" as any;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/success-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "form-name": "success-story",
          name: formData.name,
          email: formData.email,
          age: formData.age || "",
          achievement: formData.achievement,
          story: formData.story,
          consent: formData.consent.toString(),
        }).toString(),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          age: "",
          achievement: "",
          story: "",
          consent: false,
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              Share Your Success Story
            </h2>
            <p className="text-xl text-neutral-600">
              Inspire others by sharing your Bitcoin retirement journey. Your
              story could be featured on our website and help others achieve
              their goals.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-8"
            name="success-story"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
          >
            {/* Netlify form fields */}
            <input type="hidden" name="form-name" value="success-story" />
            <input type="hidden" name="bot-field" />

            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-success/10 border border-success rounded-lg text-success">
                Thank you for sharing your story! We'll review it and may
                feature it on our website.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                Something went wrong. Please try again or contact us directly.
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Your Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="John Doe"
                  error={errors.name}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Email Address *
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@example.com"
                  error={errors.email}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Your Age (Optional)
                </label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  placeholder="45"
                  min="18"
                  max="120"
                />
              </div>

              <div>
                <label
                  htmlFor="achievement"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Your Achievement *
                </label>
                <Input
                  id="achievement"
                  name="achievement"
                  type="text"
                  value={formData.achievement}
                  onChange={(e) =>
                    setFormData({ ...formData, achievement: e.target.value })
                  }
                  placeholder="e.g., Retired at 48 with Bitcoin portfolio"
                  error={errors.achievement}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="story"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Your Story * (minimum 50 characters)
                </label>
                <textarea
                  id="story"
                  name="story"
                  value={formData.story}
                  onChange={(e) =>
                    setFormData({ ...formData, story: e.target.value })
                  }
                  placeholder="Share your journey: How did you discover Bitcoin? What strategies did you use? What challenges did you overcome? What advice would you give others?"
                  rows={8}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin-500 ${
                    errors.story
                      ? "border-red-500"
                      : "border-neutral-300"
                  }`}
                  required
                />
                {errors.story && (
                  <p className="mt-1 text-sm text-red-600">{errors.story}</p>
                )}
                <p className="mt-1 text-sm text-neutral-500">
                  {formData.story.length} characters
                </p>
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) =>
                    setFormData({ ...formData, consent: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 text-bitcoin-500 border-neutral-300 rounded focus:ring-bitcoin-500"
                  required
                />
                <label htmlFor="consent" className="text-sm text-neutral-700">
                  I agree to share my story publicly on the Betirement website
                  and understand it may be edited for clarity and length. *
                </label>
              </div>
              {errors.consent && (
                <p className="text-sm text-red-600">{String(errors.consent)}</p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Submitting..." : "Submit Your Story"}
              </Button>

              <p className="text-sm text-neutral-500 text-center">
                * Required fields. We'll review your submission and may contact
                you for additional details.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
