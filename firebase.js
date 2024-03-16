import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJOktSAZcg9teU4uybpEhP2sqFWq-0wNw",
  authDomain: "sportcallapp.firebaseapp.com",
  projectId: "sportcallapp",
  storageBucket: "sportcallapp.appspot.com",
  messagingSenderId: "271029396750",
  appId: "1:271029396750:web:9537746d8950cbee96235f",
  measurementId: "G-5SFBYRL20P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
