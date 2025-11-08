'use client';

import { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Modal,
  ModalFooter,
  Input,
} from '@/src/components/ui';

export default function ComponentsDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
  };

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-2">
            UI Components Demo
          </h1>
          <p className="text-neutral-600">
            Betirement design system components showcase
          </p>
        </div>

        {/* Buttons Section */}
        <section>
          <h2 className="text-2xl font-heading font-semibold mb-4">Buttons</h2>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="primary" size="md">
                Medium
              </Button>
              <Button variant="primary" size="lg">
                Large
              </Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <Button variant="primary" loading>
                Loading
              </Button>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section>
          <h2 className="text-2xl font-heading font-semibold mb-4">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>
                  A simple card with header and content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  This is the card content area where you can place any
                  information.
                </p>
              </CardContent>
            </Card>

            <Card hover>
              <CardHeader>
                <CardTitle>Hover Card</CardTitle>
                <CardDescription>Hover to see the effect</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  This card has a hover effect with shadow and lift animation.
                </p>
              </CardContent>
            </Card>

            <Card featured hover>
              <CardHeader>
                <CardTitle>Featured Card</CardTitle>
                <CardDescription>With Bitcoin orange border</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  This card is featured with a special border color.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="primary" size="sm">
                  Learn More
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Inputs Section */}
        <section>
          <h2 className="text-2xl font-heading font-semibold mb-4">Inputs</h2>
          <div className="max-w-md space-y-4">
            <Input label="Basic Input" placeholder="Enter text..." />

            <Input
              label="Email Input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={handleEmailChange}
              error={emailError}
              required
            />

            <Input
              label="Success State"
              placeholder="Valid input"
              success
              helperText="This input is valid"
            />

            <Input
              label="With Helper Text"
              placeholder="Enter your name"
              helperText="We'll never share your information"
            />

            <Input label="Disabled Input" placeholder="Disabled" disabled />
          </div>
        </section>

        {/* Modal Section */}
        <section>
          <h2 className="text-2xl font-heading font-semibold mb-4">Modal</h2>
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Example Modal"
            size="md"
          >
            <div className="space-y-4">
              <p className="text-neutral-600">
                This is a modal with accessibility features including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-neutral-600">
                <li>Focus trap</li>
                <li>Escape key to close</li>
                <li>Click outside to close</li>
                <li>Proper ARIA attributes</li>
                <li>Focus restoration</li>
              </ul>

              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
              />

              <ModalFooter>
                <Button
                  variant="ghost"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Submit
                </Button>
              </ModalFooter>
            </div>
          </Modal>
        </section>

        {/* Color Palette Section */}
        <section>
          <h2 className="text-2xl font-heading font-semibold mb-4">
            Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="h-20 bg-bitcoin-500 rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Bitcoin Orange</p>
              <p className="text-xs text-neutral-500">#F7931A</p>
            </div>
            <div>
              <div className="h-20 bg-black rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Rich Black</p>
              <p className="text-xs text-neutral-500">#0D0D0D</p>
            </div>
            <div>
              <div className="h-20 bg-success rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Success Green</p>
              <p className="text-xs text-neutral-500">#27AE60</p>
            </div>
            <div>
              <div className="h-20 bg-trust rounded-lg mb-2"></div>
              <p className="text-sm font-medium">Trust Blue</p>
              <p className="text-xs text-neutral-500">#2E86DE</p>
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section>
          <h2 className="text-2xl font-heading font-semibold mb-4">
            Typography
          </h2>
          <div className="space-y-4">
            <div>
              <h1 className="text-5xl font-heading font-bold">
                Heading 1 - Inter
              </h1>
              <p className="text-neutral-500 text-sm">
                Font: Inter, Size: 3rem (48px)
              </p>
            </div>
            <div>
              <h2 className="text-4xl font-heading font-semibold">
                Heading 2 - Inter
              </h2>
              <p className="text-neutral-500 text-sm">
                Font: Inter, Size: 2.25rem (36px)
              </p>
            </div>
            <div>
              <p className="text-lg font-body">
                Body text - Open Sans. This is the default font for body text
                throughout the website. It provides excellent readability and a
                professional appearance.
              </p>
              <p className="text-neutral-500 text-sm">
                Font: Open Sans, Size: 1.125rem (18px)
              </p>
            </div>
          </div>
        </section>

        {/* Forms Section */}
        <section>
          <h2 className="text-3xl font-heading font-bold mb-6">
            Form Components
          </h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
                <CardDescription>
                  General contact form with Netlify Forms integration. View at{' '}
                  <a href="/contact" className="text-bitcoin-500 hover:underline">
                    /contact
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  Features: Honeypot spam protection, success/error handling, email notifications
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Booking Request Form</CardTitle>
                <CardDescription>
                  Speaking engagement booking form. View at{' '}
                  <a href="/speaking" className="text-bitcoin-500 hover:underline">
                    /speaking
                  </a>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  Features: Event details, audience size, budget selection, Netlify Forms integration
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Capture Form</CardTitle>
                <CardDescription>
                  Newsletter subscription with ConvertKit integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  Features: Multiple variants (inline, modal, slide-in), lead magnet support, tagging
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
