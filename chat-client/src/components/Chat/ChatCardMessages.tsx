import { Box, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"

const useStyles = makeStyles((theme: Theme) => ({
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflowY: "auto",
    paddingRight: "4px",
  },
}))

const ChatCardMessages = () => {
  const classes = useStyles()

  return (
    <Box className={classes.mainWrapper}>
      <Typography
        sx={{
          padding: "4px 12px",
          backgroundColor: "#20a258",
          color: "#fff",
          margin: "4px 0px",
          borderRadius: "15px",
          alignSelf: "flex-end",
        }}
      >
        Hello
      </Typography>
      <Typography
        sx={{
          padding: "4px 12px",
          backgroundColor: "#20a258",
          color: "#fff",
          margin: "4px 0px",
          borderRadius: "15px",
          alignSelf: "flex-end",
        }}
      >
        How are you?
      </Typography>
      <Typography
        sx={{
          padding: "4px 12px",
          backgroundColor: "#f7f7f7",
          margin: "4px 0px",
          borderRadius: "15px",
          alignSelf: "flex-start",
        }}
      >
        Hello John
      </Typography>
      <Typography
        sx={{
          padding: "4px 12px",
          backgroundColor: "#f7f7f7",
          margin: "4px 0px",
          borderRadius: "15px",
          alignSelf: "flex-start",
        }}
      >
        I am fine
      </Typography>
      <Typography
        sx={{
          padding: "4px 12px",
          backgroundColor: "#f7f7f7",
          margin: "4px 0px",
          borderRadius: "15px",
          alignSelf: "flex-start",
        }}
      >
        and you?
      </Typography>
    </Box>
  )
}

export default ChatCardMessages
