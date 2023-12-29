import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { DEFAULT_USER_INFO } from "utility/constants/index"
import type { RootState } from "../store"

interface UserState {
  _id: string
  firstName: string
  lastName: string
  email: string
  profileImage: string
}

const initialState: UserState = { ...DEFAULT_USER_INFO }

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
