import { AxiosResponse } from "axios"
import {
  SEARCH_USERS_ENDPOINT,
  FRIEND_REQUEST_ENDPOINT,
  GET_USER_DETAILS_ENDPOINT,
} from "configs"
import httpClient from "services/base-service"
import {
  ISearchUsersResponse,
  IFriendRequestPayload,
  IFriendRequestResponse,
  IUserDetailsResponse,
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

const sendFriendRequest = async (
  payload: IFriendRequestPayload
): Promise<AxiosResponse<IFriendRequestResponse>> => {
  return await httpClient.post(FRIEND_REQUEST_ENDPOINT, payload)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUserDetails,
  searchUsers,
  sendFriendRequest,
}
