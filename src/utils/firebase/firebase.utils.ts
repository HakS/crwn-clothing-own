import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, QueryDocumentSnapshot, Timestamp } from 'firebase/firestore';
import { Category } from '../../store/categories/category.types';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

export const firebaseApp = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export type ObjectToAdd = {
  title: string;
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd> (collectionKey: string, objectsToAdd: T[]) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db)
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
  })

  await batch.commit()
  console.log('done')
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, 'categories')
  const q = query(collectionRef)

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Category)
}

export type AdditionalInformation = {
  displayName?: string;
}

export type RawUserData = {
  uid: string;
  displayName: string;
  email: string;
}

export type FirestoreUserData = {
  createdAt: Timestamp;
  displayName: string;
  email: string;
}

const testdate: Timestamp = new Timestamp(234345, 234)
testdate.toJSON()

// Only exposed for user sign up with custom data
export const createUserDocumentFromAuth = async (userAuth: RawUserData, additionalInfo = {} as AdditionalInformation): Promise<void | QueryDocumentSnapshot<FirestoreUserData>> => {
  if (!userAuth) return
  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, {
        displayName, email, createdAt, ...additionalInfo,
      })
    } catch (error) {
      console.error('error creating the user', error)
    }
  }
  return userSnapshot as QueryDocumentSnapshot<FirestoreUserData>
}

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return
  return await signInWithEmailAndPassword(auth, email, password)
}

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)


export const getCurrentUser = (): Promise<RawUserData | null> => {
  return new Promise((y, n) => {
    const toUnsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        toUnsubscribe()
        y(userAuth as RawUserData)
      },
      n
    )
  })
}
