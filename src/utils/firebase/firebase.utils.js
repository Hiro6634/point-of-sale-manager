import { initializeApp } from "firebase/app";

import {
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword
} from "firebase/auth";

import {
    collection,
    doc,
    getDoc,
    getFirestore,
    onSnapshot,
    setDoc
} from "firebase/firestore";

import config from "./../../config.json";

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
const db = getFirestore(firebaseApp);

const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocref = doc(db, `env/${config.FIREBASE_ENVIRONMENT}/users`, userAuth.uid);

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

export const getUserDocumentFromAuth = async (userAuth) => {
    console.log("userAuth:", userAuth);
    const userDocRef = doc(db, `env/${config.FIREBASE_ENVIRONMENT}/users`, userAuth.uid);
    console.log("userDocRef:", userDocRef);
    const userDocSnap = await getDoc(userDocRef);
    console.log("userDocSnap:", userDocSnap.data());
    if( userDocSnap.exists()){
        console.log("UserDoc:", userDocSnap.data(), userDocSnap.data().displayName);
        return userDocSnap.data();
    }
    else {
        console.log("Missing data for user:", userDocRef);
    }
    return null;
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    //console.log(email, password);
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await auth.signOut();

const getProducts = async () => {
/*    const productsRef = doc(db, `env/${config.FIREBASE_ENVIRONMENT}/products`);
    console.log("productsRef:", productsRef);
    const productsSnap = await getDoc(productsRef);
    console.log("productsSnap:", productsSnap.data());
    if( productsSnap.exists()){
        console.log("Products:", productsSnap.data());
        return productsSnap.data();
    }
    else {
        console.log("Missing data for products:", productsRef);
    }
        */
    return null;
}

export const onProductsChangedListener = (callback) => {
    const productsRef = collection(db, `env/${config.FIREBASE_ENVIRONMENT}/products`);
    onSnapshot(productsRef, async (querySnapshot) => {
        const products = querySnapshot.docs.map((doc) => doc.data());
        console.log("products:", products);
        callback(products);
    });
};
