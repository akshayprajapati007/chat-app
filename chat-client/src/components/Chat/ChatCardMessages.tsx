import { useEffect, useRef, useState } from "react"
import { Box, CircularProgress, Tooltip, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import clsx from "clsx"
import { useParams } from "react-router-dom"
import moment from "moment"
import queryString from "query-string"
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
import {
  DAY_LABEL,
  DAYS_LABEL,
  NO_MESSAGES_LABEL,
  TODAY_LABEL,
  YEAR_LABEL,
  YESTERDAY_LABEL,
} from "utility/constants/messages"
import {
  DATE_MONTH_FORMAT,
  DATE_DAY_FORMAT,
  PER_REQUEST_MESSAGE_LIMIT,
  DATE_MONTH_YEAR_FORMAT,
} from "utility/constants"

const useStyles = makeStyles((theme: Theme) => ({
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    height: "100%",
    overflowY: "auto",
    paddingRight: "4px",
  },
  messageWrapper: {
    alignSelf: "flex-start",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "2px",
  },
  message: {
    padding: "5px 14px",
    borderRadius: "20px",
    backgroundColor: "#f7f7f7",
    fontWeight: "500 !important",
    color: theme.palette.grey[800],
    wordBreak: "break-word",
    maxWidth: "85%",
    fontFamily: "'Montserrat', sans-serif",
  },
  selfMessageWrapper: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  selfMessage: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
  },
  senderChange: {
    marginBottom: "15px !important",
  },
  messageTime: {
    fontSize: "0.7rem !important",
    color: theme.palette.grey[600],
    padding: "0px 4px",
  },
  emptyMessageWrapper: {
    height: "100%",
    display: "flex",
    gap: "2px",
    alignItems: "center",
    justifyContent: "center",
  },
  messageSeparatorWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    margin: "10px 15px",
  },
  messageSeparator: {
    height: "1px",
    backgroundColor: "#d0d0d0",
    flex: 1,
  },
  messageSeparatorDate: {
    fontWeight: "600 !important",
    textAlign: "center",
    color: "rgba(0,0,0,0.38)",
    fontSize: "0.85rem !important",
  },
}))

