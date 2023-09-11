import { ErrorMessage, ErrorMessageProps } from "formik"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"

const useStyles = makeStyles((theme: Theme) => ({
  errorMessage: {
    color: "red",
    fontSize: "14px",
    padding: "0px 2px",
  },
}))

const CustomErrorMessage = ({
  component = "div",
  ...props
}: ErrorMessageProps) => {
  const classes = useStyles()

  return (
    <ErrorMessage
      className={classes.errorMessage}
      component={component}
      {...props}
    />
  )
}

export default CustomErrorMessage
