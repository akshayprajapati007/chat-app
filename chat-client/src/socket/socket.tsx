import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import io, { Socket } from "socket.io-client"
import { BASE_URL } from "configs"

// export const socketIo = io(BASE_URL as string, {
//   query: { token: "" },
// })

interface SocketContextProps {
  socket: Socket | null
  emit: (event: string, data?: any) => void
  initializeSocket: (token: string) => Socket
  disconnectSocket: () => void
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined)

interface SocketProviderProps {
  children: ReactNode
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  const initializeSocket = (token: string): Socket => {
    const newSocket = io(BASE_URL as string, {
      auth: {
        token,
      },
    })

    setSocket(newSocket)

    newSocket.on("connect", () => {
      console.log("Socket connected")
    })

    newSocket.on("disconnect", () => {
      console.log("Socket disconnected")
    })

    // Add other event listeners or configurations as needed

    return newSocket
  }

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect()
    }
  }

  const emit = (event: string, data?: any) => {
    if (socket) {
      socket.emit(event, data)
    }
  }

  useEffect(() => {
    return () => {
      disconnectSocket()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])

  const contextValue: SocketContextProps = {
    socket,
    emit,
    initializeSocket,
    disconnectSocket,
  }

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  )
}

const useSocket = (): SocketContextProps => {
  const context = useContext(SocketContext)
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider")
  }
  return context
}

export { SocketContext, SocketProvider, useSocket }
