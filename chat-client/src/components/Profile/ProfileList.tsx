import { Box, Grid, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import React from "react"
import CustomLoaderContainer from "components/CustomLoaderContainer"

const useStyles = makeStyles((theme: Theme) => ({
  emptyListWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "15vh",
    "& p": {
      fontSize: "1.1rem",
      color: theme.palette.grey[500],
      fontWeight: 500,
    },
  },
  friendHeading: {
    color: "#333",
    borderBottom: "2px solid #d0d0d0",
    paddingBottom: "5px",
    fontSize: "22px !important",
    fontWeight: "600 !important",
  },
  friendsListContainer: {
    maxHeight: "60vh",
    overflowY: "auto",
  },
  friendCardWrapper: {
    display: "flex",
    gap: "5px",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f6f6f6",
    padding: "12px",
    borderRadius: "8px",
  },
  friendInfoWrapper: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
}))

interface IProfileListProps {
  isLoading: boolean
  listLength: number
  emptyListMessage: string
  children: React.ReactNode
}

const ProfileList = ({
  isLoading,
  emptyListMessage,
  listLength,
  children,
}: IProfileListProps) => {
  const classes = useStyles()

  return (
    <Box>
      <Box mt={2} width="100%">
        <CustomLoaderContainer isLoading={isLoading} height="15vh">
          <Box className={classes.friendsListContainer}>
            <Grid container spacing={2}>
              {listLength > 0 ? (
                <>{children}</>
              ) : (
                <Grid item xs={12}>
                  <Box className={classes.emptyListWrapper}>
                    <Typography>{emptyListMessage}</Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Box>
        </CustomLoaderContainer>
      </Box>
    </Box>
  )
}

export default ProfileList
