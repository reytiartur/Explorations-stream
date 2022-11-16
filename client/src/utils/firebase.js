import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";
import { doc, getFirestore, getDoc, setDoc, collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { loadStripe } from '@stripe/stripe-js'

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

const database = getFirestore()

export const createUserWithEmail = async (email, password) => {
    if(!email || !password) return;

    try {
        const {user} = await createUserWithEmailAndPassword(auth, email, password)
        localStorage.setItem('userId', user.uid);
        return user 
    } catch (error) {
        if(error.code === 'auth/email-already-in-use') {
            alert('Email already in use.')
        } else {
            console.log('User creation error', error.message); 
        }
    }
}

export const createUserData = async (user, additionalInfo = {}) => {
    if(!user) return;

    const userRef = await doc(database, 'users', user.uid);

    const userSnapshot = await getDoc(userRef);

    if(!userSnapshot.exists()) {
        const { email, displayName } = user;
        const { userLogin } = additionalInfo;
        const createdAt = new Date();

        try {
            await setDoc(userRef, { displayName, email, userLogin, createdAt, ...additionalInfo })
        } catch (error) {
            console.log('User was not created!', error.message)
        }
    }

    return userSnapshot;
}

export const logInWithEmail = async (email, password) => {
    if(!email || !password) return;

    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        localStorage.setItem('userId', user.uid);
        return user;
    } catch(error) {
        console.log('Log in error!', error.message)
    }
}

export const logOut = async () => {
    localStorage.removeItem('userId');
    await signOut(auth)
}

export const setCurrentUser = async (setUser) => {
    await onAuthStateChanged(auth, async (currentUser) => {
        if(!currentUser) {
            setUser(null);
            return;
        } else {
            const storeUser = {};
            const userProperties = [
                'displayName',
                'email',
                'emailVerified',
                'isAnonymous',
                'photoURL',
                'providerData',
                'providerId',
                'refreshToken',
                'uid',
                'isAdmin'
            ];

            userProperties.map((prop) => {
                if (prop in currentUser) {
                    storeUser[prop] = currentUser[prop];
                }
            });

            const userRef = await doc(database, 'users', currentUser?.uid);
            const userSnapshot = await getDoc(userRef);
            storeUser['userLogin'] = userSnapshot.data().userLogin;
            
            setUser(storeUser)
        }
    })
}

export const resetPassword = async (email) => {
    alert("Password reset email sent")
    return await sendPasswordResetEmail(auth, email)
}

export const getProducts = async (setter) => {
    const productsRef = await collection(database, 'products')
    const q = query(productsRef, where("active", "==", true));
    const productsSnap = await getDocs(q)
    
    try {
        const products = {}
        productsSnap.forEach(async productDoc => {
            products[productDoc.id] = productDoc.data();
            const priceRef = await collection(database, 'products', productDoc.id, 'prices');
            const priceSnap = await getDocs(priceRef);
            priceSnap.forEach(price => {
                products[productDoc.id].prices = {
                    priceId: price.id,
                    priceData: price.data()
                }
            })
        })
        setter(products);
    } catch (error) {
        console.log(error)
    }   
}

export const handleCheckOut = async (uid, priceId) => {
    const checkOutRef = await doc(collection(database, 'users', uid, 'checkout_sessions'));
    await setDoc(checkOutRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
    })
    onSnapshot(checkOutRef, async (snap) => {
        const { error, sessionId } = snap.data()

        if(error) {
            alert("An error occurred:", error.message)
        }
        if(sessionId) {
            const STRIPE_KEY = process.env.REACT_STRIPE_KEY;
            const stripe = await loadStripe(STRIPE_KEY)
            stripe.redirectToCheckout({sessionId})
        }
    })
}

export const subscriptionData = async (uid, setter) => {
    const subscriptionRef = await collection(database, 'users', uid, 'subscriptions')
    const subscriptionSnap = await getDocs(subscriptionRef)

    try {
        subscriptionSnap.forEach(async (subscription) => {
            setter({
                role: subscription.data().role,
                current_period_start: subscription.data().current_period_start.seconds,
                current_period_end: subscription.data().current_period_end.seconds,
            })
        })
    } catch (error) {
        console.log(error.message)
    }
}