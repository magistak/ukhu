# Firebase Security Rules (Overview)

## Auth
- Email verification required
- Custom claims: { role: 'admin' } for ops

## Firestore (pseudocode)
- match /users/{uid}/{collection=**}/{doc=**}:
  allow read, write: if request.auth.uid == uid
- match /inbox/{id}:
  allow create: if request.auth != null && request.resource.data.via == 'callable'
  allow read: if isAdmin()
  allow update, delete: if isAdmin()

## Functions
- `submitContactForm` validates payload, writes `/inbox`, logs event
