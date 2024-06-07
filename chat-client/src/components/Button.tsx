import {
  Button as MuiButton,
  ButtonProps,
  CircularProgress,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    height: "40px",
  },
}))

interface IButtonProps extends ButtonProps {
  isLoading?: boolean
}

const Button = ({
  children,
  disabled,
  isLoading,
  startIcon,
  endIcon,
  variant = "contained",
  ...props
}: IButtonProps) => {
  const classes = useStyles()
  return (
    <MuiButton
      {...props}
      startIcon={isLoading ? null : startIcon}
      endIcon={isLoading ? null : endIcon}
      disabled={isLoading || disabled}
      variant={variant}
      className={`${classes.button} ${props.className || ""}`}
    >
      {isLoading ? <CircularProgress color="inherit" size={20} /> : children}
    </MuiButton>
  )
}

export default Button
