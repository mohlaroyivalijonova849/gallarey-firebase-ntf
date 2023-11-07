import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDGTwiGHnPzwCirejnionjOjgj_6ri5GZI",
  authDomain: "gallery-test-project-7505e.firebaseapp.com",
  projectId: "gallery-test-project-7505e",
  storageBucket: "gallery-test-project-7505e.appspot.com",
  messagingSenderId: "740223640882",
  appId: "1:740223640882:web:4dc9a6f0c37a7b2dd5a32b",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

const provider = new GoogleAuthProvider();

export const singUpWithGoogleAccount = async () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
};

export const signOutFromAccount = () => {
  signOut(auth)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
