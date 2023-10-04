import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"

interface UserState {
  firstName: string
  lastName: string
  email: string
  profileImage: string
}

const initialState: UserState = {
  firstName: "",
  lastName: "",
  email: "",
  profileImage: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUserDetails: (_, action: PayloadAction<UserState>) => {
      return action.payload
    },
    resetUserDetails: () => {
      return initialState
    },
  },
})

export const { changeUserDetails, resetUserDetails } = userSlice.actions

export const getUserDetails = (state: RootState) => state.user

export default userSlice.reducer
