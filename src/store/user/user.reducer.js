import { createSlice } from "@reduxjs/toolkit"

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    checkUserSession() {},

    googleSignInStart() {},
    emailSignInStart() {},
    signInSuccess(state, action) { state.currentUser = action.payload },
    signInFailed(state, action) { state.error = action.payload },

    signUpStart() { },
    signUpSuccess() { },
    signUpFailed(state, action) { state.error = action.payload },

    signOutStart() { },
    signOutSuccess(state) { state.currentUser = null },
    signOutFailed(state, action) { state.error = action.payload },
  }
})

export const {
  checkUserSession,
  googleSignInStart,
  emailSignInStart,
  signInSuccess,
  signInFailed,
  signUpStart,
  signUpSuccess,
  signUpFailed,
  signOutStart,
  signOutSuccess,
  signOutFailed,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
