import { useEffect } from "react"
import { Box, IconButton, Tooltip, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import { useNavigate, useParams } from "react-router-dom"
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded"
import ChatSidebarCard from "components/Chat/ChatSidebarCard"
import chatService from "services/chat-service"
import { IChatList } from "utility/interfaces/chat"
import { useAppDispatch, useAppSelector } from "hooks/storeHook"
import {
  setChatListLoader,
  setActiveChat,
  setChatList,
} from "store/slices/chatSlice"
import { AppRoutings } from "utility/enums/app-routings"
import { CHATS_LABEL, CREATE_NEW_CHAT_LABEL } from "utility/constants/messages"
import { handleCatchError } from "utility/constants/helper"
import CustomLoaderContainer from "components/CustomLoaderContainer"
import { RootState } from "store/store"

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
}))

const ChatSidebar = () => {
  const classes = useStyles()
  const routeParams = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { chatListLoader, chatList } = useAppSelector(
    (state: RootState) => state.chat
  )

  useEffect(() => {
    getChatsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleChatSelection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatList, routeParams.id])

  const handleChatSelection = () => {
    const firstChat = chatList.length > 0 ? chatList[0] : null
    let activeChat: IChatList | null = null
    if (routeParams && routeParams.id) {
      const selectedChat = chatList.find(
        (chat: IChatList) => chat._id === routeParams.id
      )
      activeChat = selectedChat || firstChat
    } else {
      activeChat = firstChat
    }
    if (activeChat) {
      dispatch(setActiveChat(activeChat))
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
          {CHATS_LABEL}
        </Typography>
        <Tooltip title={CREATE_NEW_CHAT_LABEL}>
          <IconButton>
            <AddCircleOutlineRoundedIcon color="action" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box className={classes.chatListContainer}>
        <CustomLoaderContainer isLoading={chatListLoader}>
          {chatList.map((chatInfo: IChatList) => {
            return <ChatSidebarCard key={chatInfo._id} chatInfo={chatInfo} />
          })}
        </CustomLoaderContainer>
      </Box>
    </>
  )
}

export default ChatSidebar
