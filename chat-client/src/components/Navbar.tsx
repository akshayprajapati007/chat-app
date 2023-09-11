import { useState, useEffect } from "react"
import {
  IconButton,
  AppBar,
  Toolbar,
  Grid,
  Hidden,
  Typography,
} from "@mui/material"
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded"
import authService from "services/auth-service"
import { useNavigate } from "react-router-dom"
import { AppRoutings } from "utility/enums/app-routings"

const Navbar: () => JSX.Element = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const isCurrentSessionValid = authService.isCurrentSessionValid()
    setIsLoggedIn(isCurrentSessionValid)
  }, [])

  const handleLogout = async () => {
    try {
      await authService.signOut()
      navigate(AppRoutings.SignIn)
    } catch (err: any) {
      console.log(err)
    }
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Grid container justifyContent="space-between">
            <Grid item xs>
              <Grid container spacing={2} alignItems="center">
                <Hidden mdDown>
                  <Grid item xs>
                    <Typography
                      sx={{ color: "#fff" }}
                      variant="h6"
                      mt={0.8}
                      ml={0.5}
                      mb={0.8}
                    >
                      ChatKI
                    </Typography>
                  </Grid>
                </Hidden>
              </Grid>
            </Grid>
            {isLoggedIn && (
              <Grid item xs="auto">
                <IconButton
                  size="medium"
                  edge="end"
                  sx={{ color: "#fff" }}
                  onClick={handleLogout}
                >
                  <ExitToAppRoundedIcon />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
