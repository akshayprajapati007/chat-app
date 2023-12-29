import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import { Box, CircularProgress } from "@mui/material"
import clsx from "clsx"

const useStyles = makeStyles((theme: Theme) => ({
  mainWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
}))

interface ICustomLoaderContainerProps {
  isLoading: boolean
  children: React.ReactNode
  height?: number | string
  loaderSize?: number
  loaderColor?:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
  wrapperClasses?: string
  loaderClasses?: string
}

const CustomLoaderContainer = ({
  isLoading,
  children,
  height,
  loaderSize = 25,
  loaderColor = "primary",
  wrapperClasses,
  loaderClasses,
}: ICustomLoaderContainerProps) => {
  const classes = useStyles()

  return isLoading ? (
    <Box
      className={clsx(classes.mainWrapper, {
        [wrapperClasses as string]: !!wrapperClasses,
      })}
      height={height}
    >
      <CircularProgress
        size={loaderSize}
        color={loaderColor}
        className={loaderClasses || ""}
      />
    </Box>
  ) : (
    <>{children}</>
  )
}

export default CustomLoaderContainer
