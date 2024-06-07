import { useEffect, useState } from "react"
import { Box, Avatar, Typography, IconButton, Hidden } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import { ArrowBackIosRounded } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "hooks/storeHook"
import { RootState } from "store/store"
import { IUserDetails } from "utility/interfaces/common"
import { DEFAULT_USER_INFO } from "utility/constants"
import { AppRoutings } from "utility/enums/app-routings"
import { resetActiveChat } from "store/slices/chatSlice"

const useStyles = makeStyles((theme: Theme) => ({
  linkTag: {
    textDecoration: "none",
  },
  mainWrapper: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: "15px 10px",
    borderRadius: "8px",
  },
  contentWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#333",
  },
}))

const ChatCardUserInfo = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [userInfo, setUserInfo] = useState<IUserDetails>(DEFAULT_USER_INFO)
  const userDetails = useAppSelector((state: RootState) => state.user)
  const { activeChat } = useAppSelector((state: RootState) => state.chat)

  useEffect(() => {
    if (userDetails && activeChat) {
      const user = activeChat.users.filter(
        (user) => user._id !== userDetails._id
      )
      user.length > 0 && setUserInfo(user[0])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails._id, activeChat._id])

  const handleRedirectChatList = () => {
    dispatch(resetActiveChat())
    navigate(AppRoutings.Chats)
  }

  return (
    <Box className={classes.mainWrapper}>
      <Hidden smUp>
        <IconButton onClick={handleRedirectChatList}>
          <ArrowBackIosRounded />
        </IconButton>
      </Hidden>
      <Link
        to={`${AppRoutings.User}/${userInfo._id}`}
        className={classes.linkTag}
      >
        <Box className={classes.contentWrapper}>
          <Avatar src={userInfo.profileImage} />
          <Box>
            <Typography variant="h6">
              {userInfo.firstName} {userInfo.lastName}
            </Typography>
          </Box>
        </Box>
      </Link>
    </Box>
  )
}

export default ChatCardUserInfo
