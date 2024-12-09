import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9BuKEfdkRLmWPeJZYGA3Ue5Lj6h2Eiws",
  authDomain: "doanchuyennganh-90022.firebaseapp.com",
  databaseURL: "https://doanchuyennganh-90022-default-rtdb.firebaseio.com",
  projectId: "doanchuyennganh-90022",
  storageBucket: "doanchuyennganh-90022.appspot.com",
  messagingSenderId: "590343184965",
  appId: "1:590343184965:web:0ab8ba10b443fe5013f92c",
  measurementId: "G-0K8FLGQMV7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, analytics, auth, provider, db };
