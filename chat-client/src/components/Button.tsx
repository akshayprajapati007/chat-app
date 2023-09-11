import {
  Button as MuiButton,
  ButtonProps,
  CircularProgress,
} from "@mui/material"
import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
  button: {
    width: "100%",
  },
})

interface IButtonProps extends ButtonProps {
  isLoading?: boolean
}

const Button = ({ children, isLoading, ...props }: IButtonProps) => {
  const classes = useStyles()
  return (
    <MuiButton {...props} className={classes.button}>
      {isLoading ? <CircularProgress size={24} /> : children}
    </MuiButton>
  )
}

export default Button
