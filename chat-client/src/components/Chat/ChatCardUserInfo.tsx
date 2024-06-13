import { useEffect, useState } from "react"
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Hidden,
  Skeleton,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import { ArrowBackIosRounded } from "@mui/icons-material"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "hooks/storeHook"
import { RootState } from "store/store"
import { IUserDetails } from "utility/interfaces/common"
import { DEFAULT_USER_INFO } from "utility/constants"
import { AppRoutings } from "utility/enums/app-routings"
import userService from "services/user-service"
import { handleCatchError } from "utility/constants/helper"

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
  const { chatId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<IUserDetails>(DEFAULT_USER_INFO)
  const userDetails = useAppSelector((state: RootState) => state.user)

  useEffect(() => {
    if (userDetails && chatId) {
      getUserDetails()
    }

    return () => {
      setUserInfo(DEFAULT_USER_INFO)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails._id, chatId])

  const getUserDetails = async () => {
    try {
      setIsLoading(true)
      const data = await userService.getUserByChatId(chatId as string)
      const {
        data: {
          data: { _id, email, firstName, lastName, profileImage },
        },
      } = data
      setUserInfo({
        _id,
        firstName,
        lastName,
        email,
        profileImage,
      })
    } catch (error) {
      handleCatchError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRedirectChatList = () => {
    navigate(AppRoutings.Chats)
  }

  return (
    <Box className={classes.mainWrapper}>
      <Hidden mdUp>
        <IconButton onClick={handleRedirectChatList}>
          <ArrowBackIosRounded />
        </IconButton>
      </Hidden>
      <Link
        to={`${AppRoutings.User}/${userInfo._id}`}
        className={classes.linkTag}
      >
        <Box className={classes.contentWrapper}>
          {isLoading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Avatar src={userInfo.profileImage} />
          )}
          <Box>
            {isLoading ? (
              <Skeleton variant="rounded" width={210} height={20} />
            ) : (
              <Typography variant="h6">
                {userInfo.firstName} {userInfo.lastName}
              </Typography>
            )}
          </Box>
        </Box>
      </Link>
    </Box>
  )
}

export default ChatCardUserInfo
