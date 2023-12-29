import { Box } from "@mui/material"
import { styled } from "@mui/styles"
import Navbar from "components/Navbar"

const CustomBox = styled(Box)({
  padding: "20px",
  height: "100%",
})

const Layout: React.FC<any> = ({ children }) => {
  return (
    <>
      <Navbar />
      <CustomBox>{children}</CustomBox>
    </>
  )
}

export default Layout
