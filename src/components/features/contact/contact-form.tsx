'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="rounded-lg bg-white p-8 shadow-sm dark:bg-gray-800">
      <h2 className="mb-6 text-2xl font-semibold">Send us a message</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Name</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Subject</label>
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Message</label>
          <textarea
            rows={6}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    </div>
  );
}
