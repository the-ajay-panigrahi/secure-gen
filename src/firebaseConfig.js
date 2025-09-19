import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut, 
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export const signUp = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, {
      displayName: name,
    });
    console.log("User signed up and profile updated:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error.code, error.message);
    throw error;
  }
};

export const logIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error.code, error.message);
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth); 
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};

export const addPassword = async (userId, website, username, password) => {
  try {
    await addDoc(collection(db, "passwords"), {
      userId,
      website,
      username,
      password,
      createdAt: new Date(),
    });
    console.log("Password saved successfully!");
  } catch (e) {
    console.error("Error adding password: ", e);
  }
};

export const subscribeToPasswords = (userId, onDataReceived) => {
  const q = query(
    collection(db, "passwords"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (querySnapshot) => {
    console.log("Received password updates");

    const passwords = [];
    querySnapshot.forEach((doc) => {
      passwords.push({ id: doc.id, ...doc.data() });
    });
    onDataReceived(passwords);
    console.log("Current passwords: ", passwords);
  });
};

export const updatePassword = async (docId, newFields) => {
  try {
    const passwordRef = doc(db, "passwords", docId);
    await updateDoc(passwordRef, newFields);
    console.log("Password updated successfully!");
  } catch (e) {
    console.error("Error updating password: ", e);
    throw e;
  }
};


export const deletePassword = async (docId) => {
  try {
    const passwordRef = doc(db, "passwords", docId);
    await deleteDoc(passwordRef);
    console.log("Password deleted successfully!");
  } catch (e) {
    console.error("Error deleting password: ", e);
    throw e;
  }
};

export default auth;
