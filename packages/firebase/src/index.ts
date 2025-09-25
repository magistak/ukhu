import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, connectAuthEmulator, type Auth } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, type Firestore } from 'firebase/firestore';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

let cachedApp: FirebaseApp | null = null;
let cachedAuth: Auth | null = null;
let cachedFirestore: Firestore | null = null;

function getEnvBoolean(value: string | undefined): boolean {
  if (!value) return false;
  return value === '1' || value.toLowerCase() === 'true';
}

// Allow manual configuration to work around Next.js bundling issues
let manualConfig: FirebaseConfig | null = null;

export function setFirebaseConfig(config: FirebaseConfig): void {
  manualConfig = config;
}

export function resolveFirebaseConfig(): FirebaseConfig {
  // Use manual config if available (client-side fix)
  if (manualConfig) {
    return manualConfig;
  }

  // Fall back to environment variables (server-side or client with bundled vars)
  const {
    NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID
  } = process.env;

  // If running in browser and environment variables aren't available, 
  // set them manually from the global environment (client-side workaround)
  if (typeof window !== 'undefined' && (
    !NEXT_PUBLIC_FIREBASE_API_KEY ||
    !NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    !NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    !NEXT_PUBLIC_FIREBASE_APP_ID
  )) {
    // Try to get them from the browser's environment (if available in the bundle)
    const config = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBlnUJDublnCKQA4sjkecAXNhTkw48j1b0',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'ukhu-7de4d.firebaseapp.com',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'ukhu-7de4d',
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'ukhu-7de4d.firebasestorage.app',
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '88116679766',
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:88116679766:web:8ea52d57953e2ac278d7f7'
    };
    
    // Cache the config for future use
    manualConfig = config;
    return config;
  }

  if (
    !NEXT_PUBLIC_FIREBASE_API_KEY ||
    !NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    !NEXT_PUBLIC_FIREBASE_PROJECT_ID ||
    !NEXT_PUBLIC_FIREBASE_APP_ID
  ) {
    throw new Error('Firebase environment variables are not fully configured.');
  }

  return {
    apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? `${NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
    projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? `${NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '000000000000',
    appId: NEXT_PUBLIC_FIREBASE_APP_ID
  };
}

export function initFirebase(): FirebaseApp {
  if (cachedApp) {
    return cachedApp;
  }

  const existing = getApps();
  if (existing.length > 0) {
    cachedApp = existing[0];
    return cachedApp;
  }

  const config = resolveFirebaseConfig();
  cachedApp = initializeApp(config);
  return cachedApp;
}

export function getFirebaseAuth(): Auth {
  if (cachedAuth) {
    return cachedAuth;
  }
  const app = initFirebase();
  cachedAuth = getAuth(app);

  if (typeof window !== 'undefined' && getEnvBoolean(process.env.NEXT_PUBLIC_FIREBASE_EMULATORS)) {
    const host = process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST ?? 'localhost';
    const port = Number(process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_PORT ?? '9099');
    connectAuthEmulator(cachedAuth, `http://${host}:${port}`, { disableWarnings: true });
  }

  return cachedAuth;
}

export function getFirebaseFirestore(): Firestore {
  if (cachedFirestore) {
    return cachedFirestore;
  }
  const app = initFirebase();
  cachedFirestore = getFirestore(app);

  if (typeof window !== 'undefined' && getEnvBoolean(process.env.NEXT_PUBLIC_FIREBASE_EMULATORS)) {
    const host = process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_HOST ?? 'localhost';
    const port = Number(process.env.NEXT_PUBLIC_FIREBASE_FIRESTORE_EMULATOR_PORT ?? '8080');
    connectFirestoreEmulator(cachedFirestore, host, port);
  }

  return cachedFirestore;
}
