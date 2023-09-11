import { ToastContainer, CloseButtonProps } from "react-toastify"
import { Box, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/CloseRounded"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import "react-toastify/dist/ReactToastify.css"

const useStyles = makeStyles((theme: Theme) => ({
  mainCloseContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnWrapper: {
    padding: "5px !important",
    "& svg": {
      color: "#000",
    },
  },
}))

const CloseButton = ({ closeToast }: CloseButtonProps) => {
  const classes = useStyles()

  return (
    <Box className={classes.mainCloseContainer}>
      <IconButton onClick={closeToast} className={classes.closeBtnWrapper}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}

const CustomToastContainer = () => {
  return (
    <ToastContainer
      position="bottom-right"
      pauseOnHover
      hideProgressBar
      closeButton={CloseButton}
    />
  )
}

export default CustomToastContainer
