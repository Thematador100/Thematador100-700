
import { initializeApp, getApps, getApp, FirebaseApp, FirebaseOptions } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Default / Demo Configuration
const defaultConfig: FirebaseOptions = {
  apiKey: "AIzaSyA8H76TxW5-r5hv2wKJ5yBHHbirl7I-gfc",
  authDomain: "gen-lang-client-0215384690.firebaseapp.com",
  projectId: "gen-lang-client-0215384690",
  storageBucket: "gen-lang-client-0215384690.firebasestorage.app",
  messagingSenderId: "654629359316",
  appId: "1:654629359316:web:d7cf2078149ec59268f541"
};

// Helper to get config from local storage or fallback
const getConfiguration = (): FirebaseOptions => {
    if (typeof window === 'undefined') return defaultConfig;
    
    try {
        const stored = localStorage.getItem('firebase_config');
        if (stored) {
            const parsed = JSON.parse(stored);
            // Basic validation
            if (parsed.apiKey && parsed.projectId) {
                return parsed;
            }
        }
    } catch (e) {
        console.warn("Failed to parse local firebase config, using default.", e);
    }
    return defaultConfig;
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let initializationError: string | null = null;

try {
    // Safe initialization check to prevent "App already initialized" errors
    if (typeof window !== 'undefined') {
        const config = getConfiguration();
        
        if (getApps().length > 0) {
            app = getApp();
        } else {
            app = initializeApp(config);
        }
        
        if (app) {
            auth = getAuth(app);
            db = getFirestore(app);
        }
    }
} catch (error: any) {
    // Silent fail for offline mode to avoid alarming warnings, or handle globally
    console.error("Firebase Initialization Error:", error);
    initializationError = error.message;
}

export { auth, db, initializationError };
export default app;
