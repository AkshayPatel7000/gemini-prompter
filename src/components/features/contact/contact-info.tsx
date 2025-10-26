import { Mail, MessageCircle, MapPin } from 'lucide-react';

export function ContactInfo() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: "Send us an email and we'll respond within 24 hours.",
      contact: 'hello@geminiprompts.com',
      href: 'mailto:hello@geminiprompts.com',
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time.',
      contact: 'Available 9 AM - 6 PM EST',
      href: '#',
    },
    {
      icon: MapPin,
      title: 'Office',
      description: 'Visit our office for in-person meetings.',
      contact: 'San Francisco, CA',
      href: '#',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Get in Touch</h2>
        <p className="text-gray-600 dark:text-gray-300">
          We&apos;re here to help! Choose the best way to reach us and
          we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <div className="space-y-6">
        {contactMethods.map((method, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
              <method.icon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="mb-1 font-semibold">{method.title}</h3>
              <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
                {method.description}
              </p>
              <a
                href={method.href}
                className="font-medium text-purple-600 hover:underline"
              >
                {method.contact}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
        <h3 className="mb-2 font-semibold">Frequently Asked Questions</h3>
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">
          Check out our FAQ section for quick answers to common questions.
        </p>
        <a
          href="#"
          className="text-sm font-medium text-purple-600 hover:underline"
        >
          View FAQ →
        </a>
      </div>
    </div>
  );
}
