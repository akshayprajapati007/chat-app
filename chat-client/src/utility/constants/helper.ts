import { toast } from "react-toastify"
import CryptoJS from "crypto-js"
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
      toast.error(error.response.data.error)
    }
  }

  console.error("error", error)
  extractErrorMessage(error)
}

export const encryptMessage = (message: string) => {
  const cipherText = CryptoJS.AES.encrypt(message, CHAT_SECRET_KEY).toString()
  return cipherText
}

export const decryptMessage = (cipherText: string) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, CHAT_SECRET_KEY)
  const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8)
  return decryptedMessage
}
