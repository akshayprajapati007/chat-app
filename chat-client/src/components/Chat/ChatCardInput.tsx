import { useState } from "react"
import { Box, InputAdornment, IconButton } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import clsx from "clsx"
import TextField from "components/TextField"
import SendIcon from "@mui/icons-material/SendRounded"
import { socketIo } from "socket/socket"
import { useAppSelector } from "hooks/storeHook"
import { RootState } from "store/store"
import { SOCKET_MESSAGE } from "socket/socketEventsConstants"

const useStyles = makeStyles((theme: Theme) => ({
  mainWrapper: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginTop: "10px",
  },
  sendIcon: {
    marginRight: "-2px",
    paddingLeft: "2px",
  },
  activeSendIcon: {
    color: theme.palette.primary.main,
  },
}))

const ChatCardInput = () => {
  const classes = useStyles()
  const userDetails = useAppSelector((state: RootState) => state.user)

  const [message, setMessage] = useState("")

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
  }

  const handleMessageSend = () => {
    const messageDetails = {
      message,
      senderId: userDetails.email,
      recipientId: "akshay786prajapati@gmail.com",
    }
    socketIo.emit(SOCKET_MESSAGE, messageDetails)
    setMessage("")
  }

  const handleMessageSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleMessageSend()
  }

  return (
    <Box>
      <form noValidate onSubmit={handleMessageSubmit}>
        <Box className={classes.mainWrapper}>
          <TextField
            value={message}
            onChange={handleMessageChange}
            placeholder="Type a message..."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton type="submit" disabled={!message}>
                    <SendIcon
                      className={clsx(classes.sendIcon, {
                        [classes.activeSendIcon]: message,
                      })}
                      fontSize="small"
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </form>
    </Box>
  )
}

export default ChatCardInput
