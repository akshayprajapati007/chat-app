import { useEffect, useState } from "react"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import { useNavigate, useParams } from "react-router-dom"
import clsx from "clsx"
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded"
import chatService from "services/chat-service"
import { IChatList } from "utility/interfaces/chat"
import { useAppDispatch, useAppSelector } from "hooks/storeHook"
import {
  setChatListLoader,
  setActiveChat,
  setChatList,
} from "store/slices/chatSlice"
import { AppRoutings } from "utility/enums/app-routings"
import {
  CANCEL_LABEL,
  CHATS_LABEL,
  START_NEW_CHAT_LABEL,
} from "utility/constants/messages"
import { handleCatchError } from "utility/constants/helper"
import { RootState } from "store/store"
import NewChat from "./NewChat"
import ChatList from "./ChatList"

const useStyles = makeStyles((theme: Theme) => ({
  chatHeadingWrapper: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: "8px",
  },
  chatsHeading: {
    fontFamily: "'Montserrat', sans-serif",
    color: theme.palette.primary.light,
  },
  chatListContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    overflowY: "scroll",
    height: "calc(100vh - 220px)",
  },
  createChatButton: {
    transition: "all 0.3s !important",
  },
  createChatCloseButton: {
    transform: "rotate(45deg)",
  },
}))

const ChatSidebar = () => {
  const classes = useStyles()
  const routeParams = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isStartNewChat, setIsStartNewChat] = useState(false)
  const { chatList } = useAppSelector((state: RootState) => state.chat)

  useEffect(() => {
    getChatsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setIsStartNewChat(false)
    handleChatSelection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatList, routeParams.id])

  const toggleStartNewChat = () => {
    setIsStartNewChat((isStartNewChat) => !isStartNewChat)
  }

  const handleChatSelection = () => {
    const firstChat = chatList.length > 0 ? chatList[0] : null
    let activeChat: IChatList | null = firstChat
    if (routeParams && routeParams.id) {
      const selectedChat = chatList.find(
        (chat: IChatList) => chat._id === routeParams.id
      )
      activeChat = selectedChat || firstChat
    }

    if (activeChat) {
      dispatch(setActiveChat(activeChat))
      if (!(routeParams && routeParams.id))
        navigate(`${AppRoutings.Chats}/${activeChat._id}`)
    }
  }

  const getChatsList = async () => {
    dispatch(setChatListLoader(true))
    try {
      const res = await chatService.getChatsList()
      dispatch(setChatList(res.data.data))
    } catch (error: any) {
      handleCatchError(error)
    } finally {
      dispatch(setChatListLoader(false))
    }
  }

  return (
    <>
      <Box className={classes.chatHeadingWrapper}>
        <Typography variant="h6" className={classes.chatsHeading}>
          {isStartNewChat ? START_NEW_CHAT_LABEL : CHATS_LABEL}
        </Typography>
        <Tooltip title={isStartNewChat ? CANCEL_LABEL : START_NEW_CHAT_LABEL}>
          <IconButton
            onClick={toggleStartNewChat}
            className={clsx(classes.createChatButton, {
              [classes.createChatCloseButton]: isStartNewChat,
            })}
          >
            <AddCircleOutlineRoundedIcon color="action" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box className={classes.chatListContainer}>
        {isStartNewChat ? <NewChat /> : <ChatList />}
      </Box>
    </>
  )
}

export default ChatSidebar
