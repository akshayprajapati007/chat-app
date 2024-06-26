import { AxiosResponse } from "axios"
import {
  SEARCH_USERS_ENDPOINT,
  FRIEND_REQUEST_ENDPOINT,
  GET_USER_DETAILS_ENDPOINT,
  REMOVE_FRIEND_ENDPOINT,
  FRIENDS_ENDPOINT,
  FRIEND_REQUESTS_LIST_ENDPOINT,
  GET_USER_BY_CHAT_ID_ENDPOINT,
  GET_USER_PROFILE_META_DATA_ENDPOINT,
} from "configs"
import httpClient from "services/base-service"
import {
  ISearchUsersResponse,
  IFriendRequestPayload,
  IUserDetailsResponse,
  IFriendsListResponse,
  IProfileMetaDataResponse,
} from "utility/interfaces/users"

const getUserDetails = async (
  id: string
): Promise<AxiosResponse<IUserDetailsResponse>> => {
  const ENDPOINT = `${GET_USER_DETAILS_ENDPOINT}?id=${id}`
  return await httpClient.get(ENDPOINT)
}

const getUserByChatId = async (
  chatId: string
): Promise<AxiosResponse<IUserDetailsResponse>> => {
  const ENDPOINT = `${GET_USER_BY_CHAT_ID_ENDPOINT}/${chatId}`
  return await httpClient.get(ENDPOINT)
}

const searchUsers = async (
  page: number,
  perPage: number,
  search: string
): Promise<AxiosResponse<ISearchUsersResponse>> => {
  const ENDPOINT = `${SEARCH_USERS_ENDPOINT}?page=${page}&perPage=${perPage}&search=${search}`
  return await httpClient.get(ENDPOINT)
}

const getFriendsList = async (
  page: number,
  perPage: number,
  search: string
): Promise<AxiosResponse<IFriendsListResponse>> => {
  const ENDPOINT = `${FRIENDS_ENDPOINT}?page=${page}&perPage=${perPage}&search=${search}`
  return await httpClient.get(ENDPOINT)
}

const getFriendRequestsList = async (
  page: number,
  perPage: number,
  search: string
): Promise<AxiosResponse<IFriendsListResponse>> => {
  const ENDPOINT = `${FRIEND_REQUESTS_LIST_ENDPOINT}?page=${page}&perPage=${perPage}&search=${search}`
  return await httpClient.get(ENDPOINT)
}

const getUserProfileMetaData = async (): Promise<
  AxiosResponse<IProfileMetaDataResponse>
> => {
  return await httpClient.get(GET_USER_PROFILE_META_DATA_ENDPOINT)
}

const friendRequest = async (
  payload: IFriendRequestPayload
): Promise<AxiosResponse<IUserDetailsResponse>> => {
  return await httpClient.post(FRIEND_REQUEST_ENDPOINT, payload)
}

const removeFriend = async (
  receiverId: string
): Promise<AxiosResponse<IUserDetailsResponse>> => {
  const ENDPOINT = `${REMOVE_FRIEND_ENDPOINT}/${receiverId}`
  return await httpClient.delete(ENDPOINT)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUserDetails,
  getUserByChatId,
  searchUsers,
  friendRequest,
  removeFriend,
  getFriendsList,
  getFriendRequestsList,
  getUserProfileMetaData,
}
