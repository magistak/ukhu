# Security & Privacy

## Data handled
- Auth profile: display name, email (Firebase)
- App data: saved checklist states, form submissions
- No sensitive immigration IDs in v0.1

## Principles
- Data minimization; clear purpose
- Opt-in email comms
- **GDPR**: DPA with processors; export/delete on request; retention 12 months for form inbox

## Controls
- Firebase Auth; email verification on
- Firestore rules:
  - Users can read/write only their docs under `/users/{uid}/**`
  - Deny direct writes to `/inbox/**`; allow only via callable function
- WordPress isolated; editor MFA; limited plugins; least privilege
