import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBhO55di9NrGUHFI0uqw3PriQeuAR0EtFI",
  authDomain: "crwn-clothing-db-affff.firebaseapp.com",
  projectId: "crwn-clothing-db-affff",
  storageBucket: "crwn-clothing-db-affff.appspot.com",
  messagingSenderId: "977558983036",
  appId: "1:977558983036:web:4ee95366b19fce88ddd4f9"
}

const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (userSnapshot.exists()) return userDocRef
  const { displayName, email } = userAuth
  const createdAt = new Date()
  try {
    await setDoc(userDocRef, {
      displayName, email, createdAt
    })
  } catch (error) {
    console.error('error creating the user', error.message)
  }
}