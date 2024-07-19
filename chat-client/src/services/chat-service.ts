import { AxiosResponse } from "axios"
import {
  ACCESS_CHAT_ENDPOINT,
  CHATS_ENDPOINT,
  GET_MESSAGES_ENDPOINT,
  SEND_MESSAGE_ENDPOINT,
} from "configs"
import httpClient from "services/base-service"
import {
  IChatListResponse,
  IMessageResponse,
  IMessagesResponse,
  ISendMessagePayload,
} from "utility/interfaces/chat"

const getChatsList = async (): Promise<AxiosResponse<IChatListResponse>> => {
  return await httpClient.get(CHATS_ENDPOINT)
}

const accessChat = async (recipientId: string): Promise<AxiosResponse<any>> => {
  return await httpClient.post(ACCESS_CHAT_ENDPOINT, { recipientId })
}

const getMessages = async (
  chatId: string,
  query?: string
): Promise<AxiosResponse<IMessagesResponse>> => {
  const ENDPOINT = `${GET_MESSAGES_ENDPOINT}/${chatId}${
    query ? `?${query}` : ""
  }`
  return await httpClient.get(ENDPOINT)
}

const sendMessage = async (
  messageInfo: ISendMessagePayload
): Promise<AxiosResponse<IMessageResponse>> => {
  return await httpClient.post(SEND_MESSAGE_ENDPOINT, messageInfo)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getChatsList,
  accessChat,
  getMessages,
  sendMessage,
}
