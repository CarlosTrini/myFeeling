//firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDFkBET7qUMKn13Ep_XNmj2Mw-qz84PArs',
  authDomain: 'myfeeling-f0110.firebaseapp.com',
  projectId: 'myfeeling-f0110',
  databaseURL: 'gs://myfeeling-f0110.appspot.com/',
  storageBucket: 'myfeeling-f0110.appspot.com',
  messagingSenderId: '674959593846',
  appId: '1:674959593846:web:6d6b07f4c3d2f1348f2a57'
};

//firebase
const app = initializeApp(firebaseConfig); // Initialize Firebase
const auth = getAuth(app); //authentication
const db = getFirestore(app); // cloud firestore (database)
const storage = getStorage(app);

export { auth, db, storage }