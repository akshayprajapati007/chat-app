import { Box, Avatar, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import { useEffect, useState } from "react"
import { useAppSelector } from "hooks/storeHook"
import { RootState } from "store/store"
import { IUserDetails } from "utility/interfaces/common"
import { DEFAULT_USER_INFO } from "utility/constants"
import { AppRoutings } from "utility/enums/app-routings"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme: Theme) => ({
  linkTag: {
    textDecoration: "none",
  },
  mainWrapper: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: "15px 10px",
    borderRadius: "8px",
    color: "#333",
  },
}))

const ChatCardUserInfo = () => {
  const classes = useStyles()
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

  return (
    <Link
      to={`${AppRoutings.User}/${userInfo._id}`}
      className={classes.linkTag}
    >
      <Box className={classes.mainWrapper}>
        <Avatar src={userInfo.profileImage} />
        <Box>
          <Typography variant="h6">
            {userInfo.firstName} {userInfo.lastName}
          </Typography>
        </Box>
      </Box>
    </Link>
  )
}

export default ChatCardUserInfo
