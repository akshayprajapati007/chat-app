import { Box } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import ChatCardUserInfo from "components/Chat/ChatCardUserInfo"
import ChatCardMessages from "components/Chat/ChatCardMessages"
import ChatCardInput from "components/Chat/ChatCardInput"

const useStyles = makeStyles((theme: Theme) => ({
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    height: "calc(100vh - 158px)",
    gap: "10px",
  },
}))

const ChatCard = () => {
  const classes = useStyles()

  return (
    <Box className={classes.mainWrapper}>
      <ChatCardUserInfo />
      <ChatCardMessages />
      <ChatCardInput />
    </Box>
  )
}

export default ChatCard