const ChatCardMessages = () => {
  let messagesDate: string = ""
  const classes = useStyles()
  const { chatId } = useParams()
  const { emit } = useSocket()
  const dispatch = useAppDispatch()
  const observer = useRef<IntersectionObserver | null>(null)
  const observedMessages = useRef(new Set())
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isMoreLoading, setMoreIsLoading] = useState(false)
  const [previousScrollHeight, setPreviousScrollHeight] = useState(0)
  const lastMessageRef = useRef<HTMLDivElement>(null)
  const messageContainerRef = useRef<HTMLDivElement>(null)
  const userDetails = useAppSelector((state: RootState) => state.user)
  const { messages } = useAppSelector((state: RootState) => state.message)
  const messagesLength = messages.length

  useEffect(() => {
    handleGetMessages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    if (chatId) {
      emit(SOCKET_JOIN_ROOM, chatId)
      page === 1 && getMessages()
      setPage(1)
      setTotalPages(0)
      setPreviousScrollHeight(0)
      dispatch(setMessages([]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId])

  const handleScroll = () => {
    if (
      messageContainerRef.current &&
      messageContainerRef.current.scrollTop === 0 &&
      page < totalPages
    ) {
      setPage((page) => page + 1)
    }
  }

  useEffect(() => {
    const chatContainer = messageContainerRef.current

    if (chatContainer) {
      const currentScrollHeight = chatContainer.scrollHeight
      chatContainer.scrollTop =
        page === 1
          ? currentScrollHeight
          : currentScrollHeight - previousScrollHeight - 80
      setPreviousScrollHeight(currentScrollHeight)
      chatContainer.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length, totalPages])

  useEffect(() => {
    if (!messageContainerRef.current) return

    if (!observer.current) {
      observer.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageId = entry.target.getAttribute("data-id")
            if (messageId && !observedMessages.current.has(messageId)) {
              console.log("here", messageId)
              observedMessages.current.add(messageId)
            }
          }
        })
      })
    }

    const messageContainer = messageContainerRef.current
    const messageElements = messageContainer.querySelectorAll(".message")

    messageElements.forEach((el) => {
      const messageId = el.getAttribute("data-id")
      if (messageId && !observedMessages.current.has(messageId)) {
        observer.current && observer.current.observe(el)
      }
    })

    const mutationObserver = new MutationObserver(() => {
      const newMessageElements = messageContainer.querySelectorAll(".message")
      newMessageElements.forEach((el) => {
        const messageId = el.getAttribute("data-id")
        if (messageId && !observedMessages.current.has(messageId)) {
          observer.current && observer.current.observe(el)
        }
      })
    })

    mutationObserver.observe(messageContainer, {
      childList: true,
      subtree: true,
    })

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
      mutationObserver.disconnect()
    }
  }, [messages])

  const handleGetMessages = () => {
    if (chatId) {
      getMessages()
    } else {
      dispatch(setMessages([]))
    }
  }

  const getMessages = async () => {
    const isFirstPage = page === 1
    try {
      isFirstPage ? setIsLoading(true) : setMoreIsLoading(true)
      const query = queryString.stringify({
        page,
        per: PER_REQUEST_MESSAGE_LIMIT,
      })
      const response = await chatService.getMessages(chatId as string, query)
      const {
        data: {
          data: { totalPages, messages: currentMessages },
        },
      } = response
      setTotalPages(totalPages)
      messagesDate = ""
      dispatch(setMessages([...currentMessages, ...messages]))
    } catch (error: any) {
      handleCatchError(error)
    } finally {
      setIsLoading(false)
      setMoreIsLoading(false)
    }
  }

  const formatDate = (datetimeString: string) => {
    const parsedDate = moment(datetimeString)
    const today = moment().startOf(DAY_LABEL)
    const yesterday = moment().subtract(1, DAYS_LABEL).startOf(DAY_LABEL)
    const startOfWeek = moment().subtract(6, DAYS_LABEL).startOf(DAY_LABEL)

    if (parsedDate.isSame(today, DAY_LABEL)) {
      return TODAY_LABEL
    } else if (parsedDate.isSame(yesterday, DAY_LABEL)) {
      return YESTERDAY_LABEL
    } else if (parsedDate.isAfter(startOfWeek)) {
      return parsedDate.format(DATE_DAY_FORMAT)
    } else if (parsedDate.isSame(moment(), YEAR_LABEL)) {
      return parsedDate.format(DATE_MONTH_FORMAT)
    } else {
      return parsedDate.format(DATE_MONTH_YEAR_FORMAT)
    }
  }

  return (
    <Box className={classes.mainWrapper} ref={messageContainerRef}>
      {isMoreLoading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress size={20} />
        </Box>
      )}
      <CustomLoaderContainer isLoading={isLoading}>
        {messagesLength > 0 ? (
          <Box>
            {messages.map((messageInfo: IMessage, index: number) => {
              const { _id, message, sender, createdAt } = messageInfo
              const isOwnMessage = sender === userDetails._id
              const isSenderChange =
                index + 1 < messagesLength &&
                messages[index + 1].sender !== sender
              const date = moment(createdAt).format("DD/MM/YYYY")
              let displayDate = null
              if (messagesDate !== date) {
                messagesDate = date
                displayDate = formatDate(createdAt)
              }

              return (
                <div key={_id} data-id={_id} className="message">
                  {displayDate && (
                    <Box className={classes.messageSeparatorWrapper}>
                      <Box className={classes.messageSeparator} />
                      <Typography className={classes.messageSeparatorDate}>
                        {displayDate}
                      </Typography>
                      <Box className={classes.messageSeparator} />
                    </Box>
                  )}
                  <div
                    className={clsx(classes.messageWrapper, {
                      [classes.selfMessageWrapper]: isOwnMessage,
                      [classes.senderChange]: isSenderChange,
                    })}
                  >
                    <Tooltip
                      placement="bottom"
                      title={moment(createdAt).format("ll, LT")}
                    >
                      <Typography
                        className={clsx(classes.message, {
                          [classes.selfMessage]: isOwnMessage,
                        })}
                      >
                        {decryptMessage(message)}
                      </Typography>
                    </Tooltip>
                    <Typography className={classes.messageTime}>
                      {moment(createdAt).format("HH:mm")}
                    </Typography>
                  </div>
                </div>
              )
            })}
            <div ref={lastMessageRef} />
          </Box>
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
