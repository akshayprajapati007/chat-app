import { useEffect, useState } from "react"
import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import { useNavigate, useParams } from "react-router-dom"
import clsx from "clsx"
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded"
import chatService from "services/chat-service"
import { useAppDispatch, useAppSelector } from "hooks/storeHook"
import { setChatListLoader, setChatList } from "store/slices/chatSlice"
import {
  CANCEL_LABEL,
  CHATS_LABEL,
  START_NEW_CHAT_LABEL,
} from "utility/constants/messages"
import { handleCatchError } from "utility/constants/helper"
import { RootState } from "store/store"
import NewChat from "./NewChat"
import ChatList from "./ChatList"
import { AppRoutings } from "utility/enums/app-routings"

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
    height: "calc(100vh - 216px)",
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
  const { chatId } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isStartNewChat, setIsStartNewChat] = useState(false)
  const isMobileScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  )
  const { chatList } = useAppSelector((state: RootState) => state.chat)

  useEffect(() => {
    getChatsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setIsStartNewChat(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatList, chatId])

  const toggleStartNewChat = () => {
    setIsStartNewChat((isStartNewChat) => !isStartNewChat)
  }

  const getChatsList = async () => {
    chatList.length === 0 && dispatch(setChatListLoader(true))
    try {
      const res = await chatService.getChatsList()
      dispatch(setChatList(res.data.data))
      if (!isMobileScreen && res.data.data.length > 0) {
        navigate(`${AppRoutings.Chats}/${res.data.data[0]._id}`)
      }
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
