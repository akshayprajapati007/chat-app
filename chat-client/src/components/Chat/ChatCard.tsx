import { useEffect } from "react"
import { Box, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import ChatRoundedIcon from "@mui/icons-material/ChatRounded"
import ChatCardUserInfo from "components/Chat/ChatCardUserInfo"
import ChatCardMessages from "components/Chat/ChatCardMessages"
import ChatCardInput from "components/Chat/ChatCardInput"
import { RootState } from "store/store"
import { useAppDispatch, useAppSelector } from "hooks/storeHook"
import { NO_CHAT_SELECTED_LABEL } from "utility/constants/messages"
import CustomLoaderContainer from "components/CustomLoaderContainer"
import { IMessage } from "utility/interfaces/chat"
import { updateMessages } from "store/slices/messageSlice"
import { SOCKET_MESSAGE_RECEIVED } from "socket/socketEventsConstants"
import { useSocket } from "socket/socket"
import {
  setActiveChat,
  setChatList,
  setChatListLoader,
} from "store/slices/chatSlice"
import chatService from "services/chat-service"
import { handleCatchError } from "utility/constants/helper"

const useStyles = makeStyles((theme: Theme) => ({
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    height: "calc(100vh - 158px)",
    gap: "10px",
  },
  emptyMessageWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px",
    color: "#9e9e9e",
    height: "100%",
  },
}))

const ChatCard = () => {
  const classes = useStyles()
  const { socket } = useSocket()
  const dispatch = useAppDispatch()
  const { chatListLoader, chatList, activeChat } = useAppSelector(
    (state: RootState) => state.chat
  )

  useEffect(() => {
    const handleSocketMessageReceived = (newMessage: IMessage) => {
      console.log("here", newMessage)
      if (newMessage.chat === activeChat._id) {
        dispatch(updateMessages(newMessage))
      } else if (chatList.length === 0) {
        getChatsList(newMessage)
      }
    }

    socket && socket.on(SOCKET_MESSAGE_RECEIVED, handleSocketMessageReceived)

    return () => {
      socket && socket.off(SOCKET_MESSAGE_RECEIVED, handleSocketMessageReceived)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChat._id])

  const getChatsList = async (newMessage: IMessage) => {
    dispatch(setChatListLoader(true))
    try {
      const res = await chatService.getChatsList()
      dispatch(setChatList(res.data.data))
      dispatch(setActiveChat(res.data.data[0]))
      dispatch(updateMessages(newMessage))
    } catch (error: any) {
      handleCatchError(error)
    } finally {
      dispatch(setChatListLoader(false))
    }
  }

  return (
    <Box className={classes.mainWrapper}>
      <CustomLoaderContainer isLoading={chatListLoader}>
        {activeChat._id ? (
          <>
            <ChatCardUserInfo />
            <ChatCardMessages />
            <ChatCardInput />
          </>
        ) : (
          <Box className={classes.emptyMessageWrapper}>
            <ChatRoundedIcon fontSize="large" />
            <Typography variant="h4" mb={1}>
              {NO_CHAT_SELECTED_LABEL}
            </Typography>
          </Box>
        )}
      </CustomLoaderContainer>
    </Box>
  )
}

export default ChatCard
