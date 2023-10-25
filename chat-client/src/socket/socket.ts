import io from "socket.io-client"
import { BASE_URL } from "configs"

export const socketIo = io(BASE_URL as string)