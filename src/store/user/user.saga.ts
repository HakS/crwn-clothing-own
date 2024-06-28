import { all, call, put, takeLatest } from "typed-redux-saga/macro"
import { AdditionalInformation, RawUserData, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, getCurrentUser, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, signOutUser } from "../../utils/firebase/firebase.utils"
import { signInSuccess, signInFailed, signOutSuccess, signUpSuccess, emailSignInStart, googleSignInStart, signUpStart, signOutStart, checkUserSession } from './user.reducer'
import { User } from "firebase/auth"

export function* getSnapshotFromUserAuth(userAuth: RawUserData, additionalDetails?: AdditionalInformation) {
  try {
    const userSnapshot = yield* call(createUserDocumentFromAuth, userAuth, additionalDetails)
    if (userSnapshot) {
      console.log(userSnapshot.data())
      const userSnapshotData = userSnapshot.data()
      if (userSnapshotData) {
        const { displayName, email, createdAt } = userSnapshotData
        yield* put(signInSuccess({ id: userSnapshot.id, displayName, email, createdAt: createdAt.toJSON() }))
      }
    }
  } catch (error) {
    yield* put(signInFailed(error as Error as Error))
  }
}

export function* signInWithEmail({ payload: { email, password }}: ReturnType<typeof emailSignInStart>) {
  try {
    const userCredential = yield* call(signInAuthUserWithEmailAndPassword, email, password)
    if (userCredential) {
      const { user: { uid, displayName, email } } = userCredential
      yield* call(getSnapshotFromUserAuth, { uid, displayName, email } as RawUserData)
    }
  } catch (error) {
    yield* put(signInFailed(error as Error as Error))
  }
}
export function* signInWithGoogle() {
  try {
    const { user: { uid, displayName, email } } = yield* call(signInWithGooglePopup)
    yield* call(getSnapshotFromUserAuth, { uid, displayName, email } as RawUserData)
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}

export function* signUp({ payload: { displayName, email, password } }: ReturnType<typeof signUpStart>) {
  try {
    const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password)
    if (userCredential) {
      const { user: { uid, email } } = userCredential
      yield* put(signUpSuccess({ user: { uid, displayName, email } as RawUserData, additionalDetails: { displayName } } ))
    }
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}
export function* signInAfterSignUp({ payload: { user, additionalDetails } }: ReturnType<typeof signUpSuccess>) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails)
}

export function* signOut() {
  try {
    yield* call(signOutUser)
    yield* put(signOutSuccess())
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser)
    if (!userAuth) return
    yield* call(getSnapshotFromUserAuth, userAuth)
  } catch (error) {
    yield* put(signInFailed(error as Error))
  }
}

export function* onEmailSignInStart() {
  yield* takeLatest(emailSignInStart, signInWithEmail)
}
export function* onGoogleSignInStart() {
  yield* takeLatest(googleSignInStart, signInWithGoogle)
}

export function* onSignUpStart() {
  yield* takeLatest(signUpStart, signUp)
}
export function* onSignUpSuccess() {
  yield* takeLatest(signUpSuccess, signInAfterSignUp)
}

export function* onSignOutStart() {
  yield* takeLatest(signOutStart, signOut)
}

export function* onCheckUserSession() {
  yield* takeLatest(checkUserSession, isUserAuthenticated)
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ])
}
