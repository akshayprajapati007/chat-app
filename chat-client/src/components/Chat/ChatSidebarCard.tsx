import { Avatar, Box, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"

const useStyles = makeStyles((theme: Theme) => ({
  mainWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    backgroundColor: "#f7f7f7",
    padding: "10px",
    borderRadius: "8px",
    marginRight: "8px",
  },
  heading: {
    fontWeight: 600,
    fontSize: "18px",
  },
}))

const ChatUserCard = () => {
  const classes = useStyles()

  return (
    <Box className={classes.mainWrapper}>
      <Box>
        <Avatar src="" />
      </Box>
      <Box>
        <Typography className={classes.heading}>John Doe</Typography>
        <Typography>Hi, How are you?</Typography>
      </Box>
    </Box>
  )
}

export default ChatUserCard
