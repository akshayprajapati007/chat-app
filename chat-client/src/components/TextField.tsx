import { useState } from "react"
import {
  TextField as MuiTextField,
  TextFieldProps,
  InputAdornment,
} from "@mui/material"
import VisibilityIcon from "@mui/icons-material/VisibilityRounded"
import VisibilityOffIcon from "@mui/icons-material/VisibilityOffRounded"
import { styled } from "@mui/styles"

const StyledTextField = styled(MuiTextField)({
  borderRadius: 3,
  width: "100%",
})

type ITextFieldProps = TextFieldProps & {}

const TextField: React.FC<ITextFieldProps> = ({
  ...props
}: ITextFieldProps) => {
  const { type } = props
  const isPasswordField = type === "password"
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((isPasswordVisible: boolean) => !isPasswordVisible)
  }

  return (
    <StyledTextField
      {...props}
      type={
        isPasswordField ? (isPasswordVisible ? "text" : "password") : "text"
      }
      InputProps={{
        endAdornment: isPasswordField ? (
          <InputAdornment
            position="end"
            sx={{ cursor: "pointer" }}
            onClick={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <VisibilityIcon fontSize="small" />
            ) : (
              <VisibilityOffIcon fontSize="small" />
            )}
          </InputAdornment>
        ) : null,
      }}
    />
  )
}

export default TextField
