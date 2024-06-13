import { Avatar, Box, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import clsx from "clsx"
import { IChatList } from "utility/interfaces/chat"
import { IUserDetails } from "utility/interfaces/common"
import { RootState } from "store/store"
import { useAppSelector } from "hooks/storeHook"
import { AppRoutings } from "utility/enums/app-routings"
import { DEFAULT_USER_INFO } from "utility/constants"

const useStyles = makeStyles((theme: Theme) => ({
  mainWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#f0f0f0",
    padding: "10px",
    borderRadius: "8px",
    margin: "0px 4px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f4f4f4",
    },
  },
  selectedChat: {
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  heading: {
    fontWeight: 600,
    fontSize: "18px",
  },
}))

interface IChatUserCardProps {
  chatInfo: IChatList
}

const ChatUserCard = ({ chatInfo }: IChatUserCardProps) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { chatId } = useParams()
  const [userInfo, setUserInfo] = useState<IUserDetails>(DEFAULT_USER_INFO)
  const userDetails = useAppSelector((state: RootState) => state.user)

  useEffect(() => {
    if (userDetails && chatInfo) {
      const user = chatInfo.users.filter((user) => user._id !== userDetails._id)
      user.length > 0 && setUserInfo(user[0])
    }
  }, [userDetails, chatInfo])

  const handleChatSelect = () => {
    navigate(`${AppRoutings.Chats}/${chatInfo._id}`)
  }

  return (
    <Box
      className={clsx(classes.mainWrapper, {
        [classes.selectedChat]: chatInfo._id === chatId,
      })}
      onClick={handleChatSelect}
    >
      <Box>
        <Avatar src={userInfo.profileImage} />
      </Box>
      <Box>
        <Typography className={classes.heading}>
          {userInfo.firstName} {userInfo.lastName}
        </Typography>
        <Typography>{chatInfo.lastMessage}</Typography>
      </Box>
    </Box>
  )
}

export default React.memo(ChatUserCard)
