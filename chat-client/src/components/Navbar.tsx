import { useState, useLayoutEffect } from "react"
import {
  IconButton,
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Avatar,
  Hidden,
  Box,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import { Link, useNavigate } from "react-router-dom"
import authService from "services/auth-service"
import { ChatIcon } from "assets/images"
import { AppRoutings } from "utility/enums/app-routings"
import { useAppSelector } from "hooks/storeHook"
import { type RootState } from "store/store"
import SearchUserList from "./SearchUserList"
import { handleCatchError } from "utility/constants/helper"
import { BRAND_LABEL } from "utility/constants"
import {
  CHATS_LABEL,
  LOGOUT_LABEL,
  PROFILE_LABEL,
} from "utility/constants/messages"

const useStyles = makeStyles({
  appBar: {
    paddingLeft: "5px",
    paddingRight: "5px",
  },
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
  },
  searchIcon: {
    color: "#fff",
  },
})

const Navbar: () => JSX.Element = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const userDetails = useAppSelector((state: RootState) => state.user)

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { profileImage } = userDetails

  useLayoutEffect(() => {
    const isCurrentSessionValid = authService.isCurrentSessionValid()
    setIsLoggedIn(isCurrentSessionValid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails])

  const handleSearchPageRedirect = () => {
    navigate(AppRoutings.Search)
  }

  const handleLogout = async () => {
    try {
      authService.signOut()
    } catch (error: any) {
      handleCatchError(error)
    }
  }

  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={3} sm={3} lg={3}>
              <Link to={AppRoutings.Home} className={classes.logoLink}>
                <Typography variant="h6" marginX={0.5} marginY={0.8}>
                  {BRAND_LABEL}
                </Typography>
              </Link>
            </Grid>
            {isLoggedIn && (
              <>
                <Hidden smDown>
                  <Grid item sm={5} md={5} lg={6}>
                    <Box display="flex" justifyContent="center">
                      <SearchUserList />
                    </Box>
                  </Grid>
                </Hidden>
                <Grid item xs={9} sm={4} md={4} lg={3}>
                  <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    <Hidden smUp>
                      <Grid item xs="auto">
                        <IconButton
                          size="medium"
                          edge="end"
                          onClick={handleSearchPageRedirect}
                        >
                          <SearchRoundedIcon className={classes.searchIcon} />
                        </IconButton>
                      </Grid>
                    </Hidden>
                    <Grid item xs="auto">
                      <Link
                        title={PROFILE_LABEL}
                        to={AppRoutings.Profile}
                        className={classes.profileInfoWrapper}
                      >
                        <IconButton size="medium" edge="end">
                          <Avatar
                            sx={{ width: 26, height: 26 }}
                            src={profileImage}
                          />
                        </IconButton>
                      </Link>
                    </Grid>
                    <Grid item xs="auto">
                      <Link title={CHATS_LABEL} to={AppRoutings.Chats}>
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
                        title={LOGOUT_LABEL}
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
