import { useEffect, useRef, useState } from "react"
import { Box, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import clsx from "clsx"
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded"
import { RootState } from "store/store"
import { useAppDispatch, useAppSelector } from "hooks/storeHook"
import chatService from "services/chat-service"
import CustomLoaderContainer from "components/CustomLoaderContainer"
import { IMessage } from "utility/interfaces/chat"
import { setMessages } from "store/slices/messageSlice"
import { useSocket } from "socket/socket"
import { SOCKET_JOIN_ROOM } from "socket/socketEventsConstants"
import { decryptMessage, handleCatchError } from "utility/constants/helper"
import { NO_MESSAGES_LABEL } from "utility/constants/messages"
import { useParams } from "react-router-dom"

const useStyles = makeStyles((theme: Theme) => ({
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    height: "100%",
    overflowY: "auto",
    paddingRight: "4px",
  },
  message: {
    padding: "6px 14px",
    borderRadius: "15px",
    backgroundColor: "#f7f7f7",
    fontWeight: "500 !important",
    color: theme.palette.grey[800],
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 2px 4px",
    alignSelf: "flex-start",
    maxWidth: "85%",
    wordBreak: "break-word",
    fontFamily: "'Montserrat', sans-serif",
  },
  selfMessage: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    alignSelf: "flex-end",
  },
  senderChange: {
    marginBottom: "15px !important",
  },
  emptyMessageWrapper: {
    height: "100%",
    display: "flex",
    gap: "2px",
    alignItems: "center",
    justifyContent: "center",
  },
}))

const ChatCardMessages = () => {
  const classes = useStyles()
  const { emit } = useSocket()
  const dispatch = useAppDispatch()
  const { chatId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const userDetails = useAppSelector((state: RootState) => state.user)
  const { messages } = useAppSelector((state: RootState) => state.message)

  useEffect(() => {
    handleGetMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId])

  const handleGetMessages = () => {
    if (chatId) {
      getMessages()
    } else {
      dispatch(setMessages([]))
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({
          block: "end",
        })
      }
    }, 1)
  }, [messages.length])

  const getMessages = async () => {
    try {
      setIsLoading(true)
      const response = await chatService.getMessages(chatId as string)
      dispatch(setMessages(response.data.data))
      emit(SOCKET_JOIN_ROOM, chatId)
    } catch (error: any) {
      handleCatchError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box className={classes.mainWrapper}>
      <CustomLoaderContainer isLoading={isLoading}>
        {messages.length > 0 ? (
          <>
            {messages.map((messageInfo: IMessage, index: number) => {
              const { _id, message, sender } = messageInfo
              const isSenderChange =
                index + 1 < messages.length &&
                messages[index + 1].sender !== sender

              return (
                <div
                  key={_id}
                  className={clsx(classes.message, {
                    [classes.selfMessage]: sender === userDetails._id,
                    [classes.senderChange]: isSenderChange,
                  })}
                >
                  <Typography>{decryptMessage(message)}</Typography>
                </div>
              )
            })}
            <div ref={lastMessageRef} />
          </>
        ) : (
          <Box className={classes.emptyMessageWrapper}>
            <QuestionAnswerRoundedIcon color="action" />
            <Typography variant="h6" color="GrayText">
              {NO_MESSAGES_LABEL}
            </Typography>
          </Box>
        )}
      </CustomLoaderContainer>
    </Box>
  )
}

export default ChatCardMessages
