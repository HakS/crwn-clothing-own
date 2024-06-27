import { all, call, put, takeLatest } from "redux-saga/effects"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, getCurrentUser, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, signOutUser } from "../../utils/firebase/firebase.utils"
import { signInSuccess, signInFailed, signOutSuccess, signUpSuccess, emailSignInStart, googleSignInStart, signUpStart, signOutStart, checkUserSession } from './user.reducer'

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails)
    const { displayName, email, createdAt } = userSnapshot.data()
    yield put(signInSuccess({ id: userSnapshot.id, displayName, email, createdAt: createdAt.toJSON() }))
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* signInWithEmail({ payload: { email, password }}) {
  try {
    const { user } = yield call(signInAuthUserWithEmailAndPassword, email, password)
    yield call(getSnapshotFromUserAuth, user)
  } catch (error) {
    yield put(signInFailed(error))
  }
}
export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup)
    yield call(getSnapshotFromUserAuth, user)
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* signUp({ payload: { displayName, email, password } }) {
  try {
    const { user } = yield call(createAuthUserWithEmailAndPassword, email, password)
    yield put(signUpSuccess(user, { displayName }))
  } catch (error) {
    yield put(signInFailed(error))
  }
}
export function* signInAfterSignUp({ payload: { user, additionalDetails } }) {
  yield call(getSnapshotFromUserAuth, user, additionalDetails)
}

export function* signOut() {
  try {
    yield call(signOutUser)
    yield put(signOutSuccess())
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser)
    if (!userAuth) return
    yield call(getSnapshotFromUserAuth, userAuth)
  } catch (error) {
    yield put(signInFailed(error))
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(emailSignInStart().type, signInWithEmail)
}
export function* onGoogleSignInStart() {
  yield takeLatest(googleSignInStart().type, signInWithGoogle)
}

export function* onSignUpStart() {
  yield takeLatest(signUpStart().type, signUp)
}
export function* onSignUpSuccess() {
  yield takeLatest(signUpSuccess().type, signInAfterSignUp)
}

export function* onSignOutStart() {
  yield takeLatest(signOutStart().type, signOut)
}

export function* onCheckUserSession() {
  yield takeLatest(checkUserSession().type, isUserAuthenticated)
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ])
}
