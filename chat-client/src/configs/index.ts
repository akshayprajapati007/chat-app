import { DEVELOPMENT_LABEL_S } from "utility/constants/messages"

export const BASE_URL = process.env.REACT_APP_API_SERVER
export const API_VERSION_1 = "/v1"
export const LOGIN_URL = process.env.REACT_APP_LOGIN_PAGE_URL
export const CURRENT_ENVIRONMENT = process.env.REACT_APP_NODE_ENV
export const IS_DEVELOPMENT_MODE = CURRENT_ENVIRONMENT === DEVELOPMENT_LABEL_S
export const APP_VERSION = process.env.REACT_APP_VERSION
export const CHAT_SECRET_KEY = process.env.REACT_APP_CHAT_SECRET_KEY as string

export const SIGN_UP_ENDPOINT = "/sign_up"
export const SIGN_IN_ENDPOINT = "/sign_in"
export const SIGN_OUT_ENDPOINT = "/sign_out"
export const SEND_OTP_ENDPOINT = "/send_otp"
export const ACCOUNT_VERIFICATION_ENDPOINT = "/account_verification"
export const UPDATE_PROFILE_ENDPOINT = "/update_profile"
export const UPDATE_PROFILE_IMAGE_ENDPOINT = "/update_profile_image"
export const GET_USER_DETAILS_ENDPOINT = "/get_user_details"
export const GET_USER_BY_CHAT_ID_ENDPOINT = "/get_user_by_chat_id"
export const GET_USER_PROFILE_META_DATA_ENDPOINT = "/get_user_profile_meta_data"
export const SEARCH_USERS_ENDPOINT = "/search_users"
export const FRIEND_REQUEST_ENDPOINT = "/friend_request"
export const REMOVE_FRIEND_ENDPOINT = "/remove_friend"
export const FRIENDS_ENDPOINT = "/friends"
export const FRIEND_REQUESTS_LIST_ENDPOINT = "/friend_requests_list"
export const CHATS_ENDPOINT = "/chats"
export const ACCESS_CHAT_ENDPOINT = "/access_chat"
export const GET_MESSAGES_ENDPOINT = "/get_messages"
export const SEND_MESSAGE_ENDPOINT = "/send_message"
