export interface ISignUpPayload {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface IAccountVerificationPayload {
  email: string
  otp: string
}

export interface ISendOTPPayload {
  email: string
}

export interface ISignUpResponse {
  data: ISignUpPayload
  success: boolean
  message: string
}

export interface IAccountVerificationResponse {
  token: string
  success: boolean
  message: string
}

export interface ISendOTPResponse {
  success: boolean
  message: string
}

export type ISignUpValues = ISignUpPayload
export type IAccountVerificationValues = IAccountVerificationPayload
