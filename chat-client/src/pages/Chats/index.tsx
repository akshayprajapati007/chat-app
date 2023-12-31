import { useEffect } from "react"
import { Box } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import Layout from "components/Layout"
import ChatSidebar from "components/Chat/ChatSidebar"
import NavigatorTree from "components/NavigatorTree"
import { INavigator } from "utility/interfaces/common"
import { AppRoutings } from "utility/enums/app-routings"
import ChatCard from "components/Chat/ChatCard"
import { socketIo } from "socket/socket"
import { useAppDispatch, useAppSelector } from "hooks/storeHook"
import { RootState } from "store/store"
import { SOCKET_JOIN } from "socket/socketEventsConstants"
import { resetChatState } from "store/slices/chatSlice"
import { resetMessages } from "store/slices/messageSlice"
import { CHATS_LABEL, HOME_LABEL } from "utility/constants/messages"

const useStyles = makeStyles((theme: Theme) => ({
  mainWrapper: {
    display: "flex",
    gap: "10px",
    paddingTop: "15px",
  },
  chatSidebarWrapper: {
    width: "320px",
    border: "2px solid #f0f0f0",
    borderRadius: "8px",
    padding: "10px 8px 15px 15px",
  },
  singleChatWrapper: {
    flex: "2 1 600px",
    border: "2px solid #f0f0f0",
    borderRadius: "8px",
  },
}))

const Chats = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const userDetails = useAppSelector((state: RootState) => state.user)

  useEffect(() => {
    socketIo.emit(SOCKET_JOIN, userDetails._id)

    return () => {
      dispatch(resetChatState())
      dispatch(resetMessages())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigators: INavigator[] = [
    {
      heading: HOME_LABEL,
      link: AppRoutings.Home,
    },
    {
      heading: CHATS_LABEL,
      link: AppRoutings.Chats,
    },
  ]

  return (
    <Layout>
      <NavigatorTree navigators={navigators} />
      <Box className={classes.mainWrapper}>
        <Box className={classes.chatSidebarWrapper}>
          <ChatSidebar />
        </Box>
        <Box className={classes.singleChatWrapper}>
          <ChatCard />
        </Box>
      </Box>
    </Layout>
  )
}

export default Chats
