import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider
} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAX-qkALEtk-Vxdd-4bwU5gXundlcwFGwk",
    authDomain: "pointofsale-ae0fd.firebaseapp.com",
    projectId: "pointofsale-ae0fd",
    storageBucket: "pointofsale-ae0fd.appspot.com",
    messagingSenderId: "855078399227",
    appId: "1:855078399227:web:83d784b43ab9385154145e",
    measurementId: "G-1RSNNYZ9XE"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  
  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);