export interface ISIgnInPayload {
  email: string
  password: string
}

export interface ISignInResponse {
  token: string
  isEmailVerified: boolean
  success: boolean
}

export interface ISignInValues {
  email: string
  password: string
}
