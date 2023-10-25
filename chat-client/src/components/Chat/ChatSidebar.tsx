import { Box, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import ChatSidebarCard from "components/Chat/ChatSidebarCard"

const useStyles = makeStyles((theme: Theme) => ({
  chatsHeading: {
    fontFamily: "'Montserrat', sans-serif",
    color: theme.palette.primary.light,
  },
  chatListContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    overflowY: "scroll",
    height: "calc(100vh - 203px)",
  },
}))

const ChatSidebar = () => {
  const classes = useStyles()
  return (
    <>
      <Box pb={1}>
        <Typography variant="h6" className={classes.chatsHeading}>
          Chats
        </Typography>
      </Box>
      <Box className={classes.chatListContainer}>
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
        <ChatSidebarCard />
      </Box>
    </>
  )
}

export default ChatSidebar
