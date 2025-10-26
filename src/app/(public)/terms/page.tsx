import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for Gemini Prompt Discovery - Please read our terms and conditions.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>

        <div className="prose prose-lg max-w-none">
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using Gemini Prompt Discovery, you accept and
              agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Use License</h2>
            <p className="mb-4">
              Permission is granted to temporarily use Gemini Prompt Discovery
              for personal, non-commercial transitory viewing only.
            </p>
            <p className="mb-4">
              This license shall automatically terminate if you violate any of
              these restrictions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">User Accounts</h2>
            <p className="mb-4">
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times.
            </p>
            <ul className="mb-4 list-disc pl-6">
              <li>
                You are responsible for safeguarding your account credentials
              </li>
              <li>You must not share your account with others</li>
              <li>You must notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Content Guidelines</h2>
            <p className="mb-4">Users must not create or share content that:</p>
            <ul className="mb-4 list-disc pl-6">
              <li>Is illegal, harmful, or offensive</li>
              <li>Violates intellectual property rights</li>
              <li>Contains malicious code or spam</li>
              <li>Impersonates others or is misleading</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">
              Intellectual Property
            </h2>
            <p className="mb-4">
              The service and its original content, features, and functionality
              are and will remain the exclusive property of Gemini Prompt
              Discovery and its licensors.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Termination</h2>
            <p className="mb-4">
              We may terminate or suspend your account and bar access to the
              service immediately, without prior notice or liability, under our
              sole discretion, for any reason whatsoever.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold">Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please
              contact us at{' '}
              <a
                href="mailto:legal@geminiprompts.com"
                className="text-purple-600 hover:underline"
              >
                legal@geminiprompts.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
