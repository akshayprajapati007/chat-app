import { useState, useEffect } from "react"
import {
  IconButton,
  AppBar,
  Toolbar,
  Grid,
  Hidden,
  Typography,
  Avatar,
  Box,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded"
import authService from "services/auth-service"
import { ChatIcon } from "assets/images"
import { Link } from "react-router-dom"
import { AppRoutings } from "utility/enums/app-routings"
import { useAppSelector, useAppDispatch } from "hooks/storeHook"
import { type RootState } from "store/store"
import SearchUserList from "./SearchUserList"

const useStyles = makeStyles({
  logoLink: {
    textDecoration: "none",
    color: "#fff",
    "& h6": {
      fontWeight: 600,
      fontSize: "1.15rem",
    },
  },
  profileInfoWrapper: {
    textDecoration: "none",
    "& > div": {
      color: "#fff",
      display: "flex",
      gap: "8px",
      alignItems: "center",
      padding: "6px 12px",
      fontWeight: 500,
      fontSize: "0.9rem",
      fontFamily: "'Montserrat', sans-serif",
      borderRadius: "20px",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
      },
    },
  },
})

const Navbar: () => JSX.Element = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const userDetails = useAppSelector((state: RootState) => state.user)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { firstName, profileImage } = userDetails

  useEffect(() => {
    const isCurrentSessionValid = authService.isCurrentSessionValid()
    setIsLoggedIn(isCurrentSessionValid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails])

  const handleLogout = async () => {
    try {
      await authService.signOut()
    } catch (err: any) {
      console.log(err)
    }
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={3} sm={3} md={2}>
              <Link to={AppRoutings.Home} className={classes.logoLink}>
                <Typography variant="h6" marginX={0.5} marginY={0.8}>
                  ChatKI
                </Typography>
              </Link>
            </Grid>
            {isLoggedIn && (
              <>
                <Grid item xs={4} sm={4} md={6} lg={7}>
                  <SearchUserList />
                </Grid>
                <Grid item xs={5} sm={5} md={4} lg={3}>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Grid item xs="auto">
                      <Link
                        to={AppRoutings.Profile}
                        className={classes.profileInfoWrapper}
                      >
                        <Box>
                          <Avatar
                            sx={{ width: 28, height: 28 }}
                            src={profileImage}
                          />
                          <Hidden mdDown>{firstName.toUpperCase()}</Hidden>
                        </Box>
                      </Link>
                    </Grid>
                    <Grid item xs="auto">
                      <Link to={AppRoutings.Chats}>
                        <IconButton size="medium" edge="end">
                          <img
                            src={ChatIcon}
                            alt="chat"
                            height={25}
                            width={25}
                          />
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
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
