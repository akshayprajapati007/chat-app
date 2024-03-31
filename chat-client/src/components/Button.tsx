import {
  Button as MuiButton,
  ButtonProps,
  CircularProgress,
} from "@mui/material"

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
  return (
    <MuiButton
      {...props}
      startIcon={isLoading ? null : startIcon}
      endIcon={isLoading ? null : endIcon}
      disabled={isLoading || disabled}
      variant={variant}
    >
      {isLoading ? <CircularProgress color="inherit" size={20} /> : children}
    </MuiButton>
  )
}

export default Button
