import { Box, Avatar, Typography, IconButton } from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardRounded"
import { makeStyles } from "@mui/styles"
import { Link } from "react-router-dom"
import { FriendshipStatus } from "utility/enums/common"
import { AppRoutings } from "utility/enums/app-routings"
import { theme } from "configs/theme"

const useStyles = makeStyles({
  linkTag: {
    textDecoration: "none",
    color: "#333",
    "&:hover": {
      "& > $mainWrapper": {
        backgroundColor: "#f7f7f7",
      },
      "& $forwardIcon": {
        opacity: 1,
        transition: "opacity 500ms",
      },
    },
  },
  mainWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    padding: "10px 12px",
    borderRadius: "5px",
    borderBottom: "1.5px solid #f0f0f0",
  },
  profileWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  name: {
    fontSize: "1rem !important",
  },
  friendText: {
    backgroundColor: theme.palette.primary.light,
    borderRadius: "10px",
    width: "fit-content",
    padding: "0px 6px",
    fontSize: "8px !important",
    color: "#fff",
  },
  requestPendingText: {
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "10px",
    width: "fit-content",
    padding: "0px 6px",
    fontSize: "8px !important",
    color: "#fff",
  },
  forwardIcon: {
    opacity: 0,
    transition: "opacity 500ms",
  },
})

interface ISearchUserCard {
  id: string
  profileImage: string
  name: string
  friendshipStatus: FriendshipStatus
}

const SearchUserCard = ({
  id,
  name,
  profileImage,
  friendshipStatus,
}: ISearchUserCard) => {
  const classes = useStyles()

  const isFriend = friendshipStatus === FriendshipStatus.ACCEPTED
  const isFriendRequestSent = friendshipStatus === FriendshipStatus.PENDING

  return (
    <Link to={`${AppRoutings.User}/${id}`} className={classes.linkTag}>
      <Box className={classes.mainWrapper}>
        <Box className={classes.profileWrapper}>
          <Avatar src={profileImage} sx={{ height: 35, width: 35 }} />
          <Box className={classes.contentWrapper}>
            <Typography variant="h6" className={classes.name}>
              {name}
            </Typography>
            {isFriend && (
              <Typography className={classes.friendText}>Friend</Typography>
            )}
            {isFriendRequestSent && (
              <Typography className={classes.requestPendingText}>
                Pending
              </Typography>
            )}
          </Box>
        </Box>
        <IconButton size="small" className={classes.forwardIcon}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Link>
  )
}

export default SearchUserCard
