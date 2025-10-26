import type { Metadata } from 'next';
import { ContactForm } from '@/components/features/contact/contact-form';
import { ContactInfo } from '@/components/features/contact/contact-info';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    "Get in touch with the Gemini Prompt Discovery team. We'd love to hear from you!",
  openGraph: {
    title: 'Contact Us - Gemini Prompt Discovery',
    description: "Get in touch with our team. We'd love to hear from you!",
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold">Contact Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Have questions, suggestions, or just want to say hello? We&apos;d
            love to hear from you!
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
