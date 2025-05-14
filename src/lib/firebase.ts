import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCh9kkgfa-XilJ9fWwtnzs8Ct6cPnTzjn0",
    authDomain: "nextlearn-afe40.firebaseapp.com",
    projectId: "nextlearn-afe40",
    storageBucket: "nextlearn-afe40.firebasestorage.app",
    messagingSenderId: "651911102569",
    appId: "1:651911102569:web:37838ede663d75e73de2f8",
    measurementId: "G-WBBTF8EWR5"
  };

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { app, auth }; 