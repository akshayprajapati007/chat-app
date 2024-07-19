import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react"
import io, { Socket } from "socket.io-client"
import { BASE_URL } from "configs"

interface SocketContextProps {
  socket: Socket | null
  emit: (event: string, data?: any) => void
  initializeSocket: (token: string) => Socket
  disconnectSocket: () => void
  removeEventListener: (event: string) => void
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined)

interface SocketProviderProps {
  children: ReactNode
}

const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)

  const initializeSocket = useCallback((token: string): Socket => {
    if (!token) {
      throw new Error("Token must be provided to initialize socket connection")
    }

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

    return newSocket
  }, [])

  const disconnectSocket = useCallback(() => {
    if (socket) {
      socket.off()
      socket.disconnect()
      setSocket(null)
    }
  }, [socket])

  const removeEventListener = useCallback(
    (event: string) => {
      socket?.off(event)
    },
    [socket]
  )

  const emit = useCallback(
    (event: string, data?: any) => {
      socket?.emit(event, data)
    },
    [socket]
  )

  useEffect(() => {
    return () => {
      disconnectSocket()
    }
  }, [disconnectSocket])

  const contextValue: SocketContextProps = {
    socket,
    emit,
    initializeSocket,
    disconnectSocket,
    removeEventListener,
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
