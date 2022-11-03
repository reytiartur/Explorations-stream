import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsbJKMTL_uTSY-rXr4AUDPIiZWBa-0Isw",
  authDomain: "explorations-stream.firebaseapp.com",
  projectId: "explorations-stream",
  storageBucket: "explorations-stream.appspot.com",
  messagingSenderId: "743964012121",
  appId: "1:743964012121:web:3a591ec2b07483efcb8b48"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const createUserWithEmail = async (email, password) => {
    if(!email || !password) return;

    try {
        return await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
        if(error.code === 'auth/email-already-in-use') {
            alert('Email already in use.')
        } else {
            console.log('User creation error', error.message); 
        }
    }
}

export const logInWithEmail = async (email, password) => {
    if(!email || !password) return;

    try {
        return await signInWithEmailAndPassword(auth, email, password)
    } catch(error) {
        console.log('Log in error!', error.message)
    }
}

export const logOut = async () => {
    await signOut(auth)
}

export const setCurrentUser = async (setCurrentUser) => {
    await onAuthStateChanged(auth, (currentUser) => {
        setCurrentUser(currentUser)
    })
}