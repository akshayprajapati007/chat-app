import Routes from "./components/Routes"
import "./App.css"
import { Box, ThemeProvider } from "@mui/material"
import { theme } from "configs/theme"

function App() {
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Box>
  )
}

export default App
