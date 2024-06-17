import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import { IProfileMetaData } from "utility/interfaces/users"

interface UserProfileState {
  profileMetaData: IProfileMetaData | null
}

const initialState: UserProfileState = {
  profileMetaData: null,
}

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setUserProfileMetaData: (
      state: UserProfileState,
      action: PayloadAction<IProfileMetaData>
    ) => {
      state.profileMetaData = action.payload
    },
    setUserProfileFriendRequestCount: (
      state: UserProfileState,
      action: PayloadAction<number>
    ) => {
      if (state.profileMetaData) {
        state.profileMetaData.totalFriendRequests = action.payload
      }
    },
    resetUserProfileMetaData: () => {
      return initialState
    },
  },
})

export const {
  setUserProfileMetaData,
  setUserProfileFriendRequestCount,
  resetUserProfileMetaData,
} = userProfileSlice.actions

export const getUserDetails = (state: RootState) => state.userProfile

export default userProfileSlice.reducer
