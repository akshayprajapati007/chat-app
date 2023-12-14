import { Box, Avatar, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import CustomPopover from "../CustomPopover"
import CustomMenuItem from "components/CustomMenuItem"

const useStyles = makeStyles((theme: Theme) => ({
  friendCardWrapper: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f6f6f6",
    padding: "12px",
    borderRadius: "8px",
  },
  friendInfoWrapper: {
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

interface IFriendInfoCardProps {
  id: string
  profileImage: string
  name: string
}

const FriendInfoCard = ({ id, name, profileImage }: IFriendInfoCardProps) => {
  const classes = useStyles()

  return (
    <Box className={classes.friendCardWrapper}>
      <Box className={classes.friendInfoWrapper}>
        <Avatar src={profileImage} />
        <Typography title={name} variant="h6" className={classes.name}>
          {name}
        </Typography>
      </Box>
      <CustomPopover>
        <CustomMenuItem label="Remove friend" />
      </CustomPopover>
    </Box>
  )
}

export default FriendInfoCard
