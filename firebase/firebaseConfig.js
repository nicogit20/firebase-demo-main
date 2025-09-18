import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPbEycFiFRaZGeoheIKHtK0p36j31FPAI",
  authDomain: "fir-demo-ea5ae.firebaseapp.com",
  projectId: "fir-demo-ea5ae",
  storageBucket: "fir-demo-ea5ae.appspot.com",
  messagingSenderId: "209228824130",
  appId: "1:209228824130:web:2b8071d6fc74bb9ffbb7db",
};

const app = initializeApp(firebaseConfig);

// Auth
const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });

// Firestore
const db = getFirestore(app);

export { app, auth, db };

