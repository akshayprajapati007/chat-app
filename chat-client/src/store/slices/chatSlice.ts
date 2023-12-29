import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import { IChatList } from "utility/interfaces/chat"

interface ChatState {
  chatListLoader: boolean
  activeChat: IChatList
  chatList: IChatList[]
}

const initialState: ChatState = {
  chatListLoader: false,
  activeChat: { _id: "", users: [], createdAt: "", updatedAt: "" },
  chatList: [],
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatListLoader: (state: ChatState, action: PayloadAction<boolean>) => {
      state.chatListLoader = action.payload
    },
    setActiveChat: (state: ChatState, action: PayloadAction<IChatList>) => {
      state.activeChat = action.payload
    },
    setChatList: (state: ChatState, action: PayloadAction<IChatList[]>) => {
      state.chatList = action.payload
    },
    resetActiveChat: (state: ChatState) => {
      state.activeChat = initialState.activeChat
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
  setActiveChat,
  setChatList,
  resetActiveChat,
  resetChatList,
  resetChatState,
} = chatSlice.actions

export const getChatState = (state: RootState) => state.chat

export default chatSlice.reducer
