import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8FcqzKY7eNqBO5UtIZcy9_XFXtu0HqlM",
  authDomain: "developer-ayusudi.firebaseapp.com",
  databaseURL: "https://developer-ayusudi-default-rtdb.firebaseio.com",
  projectId: "developer-ayusudi",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
