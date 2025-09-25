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

  // For client-side, use the known configuration values directly since 
  // environment variables aren't properly bundled in this Replit environment
  if (typeof window !== 'undefined') {
    const config = {
      apiKey: 'AIzaSyBlnUJDublnCKQA4sjkecAXNhTkw48j1b0',
      authDomain: 'ukhu-7de4d.firebaseapp.com',
      projectId: 'ukhu-7de4d',
      storageBucket: 'ukhu-7de4d.firebasestorage.app',
      messagingSenderId: '88116679766',
      appId: '1:88116679766:web:8ea52d57953e2ac278d7f7'
    };
    
    // Cache for future use
    manualConfig = config;
    return config;
  }

  // Server-side: use environment variables
  const {
    NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID
  } = process.env;

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
    authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
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
