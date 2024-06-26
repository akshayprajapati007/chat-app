import { FriendshipStatus } from "utility/enums/common"
import { IUserDetails } from "./common"

export interface ISearchUserDetails extends IUserDetails {
  friendshipStatus: FriendshipStatus
  isFriendRequest: boolean
}

export interface IUserDetailsResponse {
  data: ISearchUserDetails
  success: boolean
}

export interface ISearchUsersResponse {
  data: ISearchUserDetails[]
  success: boolean
}

export interface IFriendRequestPayload {
  receiverId: string
  status: FriendshipStatus
}

export interface IFriendsListResponse {
  succuss: boolean
  data: IUserDetails[]
}

export interface IProfileMetaData {
  totalFriendRequests: number
}

export interface IProfileMetaDataResponse {
  succuss: boolean
  data: IProfileMetaData
}
