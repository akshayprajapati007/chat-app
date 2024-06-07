import { useState } from "react"
import { styled } from "@mui/system"
import { Modal, Box, IconButton, Avatar } from "@mui/material"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"

const ProfileImage = styled(Avatar)({
  cursor: "pointer",
  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  transition: "transform 2 linear",
  "&:hover": {
    transform: "scale(1.01)",
  },
})

const ImageWrapper = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  position: "relative",
})

const CloseIcon = styled(IconButton)({
  position: "absolute",
  top: 20,
  right: 20,
  color: "#000",
  backgroundColor: "#fff",
  "&:hover": {
    color: "#000",
    backgroundColor: "#f0f0f0",
  },
})

const Image = styled("img")({
  maxWidth: "90%",
  maxHeight: "90%",
  borderRadius: "50%",
})

interface IProfileImageViewer {
  profileImage: string
}

const ProfileImageViewer = ({ profileImage }: IProfileImageViewer) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }
  return (
    <>
      <ProfileImage
        sx={{ width: 120, height: 120 }}
        src={profileImage}
        onClick={() => handleOpen()}
      />
      <Modal open={isOpen} onClose={handleClose}>
        <ImageWrapper>
          <CloseIcon size="small" onClick={handleClose}>
            <CloseRoundedIcon style={{ fontSize: 30 }} />
          </CloseIcon>
          <Image src={profileImage} alt="Profile" />
        </ImageWrapper>
      </Modal>
    </>
  )
}

export default ProfileImageViewer
