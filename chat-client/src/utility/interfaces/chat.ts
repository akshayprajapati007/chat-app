import { IUserDetails } from "./common"

export interface IChatList {
  _id: string
  createdAt: string
  updatedAt: string
  users: IUserDetails[]
  lastMessage?: string
}

export interface IMessage {
  _id: string
  sender: string
  createdAt: string
  updatedAt: string
  message: string
  chat: string
}

export interface IChatListResponse {
  success: boolean
  data: IChatList[]
}

export interface ISendMessagePayload {
  chatId: string
  message: string
}

export interface IMessageResponse {
  success: boolean
  data: IMessage
}

export interface IMessagesResponse {
  success: boolean
  data: IMessage[]
}
