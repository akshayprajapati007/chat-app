import { MenuItem, MenuItemProps } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"

const useStyles = makeStyles((theme: Theme) => ({
  menuItemWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "6px 10px !important",
    borderRadius: "8px !important",
  },
  label: {
    fontSize: "0.95rem",
    color: "#000",
    fontWeight: "500",
  },
  endIconWrapper: {
    height: "20px",
    width: "20px",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  },
}))

interface IMenuItemProps extends MenuItemProps {
  label: string
  endIcon?: React.ReactNode
}

const CustomMenuItem = ({
  label,
  endIcon,
  onClick,
  ...rest
}: IMenuItemProps) => {
  const classes = useStyles()

  return (
    <MenuItem className={classes.menuItemWrapper} onClick={onClick} {...rest}>
      <span className={classes.label}>{label}</span>
      {endIcon && <span className={classes.endIconWrapper}>{endIcon}</span>}
    </MenuItem>
  )
}

export default CustomMenuItem
