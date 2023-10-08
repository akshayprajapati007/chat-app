import { IUserDetails } from "./common"

export interface IProfileValues {
  firstName: string
  lastName: string
}

export type IProfilePayload = IProfileValues

export interface IProfileResponse {
  success: boolean
  message: string
  data: IUserDetails
}

export interface IProfileImagePayload {
  profileImage: string
}

export type IProfileImageResponse = IProfileResponse
