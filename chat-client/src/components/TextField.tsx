import React from "react"
import { TextField as MuiTextField, TextFieldProps } from "@mui/material"
import { styled } from "@mui/styles"

const StyledTextField = styled(MuiTextField)({
  borderRadius: 3,
  width: "100%",
})

type ITextFieldProps = TextFieldProps & {}

const TextField: React.FC<ITextFieldProps> = ({
  ...props
}: ITextFieldProps) => {
  return <StyledTextField {...props} />
}

export default TextField
