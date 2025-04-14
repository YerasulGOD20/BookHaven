import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD-u3ELiX5R58r_6sF0V17tDBRlaq9UeI4",
  authDomain: "bookhaven-34e89.firebaseapp.com",
  projectId: "bookhaven-34e89",
  storageBucket: "bookhaven-34e89.firebasestorage.app",
  messagingSenderId: "744201896875",
  appId: "1:744201896875:web:28fcf5b69966cb924188ee",
  measurementId: "G-912CKVL826"
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage };