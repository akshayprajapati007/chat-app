/* eslint-disable import/no-cycle */
import { AxiosResponse } from "axios"
import {
  IS_DEVELOPMENT_MODE,
  SIGN_IN_ENDPOINT,
  SIGN_OUT_ENDPOINT,
} from "configs"
import { ISIgnInPayload, ISignInResponse } from "utility/interfaces/sign-in"
import Cookies from "js-cookie"
import { TOKEN_NAME } from "utility/constants"
import { AppRoutings } from "utility/enums/app-routings"
import httpClient from "services/base-service"
import store from "store/store"
import { resetUserDetails } from "store/slices/userSlice"

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

const signOut = (): Promise<AxiosResponse<any>> => {
  terminateSession().then((response) => {
    terminateLocalSession()
    return response
  })
  return Promise.reject()
}

const terminateLocalSession = () => {
  Cookies.remove(TOKEN_NAME)
  store.dispatch(resetUserDetails())
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
