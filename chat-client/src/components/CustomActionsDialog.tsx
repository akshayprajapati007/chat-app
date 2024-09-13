import CloseRounded from "@mui/icons-material/CloseRounded"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material"
import { styled } from "@mui/system"

const CustomDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    borderRadius: "12px",
  },
})

const CustomDialogTitle = styled(DialogTitle)({
  display: "flex",
  alignItems: "flex-start",
  padding: "16px 16px 12px 20px",
  "& > h6": {
    flex: 1,
    fontWeight: 600,
    paddingTop: "6px",
    padding: 0,
  },
})

const CloseButton = styled(IconButton)({
  backgroundColor: "rgba(0,0,0,0.1)",
  padding: "3px",
  "& svg": {
    color: "#606060",
  },
})

const ContentTag = styled(Typography)({
  fontSize: "1.05rem",
})

const CustomDialogContent = styled(DialogContent)({
  padding: "0px 12px 50px 20px",
})

const CustomDialogActions = styled(DialogActions)({
  padding: "0px 20px 20px 20px",
  gap: "10px",
})

interface ICustomActionsDialog {
  isOpen: boolean
  title: string
  content: string
  actionButtonTitle?: string
  closeButtonTitle?: string
  handleClose: () => void
  actionButtonClick: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void | Promise<void>
}

const CustomActionsDialog = ({
  isOpen,
  title,
  content,
  actionButtonTitle = "Yes",
  closeButtonTitle = "Cancel",
  handleClose,
  actionButtonClick,
}: ICustomActionsDialog) => {
  return (
    <CustomDialog maxWidth="xs" fullWidth open={isOpen} onClose={handleClose}>
      <CustomDialogTitle>
        <Typography variant="h6">{title}</Typography>
        <CloseButton size="small" onClick={handleClose}>
          <CloseRounded fontSize="small" />
        </CloseButton>
      </CustomDialogTitle>
      <CustomDialogContent>
        <ContentTag>{content}</ContentTag>
      </CustomDialogContent>
      <CustomDialogActions>
        <Button variant="contained" onClick={actionButtonClick}>
          {actionButtonTitle}
        </Button>
        <Button
          autoFocus
          color="secondary"
          variant="contained"
          onClick={handleClose}
        >
          {closeButtonTitle}
        </Button>
      </CustomDialogActions>
    </CustomDialog>
  )
}

export default CustomActionsDialog
