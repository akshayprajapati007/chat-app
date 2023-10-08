import { Box } from "@mui/material"
import { styled } from "@mui/styles"
import Navbar from "components/Navbar"

const CustomBox = styled(Box)({
  height: "100%",
  padding: "30px",
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
