import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { Box, CircularProgress, Grid, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import userService from "services/user-service"
import FriendInfoCard from "./FriendInfoCard"
import { IUserDetails } from "utility/interfaces/common"

const useStyles = makeStyles((theme: Theme) => ({
  loaderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "15vh",
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
    padding: "0px 5px",
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

const FriendsList = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [friendsList, setFriendsList] = useState<IUserDetails[]>([])

  useEffect(() => {
    getFriendsList()
  }, [])

  const getFriendsList = async () => {
    setLoading(true)
    try {
      const res = await userService.getFriendsList(1, 20, "")
      setFriendsList(res.data.data)
    } catch (e: any) {
      toast.error(e.response.data.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Typography className={classes.friendHeading}>Friends</Typography>
      <Box mt={2} width="100%">
        {loading ? (
          <Box className={classes.loaderContainer}>
            <CircularProgress size={24} color="primary" />
          </Box>
        ) : (
          <Box className={classes.friendsListContainer}>
            <Grid container spacing={2}>
              {friendsList.map((friend: IUserDetails) => {
                const { _id, firstName, lastName, profileImage } = friend
                const fullName = `${firstName} ${lastName}`

                return (
                  <Grid key={_id} item xs={12} sm={6} md={4}>
                    <FriendInfoCard
                      id={_id}
                      name={fullName}
                      profileImage={profileImage}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default FriendsList
