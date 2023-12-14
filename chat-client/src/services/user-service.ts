import { AxiosResponse } from "axios"
import {
  SEARCH_USERS_ENDPOINT,
  FRIEND_REQUEST_ENDPOINT,
  GET_USER_DETAILS_ENDPOINT,
  REMOVE_FRIEND_ENDPOINT,
  FRIENDS_ENDPOINT,
} from "configs"
import httpClient from "services/base-service"
import {
  ISearchUsersResponse,
  IFriendRequestPayload,
  IUserDetailsResponse,
  IFriendsListResponse,
} from "utility/interfaces/users"

const getUserDetails = async (
  id: string
): Promise<AxiosResponse<IUserDetailsResponse>> => {
  const ENDPOINT = `${GET_USER_DETAILS_ENDPOINT}?id=${id}`
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
  searchUsers,
  friendRequest,
  removeFriend,
  getFriendsList,
}
