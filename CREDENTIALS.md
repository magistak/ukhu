# Credentials and local setup

This file explains where to put Firebase and WordPress credentials for local development and staging. Do NOT commit secrets.

1) Firebase (Web client config)

- In the Firebase Console (https://console.firebase.google.com/) go to Project Settings → General → Your apps → register a Web app. Copy the `firebaseConfig` snippet.
- Add the values to `apps/web/.env.local` (or to your system environment) using the keys from `.env.example` (the `NEXT_PUBLIC_FIREBASE_*` variables).

Example `apps/web/.env.local` (do not commit):

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ukhu-7de4d.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ukhu-7de4d
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ukhu-7de4d.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=88116679766
NEXT_PUBLIC_FIREBASE_APP_ID=1:88116679766:web:8ea52d57953e2ac278d7f7
```

2) Firebase (Admin / functions)

- In Firebase Console → Project settings → Service accounts → Generate new private key and download the JSON.
- Store the JSON in a local folder outside the repo (suggested: `~/.secrets/firebase-staging-sa.json`).
- Set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable in your shell or in `functions/.env` (if you use dotenv in functions). Example:

```
export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.secrets/firebase-staging-sa.json"
```

3) WordPress REST API (Application Passwords)

- In WP Admin, go to Users → Your Profile → Application Passwords → Create a new password for the dev user.
- Store the password in your `apps/web/.env.local` as `WP_APP_PASSWORD` and set `WP_BASE_URL` to the staging URL.

4) Emulators and testing

- To run Firestore/Auth emulators locally, install the Firebase CLI and run `firebase emulators:start --only firestore,auth` from the repo root (or the functions/ directory that contains `firebase.json`).
- Use `NEXT_PUBLIC_FIREBASE_EMULATORS=true` in your `apps/web/.env.local` to connect the client to emulators (functions package reads this env when deciding to connect).

Security

- Do not commit `.env.local`, `.secrets/`, or service account JSON to git. This repo already contains `.env.example` and `.gitignore` entries for these.
