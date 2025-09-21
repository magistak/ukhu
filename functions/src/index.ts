import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { onCall } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { z } from 'zod';

const app = initializeApp();
const db = getFirestore(app);

const ContactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  locale: z.string().default('en'),
  pageRef: z.string().optional()
});

export const submitContactForm = onCall(async (request) => {
  const payload = ContactSchema.parse(request.data ?? {});
  const createdAt = new Date().toISOString();

  await db.collection('inbox').add({
    ...payload,
    createdAt,
    userId: request.auth?.uid ?? null
  });

  logger.info('Stored contact message', {
    email: payload.email,
    locale: payload.locale,
    pageRef: payload.pageRef
  });

  return { ok: true };
});
