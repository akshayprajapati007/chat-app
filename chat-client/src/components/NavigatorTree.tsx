import { Box } from "@mui/material"
import { Link } from "react-router-dom"
import { Theme } from "@mui/material/styles"
import { makeStyles } from "@mui/styles"
import clsx from "clsx"
import ArrowForwardIcon from "@mui/icons-material/ArrowForwardIosRounded"
import { INavigator } from "utility/interfaces/common"

const useStyles = makeStyles((theme: Theme) => ({
  mainWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "3px",
    "& svg": {
      color: "#333",
      fontSize: "15px",
    },
  },
  arrowIcon: {
    color: "#333",
    fontSize: "15px",
    paddingTop: "2.5px",
    paddingRight: "2px",
  },
  navigator: {
    color: "#333",
    textDecoration: "none",
    fontWeight: 500,
  },
  lastNavigator: {
    color: theme.palette.primary.main,
  },
}))

interface INavigatorTreeProps {
  navigators: INavigator[]
}

const NavigatorTree = ({ navigators }: INavigatorTreeProps) => {
  const classes = useStyles()
  const navigatorsLength = navigators.length

  return (
    <Box className={classes.mainWrapper}>
      {navigators.map((navigator: INavigator, index: number) => {
        const { heading, link } = navigator
        return (
          <Box display="flex" alignItems="center" key={heading}>
            {index !== 0 && (
              <ArrowForwardIcon
                className={classes.arrowIcon}
                fontSize="small"
              />
            )}
            <Link
              to={link}
              className={clsx([
                classes.navigator,
                {
                  [classes.lastNavigator]: index + 1 === navigatorsLength,
                },
              ])}
            >
              {heading}
            </Link>
          </Box>
        )
      })}
    </Box>
  )
}

export default NavigatorTree
