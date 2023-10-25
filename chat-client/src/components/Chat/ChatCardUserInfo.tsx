import { Box, Avatar, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"

const useStyles = makeStyles((theme: Theme) => ({
  mainWrapper: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: "15px 10px",
    borderRadius: "8px",
  },
}))

const ChatCardUserInfo = () => {
  const classes = useStyles()
  return (
    <Box className={classes.mainWrapper}>
      <Avatar src="" />
      <Box>
        <Typography variant="h6">John Doe</Typography>
        <Typography>Active 6m ago</Typography>
      </Box>
    </Box>
  )
}

export default ChatCardUserInfo
