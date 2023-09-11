/* eslint-disable import/no-cycle */
import { AxiosResponse } from "axios"
import {
  SIGN_UP_ENDPOINT,
  ACCOUNT_VERIFICATION_ENDPOINT,
  SEND_OTP_ENDPOINT,
} from "configs"
import {
  ISignUpPayload,
  IAccountVerificationPayload,
  ISendOTPPayload,
  ISendOTPResponse,
  ISignUpResponse,
  IAccountVerificationResponse,
} from "utility/interfaces/sign-up"
import httpClient from "./base-service"

const signUp = async (
  payload: ISignUpPayload
): Promise<AxiosResponse<ISignUpResponse>> => {
  return await httpClient.post(SIGN_UP_ENDPOINT, payload)
}

const sendOTP = async (
  payload: ISendOTPPayload
): Promise<AxiosResponse<ISendOTPResponse>> => {
  return await httpClient.post(SEND_OTP_ENDPOINT, payload)
}

const verifyAccount = async (
  payload: IAccountVerificationPayload
): Promise<AxiosResponse<IAccountVerificationResponse>> => {
  return await httpClient.post(ACCOUNT_VERIFICATION_ENDPOINT, payload)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  signUp,
  sendOTP,
  verifyAccount,
}
