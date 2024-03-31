/* eslint-disable import/no-cycle */
import { AxiosResponse } from "axios"
import Cookies from "js-cookie"
import {
  IS_DEVELOPMENT_MODE,
  SIGN_IN_ENDPOINT,
  SIGN_OUT_ENDPOINT,
} from "configs"
import { ISIgnInPayload, ISignInResponse } from "utility/interfaces/sign-in"
import {
  PERSIST_STORE_PREFIX_KEY,
  TOKEN_NAME,
  USER_SLICE_KEY,
} from "utility/constants"
import { AppRoutings } from "utility/enums/app-routings"
import httpClient from "services/base-service"

const getAuthToken = (): string | undefined => Cookies.get(TOKEN_NAME)

const setAuthToken = (token: string): string | undefined =>
  Cookies.set(TOKEN_NAME, token)

const isCurrentSessionValid = (): boolean => !!getAuthToken()

const terminateSession = (): Promise<AxiosResponse<object>> =>
  httpClient.post(SIGN_OUT_ENDPOINT)

const redirectToLoginPage = () => {
  if (IS_DEVELOPMENT_MODE) {
    window.location.href = AppRoutings.SignIn
    return
  }
  window.location.href = `${window.location.protocol}//${window.location.host}`
}

const signOut = () => {
  terminateSession().then((response) => {
    terminateLocalSession()
  })
}

const terminateLocalSession = () => {
  Cookies.remove(TOKEN_NAME)
  localStorage.removeItem(`${PERSIST_STORE_PREFIX_KEY}${USER_SLICE_KEY}`)
  //store.dispatch(resetUserDetails())
  redirectToLoginPage()
}

const signIn = async (
  payload: ISIgnInPayload
): Promise<AxiosResponse<ISignInResponse>> => {
  return await httpClient.post(SIGN_IN_ENDPOINT, payload)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAuthToken,
  setAuthToken,
  isCurrentSessionValid,
  signIn,
  signOut,
  terminateLocalSession,
}
