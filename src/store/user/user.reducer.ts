import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { UserData } from "./user.types"
import { AdditionalInformation, RawUserData } from "../../utils/firebase/firebase.utils"

export type UserState = {
  readonly currentUser: UserData | null,
  readonly isLoading: boolean,
  readonly error: Error | null
}

const INITIAL_STATE: UserState = {
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
    emailSignInStart(state, action: PayloadAction<{ email: string, password: string }>) {},
    signInSuccess(state, action: PayloadAction<UserData>) { state.currentUser = action.payload },
    signInFailed(state, action: PayloadAction<Error>) { state.error = action.payload },

    signUpStart(state, action: PayloadAction<{ displayName: string, email: string, password: string }>) { },
    signUpSuccess(state, action: PayloadAction<{ user: RawUserData, additionalDetails: AdditionalInformation }>) { },
    signUpFailed(state, action: PayloadAction<Error>) { state.error = action.payload },

    signOutStart() { },
    signOutSuccess(state) { state.currentUser = null },
    signOutFailed(state, action: PayloadAction<Error>) { state.error = action.payload },
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
