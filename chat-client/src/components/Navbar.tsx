import { useState, useEffect } from "react"
import {
  IconButton,
  AppBar,
  Toolbar,
  Grid,
  Hidden,
  Typography,
  Avatar,
  Button,
  Box,
} from "@mui/material"
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded"
import authService from "services/auth-service"
import { ChatIcon } from "assets/images"
import { Link } from "react-router-dom"
import { AppRoutings } from "utility/enums/app-routings"
import { useAppSelector, useAppDispatch } from "hooks/storeHook"
import { type RootState } from "store/store"
import { resetUserDetails } from "store/slices/userSlice"

const Navbar: () => JSX.Element = () => {
  const dispatch = useAppDispatch()
  const userDetails = useAppSelector((state: RootState) => state.user)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { firstName, lastName, profileImage } = userDetails

  useEffect(() => {
    const isCurrentSessionValid = authService.isCurrentSessionValid()
    setIsLoggedIn(isCurrentSessionValid)
  }, [userDetails])

  const handleLogout = async () => {
    try {
      await authService.signOut()
      dispatch(resetUserDetails())
    } catch (err: any) {
      console.log(err)
    }
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={5} sm={6}>
              <Typography variant="h6" mt={0.8} ml={0.5} mb={0.8}>
                ChatKI
              </Typography>
            </Grid>
            {isLoggedIn && (
              <Grid item xs={7} sm={6}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Grid item xs="auto">
                    <Link to={AppRoutings.Profile}>
                      <Button sx={{ minWidth: "auto" }}>
                        <Box display="flex" gap="5px" alignItems="center">
                          <Avatar
                            sx={{ width: 28, height: 28 }}
                            src={profileImage}
                          />
                          <Hidden mdDown>
                            {firstName} {lastName}
                          </Hidden>
                        </Box>
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs="auto">
                    <Link to={AppRoutings.Chat}>
                      <IconButton size="medium" edge="end">
                        <img src={ChatIcon} alt="chat" height={25} width={25} />
                      </IconButton>
                    </Link>
                  </Grid>
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
                </Grid>
              </Grid>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
