# Data Model (Firestore)

## Collections
- `users/{uid}`
  - profile: { displayName, email, locale, createdAt }
  - `checklists/{checklistId}`: { templateId, items: [{id, done, note}], updatedAt }
- `inbox/{messageId}`
  - { name, email, locale, form: 'contact', payload, createdAt, pageRef, status }
- `metrics/{date}` (optional)
  - { pageViewsByLocale, signups }

## Rules (intent)
- Users can read/write only their own `users/{uid}/**`
- Deny direct writes to `/inbox/**`; allow via callable Function
- Admins via custom claims can read `/inbox/**`
