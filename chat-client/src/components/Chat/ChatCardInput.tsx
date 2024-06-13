import { useEffect, useState } from "react"
import { Box, InputAdornment, IconButton } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import clsx from "clsx"
import TextField from "components/TextField"
import SendIcon from "@mui/icons-material/SendRounded"
import { useAppDispatch, useAppSelector } from "hooks/storeHook"
import { RootState } from "store/store"
import chatService from "services/chat-service"
import { setMessages, updateMessages } from "store/slices/messageSlice"
import { useSocket } from "socket/socket"
import { SOCKET_MESSAGE } from "socket/socketEventsConstants"
import { IMessage } from "utility/interfaces/chat"
import { encryptMessage, handleCatchError } from "utility/constants/helper"
import { useParams } from "react-router-dom"

const useStyles = makeStyles((theme: Theme) => ({
  mainWrapper: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginTop: "10px",
  },
  sendIcon: {
    marginRight: "-2px",
    paddingLeft: "2px",
  },
  activeSendIcon: {
    color: theme.palette.primary.main,
  },
}))

const ChatCardInput = () => {
  const classes = useStyles()
  const { emit } = useSocket()
  const { chatId } = useParams()
  const dispatch = useAppDispatch()
  const [message, setMessage] = useState("")
  const [tempMessageId, setTempMessageId] = useState("")
  const [tempMessage, setTempMessage] = useState<IMessage | null>(null)
  const userDetails = useAppSelector((state: RootState) => state.user)
  const { messages } = useAppSelector((state: RootState) => state.message)

  useEffect(() => {
    if (tempMessage) {
      const updatedMessages = messages.map((msg: IMessage) =>
        msg._id === tempMessageId ? tempMessage : msg
      )
      dispatch(setMessages(updatedMessages))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tempMessage])

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleLocalUpdateMessage = (newMessage: IMessage) => {
    dispatch(updateMessages(newMessage))
    setMessage("")
  }

  const handleMessageSend = async () => {
    try {
      const encryptedMessage = encryptMessage(message)

      const optimisticMessageId = Date.now().toString()
      const optimisticMessage = {
        _id: optimisticMessageId,
        message: encryptedMessage,
        sender: userDetails._id,
        createdAt: optimisticMessageId,
        updatedAt: optimisticMessageId,
        chat: chatId as string,
      }
      handleLocalUpdateMessage(optimisticMessage)
      setTempMessageId(optimisticMessageId)

      const messageDetails = {
        message: encryptedMessage,
        chatId: chatId as string,
      }
      const response = await chatService.sendMessage(messageDetails)
      setTempMessage(response.data.data)
      emit(SOCKET_MESSAGE, response.data.data)
    } catch (error: any) {
      handleCatchError(error)
    }
  }

  const handleMessageSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleMessageSend()
  }

  return (
    <Box>
      <form noValidate onSubmit={handleMessageSubmit}>
        <Box className={classes.mainWrapper}>
          <TextField
            value={message}
            autoComplete="off"
            onChange={handleMessageChange}
            placeholder="Type a message..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" disabled={!message}>
                    <SendIcon
                      className={clsx(classes.sendIcon, {
                        [classes.activeSendIcon]: message,
                      })}
                      fontSize="small"
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </form>
    </Box>
  )
}

export default ChatCardInput
