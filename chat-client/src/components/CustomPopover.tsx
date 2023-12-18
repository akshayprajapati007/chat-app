import * as React from "react"
import { Box, Popover, IconButton } from "@mui/material"
import { makeStyles } from "@mui/styles"
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded"

interface ICustomPopoverProps {
  children: React.ReactElement | React.ReactElement[]
}

const useStyles = makeStyles({
  popoverPaper: {
    borderRadius: "12px !important",
  },
})

const CustomPopover = ({ children }: ICustomPopoverProps) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "popover" : undefined

  return (
    <div>
      <IconButton size="small" aria-describedby={id} onClick={handleClick}>
        <MoreHorizRoundedIcon />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: classes.popoverPaper,
        }}
      >
        <Box sx={{ p: 1 }}>{children}</Box>
      </Popover>
    </div>
  )
}

export default CustomPopover
