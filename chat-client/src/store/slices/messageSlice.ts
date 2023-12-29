import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
import { IMessage } from "utility/interfaces/chat"

interface IMessageState {
  messages: IMessage[]
}

const initialState: IMessageState = {
  messages: [],
}

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state: IMessageState, action: PayloadAction<IMessage[]>) => {
      state.messages = [...action.payload]
    },
    updateMessages: (state: IMessageState, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload)
    },
    resetMessages: () => {
      return initialState
    },
  },
})

export const { setMessages, updateMessages, resetMessages } =
  messageSlice.actions

export const getChatState = (state: RootState) => state.message

export default messageSlice.reducer
