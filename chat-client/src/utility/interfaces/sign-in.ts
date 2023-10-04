import { IUserDetails } from "./common"

export interface ISIgnInPayload {
  email: string
  password: string
}

export interface ISignInResponse {
  token: string
  isEmailVerified: boolean
  success: boolean
  data: IUserDetails
}

export interface ISignInValues {
  email: string
  password: string
}
