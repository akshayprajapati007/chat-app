import { toast } from "react-toastify"
import CryptoJS from "crypto-js"
import { SOMETHING_WENT_WRONG_MESSAGE } from "./messages"
import { CHAT_SECRET_KEY } from "configs"

export const fileToBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) reject("Error")
      else resolve(reader.result as string)
    }

    reader.onerror = (error) => reject("Error" + error)
  })
}

export const handleCatchError = (error: any) => {
  const extractErrorMessage = (error: any) => {
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error
    ) {
      return error.response.data.error
    } else {
      return SOMETHING_WENT_WRONG_MESSAGE
    }
  }

  console.error("error", error)
  const errorMessage = extractErrorMessage(error)
  toast.error(errorMessage)
}

export const encryptMessage = (message: string) => {
  console.log(CHAT_SECRET_KEY)
  const cipherText = CryptoJS.AES.encrypt(message, CHAT_SECRET_KEY).toString()
  return cipherText
}

export const decryptMessage = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, CHAT_SECRET_KEY)
  const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8)
  return decryptedMessage
}
