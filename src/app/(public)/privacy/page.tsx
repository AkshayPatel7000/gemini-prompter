import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for Gemini Prompt Discovery - Learn how we protect and handle your data.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none">
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">
              Information We Collect
            </h2>
            <p className="mb-4">
              We collect information you provide directly to us, such as when
              you create an account, use our services, or contact us for
              support.
            </p>
            <ul className="mb-4 list-disc pl-6">
              <li>Account information (email, username)</li>
              <li>Profile information</li>
              <li>Generated prompts and content</li>
              <li>Usage data and analytics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">
              How We Use Your Information
            </h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="mb-4 list-disc pl-6">
              <li>Provide and improve our services</li>
              <li>Personalize your experience</li>
              <li>Communicate with you about updates and features</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Information Sharing</h2>
            <p className="mb-4">
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Data Security</h2>
            <p className="mb-4">
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="mb-4 list-disc pl-6">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete your account and data</li>
              <li>Opt out of communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at{' '}
              <a
                href="mailto:privacy@geminiprompts.com"
                className="text-purple-600 hover:underline"
              >
                privacy@geminiprompts.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
