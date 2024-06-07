import { Container, Box, Typography, Grid, Hidden } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import { WELCOME_TO_LABEL } from "utility/constants/messages"
import { BRAND_LABEL } from "utility/constants"

const useStyles = makeStyles((theme: Theme) => ({
  spaceContainer: {
    height: "100%",
  },
  mainWrapper: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    gap: "50px",
  },
  headingWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  leftSiteHeading: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    fontFamily: "'Montserrat', sans-serif",
  },
  separatorWrapper: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
  },
  separator: {
    width: "4px",
    height: "100%",
    borderRadius: "8px",
    backgroundColor: theme.palette.primary.main,
  },
}))

const AuthLayout = ({ children }: any) => {
  const classes = useStyles()

  return (
    <Container maxWidth="lg" className={classes.spaceContainer}>
      <Box className={classes.mainWrapper}>
        <Grid container spacing={2} justifyContent="center">
          <Hidden mdDown>
            <Grid item md={5}>
              <Box className={classes.headingWrapper}>
                <Typography variant="h2" align="center">
                  {WELCOME_TO_LABEL}
                </Typography>
                <Typography
                  className={classes.leftSiteHeading}
                  variant="h2"
                  align="center"
                >
                  {BRAND_LABEL}
                </Typography>
              </Box>
            </Grid>
            <Grid item md={2}>
              <Box className={classes.separatorWrapper}>
                <Box className={classes.separator} />
              </Box>
            </Grid>
          </Hidden>
          <Grid item xs={11} sm={8} md={5}>
            {children}
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default AuthLayout
