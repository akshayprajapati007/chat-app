import { useEffect } from "react"
import { Box, ThemeProvider } from "@mui/material"
import { styled } from "@mui/styles"
import { theme } from "configs/theme"
import Routes from "components/Routes"
import { socketIo } from "socket/socket"

const MainContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
})

function App() {
  useEffect(() => {
    return () => {
      socketIo.disconnect()
    }
  })

  return (
    <MainContainer>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </MainContainer>
  )
}

export default App
