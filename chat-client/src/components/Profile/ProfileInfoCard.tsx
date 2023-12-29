import { Box, Avatar, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import { Link } from "react-router-dom"
import CustomPopover from "../CustomPopover"
import CustomMenuItem from "components/CustomMenuItem"
import { AppRoutings } from "utility/enums/app-routings"
import {
  ACCEPT_LABEL,
  CHAT_LABEL,
  REJECT_LABEL,
  REMOVE_FRIEND_LABEL,
} from "utility/constants/messages"
import { FriendInfoCardTypes } from "utility/enums/common"

const useStyles = makeStyles((theme: Theme) => ({
  cardWrapper: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f6f6f6",
    padding: "12px",
    borderRadius: "8px",
    "& > a": {
      textDecoration: "none",
    },
  },
  infoWrapper: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    overflow: "hidden",
  },
  name: {
    color: "#333",
    fontSize: "1rem !important",
    fontWeight: "600 !important",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}))

interface IActionOption {
  [key: string]: any[]
}

interface IProfileInfoCardProps {
  id: string
  type: FriendInfoCardTypes
  profileImage: string
  name: string
  handleStartChat?: (id: string) => void
  handleRemoveFriend?: (id: string) => void
  handleAcceptFriendRequest?: (id: string) => void
  handleRejectFriendRequest?: (id: string) => void
}

const ProfileInfoCard = ({
  id,
  name,
  type,
  profileImage,
  handleStartChat,
  handleRemoveFriend,
  handleAcceptFriendRequest,
  handleRejectFriendRequest,
}: IProfileInfoCardProps) => {
  const classes = useStyles()

  const callIfExist = (callback: ((id: string) => void) | undefined) => {
    return () => callback && callback(id)
  }

  const friendOptions = [
    {
      label: CHAT_LABEL,
      onClick: callIfExist(handleStartChat),
    },
    {
      label: REMOVE_FRIEND_LABEL,
      onClick: callIfExist(handleRemoveFriend),
    },
  ]

  const friendRequestOptions = [
    {
      label: ACCEPT_LABEL,
      onClick: callIfExist(handleAcceptFriendRequest),
    },
    {
      label: REJECT_LABEL,
      onClick: callIfExist(handleRejectFriendRequest),
    },
  ]

  const actionOptions: IActionOption = {
    [FriendInfoCardTypes.FRIEND]: friendOptions,
    [FriendInfoCardTypes.FRIEND_REQUEST]: friendRequestOptions,
  }

  return (
    <Box className={classes.cardWrapper}>
      <Link to={`${AppRoutings.User}/${id}`}>
        <Box className={classes.infoWrapper}>
          <Avatar src={profileImage} />
          <Typography title={name} variant="h6" className={classes.name}>
            {name}
          </Typography>
        </Box>
      </Link>
      <CustomPopover>
        {actionOptions[type].map((option) => {
          const { label, onClick } = option

          return <CustomMenuItem key={label} label={label} onClick={onClick} />
        })}
      </CustomPopover>
    </Box>
  )
}

export default ProfileInfoCard
