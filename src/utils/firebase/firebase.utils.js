import { initializeApp } from "firebase/app";

import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword
} from "firebase/auth";

import {
    doc,
    getDoc,
    getFirestore,
    setDoc
} from "firebase/firestore";

import config from "./config.json";

const firebaseConfig = {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: "pointofsale-ae0fd.firebaseapp.com",
    projectId: "pointofsale-ae0fd",
    storageBucket: "pointofsale-ae0fd.appspot.com",
    messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.FIREBASE_APP_ID,
    measurementId: config.FIREBASE_MEASUREMENT_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

const provider = new GoogleAuthProvider();

export const auth = getAuth();

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocref = doc(db, "env/${config.FIREBASE_ENVIRONMENT}/users", userAuth.uid);

    const userSnapshot = await getDoc(userDocref);

    if (!userSnapshot.exists()) {
        var {diplayName, email} = userAuth;
        const createAt = new Date();
        try {
            if( displayName == null) {
                diplayName = email.split("@")[0];
            }

            await setDoc(userDocref, {
                displayName,
                email,
                createAt
            });
        } catch (error) {
            console.log("error creating the user", error.message);
        }
    }

    return userDocref;
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await auth.signOut();
