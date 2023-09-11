import { Box } from "@mui/material"
import Navbar from "components/Navbar"
import React from "react"

const Layout: React.FC<any> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box sx={{ height: "calc(100vh - 55.98px)" }}>{children}</Box>
    </>
  )
}

export default Layout
