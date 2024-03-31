import { Box, ThemeProvider } from "@mui/material"
import { styled } from "@mui/styles"
import { theme } from "configs/theme"
import Routes from "components/Routes"
import { useEffect } from "react"
import { useSocket } from "socket/socket"
import authService from "services/auth-service"

const MainContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100vh",
})

function App() {
  const { initializeSocket } = useSocket()
  useEffect(() => {
    const isValidSession = authService.isCurrentSessionValid()
    if (isValidSession) {
      const token = authService.getAuthToken()
      initializeSocket(token as string)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <MainContainer>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </MainContainer>
  )
}

export default App
