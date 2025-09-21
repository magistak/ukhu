import { z } from 'zod';

const ContactPayloadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  locale: z.string().default('en')
});

export type ContactPayload = z.infer<typeof ContactPayloadSchema>;

export async function submitContactForm(payload: ContactPayload) {
  const data = ContactPayloadSchema.parse(payload);

  const baseUrl = process.env.NEXT_PUBLIC_FIREBASE_FUNCTIONS_URL;
  if (!baseUrl) {
    console.log('[contact] captured message', data);
    return { ok: true };
  }

  const endpoint = new URL('/submitContactForm', baseUrl).toString();
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Contact form request failed with ${response.status}`);
  }

  return response.json();
}
