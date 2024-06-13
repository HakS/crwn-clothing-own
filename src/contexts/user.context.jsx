import { createContext } from "react";
import { useAuthState } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: null,
})

export const UserProvider = ({children}) => {
  const currentUser = useAuthState()
  const value = { currentUser }

  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
}
