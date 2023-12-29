import { Box, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import ChatRoundedIcon from "@mui/icons-material/ChatRounded"
import ChatCardUserInfo from "components/Chat/ChatCardUserInfo"
import ChatCardMessages from "components/Chat/ChatCardMessages"
import ChatCardInput from "components/Chat/ChatCardInput"
import { RootState } from "store/store"
import { useAppSelector } from "hooks/storeHook"
import { NO_CHAT_SELECTED_LABEL } from "utility/constants/messages"
import CustomLoaderContainer from "components/CustomLoaderContainer"

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
  const { chatListLoader, activeChat } = useAppSelector(
    (state: RootState) => state.chat
  )

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
