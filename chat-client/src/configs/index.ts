export const BASE_URL = process.env.REACT_APP_API_SERVER
export const API_VERSION_1 = "/v1"
export const LOGIN_URL = process.env.REACT_APP_LOGIN_PAGE_URL
export const CURRENT_ENVIRONMENT = process.env.REACT_APP_NODE_ENV
export const IS_DEVELOPMENT_MODE = CURRENT_ENVIRONMENT === "development"
export const APP_VERSION = process.env.REACT_APP_VERSION

export const SIGN_UP_ENDPOINT = "/sign-up"
export const SIGN_IN_ENDPOINT = "/sign-in"
export const SIGN_OUT_ENDPOINT = "/sign-out"
export const SEND_OTP_ENDPOINT = "/send-otp"
export const ACCOUNT_VERIFICATION_ENDPOINT = "/account-verification"
