import { AxiosResponse } from "axios"
import { UPDATE_PROFILE_ENDPOINT, UPDATE_PROFILE_IMAGE } from "configs"
import httpClient from "services/base-service"
import {
  IProfilePayload,
  IProfileResponse,
  IProfileImagePayload,
  IProfileImageResponse,
} from "utility/interfaces/profile"

const updateProfile = async (
  payload: IProfilePayload
): Promise<AxiosResponse<IProfileResponse>> => {
  return await httpClient.post(UPDATE_PROFILE_ENDPOINT, payload)
}

const updateProfileImage = async (
  payload: IProfileImagePayload
): Promise<AxiosResponse<IProfileImageResponse>> => {
  return await httpClient.post(UPDATE_PROFILE_IMAGE, payload)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  updateProfile,
  updateProfileImage,
}
