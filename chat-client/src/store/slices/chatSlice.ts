import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import { IChatList } from "utility/interfaces/chat"

interface ChatState {
  chatListLoader: boolean
  chatList: IChatList[]
}

const initialState: ChatState = {
  chatListLoader: false,
  chatList: [],
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatListLoader: (state: ChatState, action: PayloadAction<boolean>) => {
      state.chatListLoader = action.payload
    },
    setChatList: (state: ChatState, action: PayloadAction<IChatList[]>) => {
      state.chatList = action.payload
    },
    updateChatList: (state: ChatState, action: PayloadAction<IChatList>) => {
      state.chatList = [action.payload, ...state.chatList]
    },
    resetChatList: (state: ChatState) => {
      state.chatList = initialState.chatList
    },
    resetChatState: () => {
      return initialState
    },
  },
})

export const {
  setChatListLoader,
  setChatList,
  updateChatList,
  resetChatList,
  resetChatState,
} = chatSlice.actions

export const getChatState = (state: RootState) => state.chat

export default chatSlice.reducer
