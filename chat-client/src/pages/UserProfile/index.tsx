import { useState, useEffect } from "react"
import {
  Box,
  Container,
  CircularProgress,
  Avatar,
  Typography,
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import { useParams, useNavigate } from "react-router-dom"
import Layout from "components/Layout"
import NavigatorTree from "components/NavigatorTree"
import { AppRoutings } from "utility/enums/app-routings"
import { INavigator } from "utility/interfaces/common"
import userService from "services/user-service"
import { toast } from "react-toastify"
import { ISearchUserDetails } from "utility/interfaces/users"
import { FriendshipStatus } from "utility/enums/common"
import useFriendshipStatusHook from "hooks/useFriendshipStatusHook"
import Button from "components/Button"
import { UserAddIcon, UserCancelIcon } from "assets/images"

const useStyles = makeStyles((theme: Theme) => ({
  userContentWrapper: {
    display: "flex",
    gap: "20px",
    borderRadius: "12px",
    padding: "30px",
    flexWrap: "wrap",
    boxShadow: "0 2px 18px 4px rgba(176, 176, 176, 0.22)",
  },
  profileImage: {
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  },
  name: {
    fontSize: "1.9rem !important",
    fontWeight: "600 !important",
  },
  friendText: {
    color: "#fff",
    borderRadius: "12px",
    padding: "2px 8px",
    fontSize: "11px !important",
    backgroundColor: theme.palette.primary.main,
  },
  pendingText: {
    color: "#fff",
    borderRadius: "12px",
    padding: "2px 8px",
    fontSize: "11px !important",
    backgroundColor: theme.palette.secondary.main,
  },
  email: {
    color: "#333",
    opacity: "0.6",
    fontSize: "14px !important",
    fontWeight: "500 !important",
  },
  cancelRequestButton: {
    backgroundColor: "#feab0b",
    marginTop: "10px",
  },
}))

const UserProfile = () => {
  const { id } = useParams()
  const classes = useStyles()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [userDetails, setUserDetails] = useState<ISearchUserDetails>({
    email: "",
    firstName: "",
    lastName: "",
    profileImage: "",
    _id: "",
    friendshipStatus: "" as FriendshipStatus.NO_RELATION,
  })
  const { email, firstName, lastName, profileImage, friendshipStatus } =
    userDetails

  const { noRelation, isFriend, isFriendRequestSent, isFriendRequestRejected } =
    useFriendshipStatusHook(friendshipStatus)

  const navigators: INavigator[] = [
    {
      heading: "Home",
      link: AppRoutings.Home,
    },
    {
      heading: `${firstName} ${lastName}`,
      link: `${AppRoutings.User}/${id}`,
    },
  ]

  const getUserDetails = async (id: string) => {
    setIsLoading(true)
    try {
      const response = await userService.getUserDetails(id)
      setUserDetails(response.data.data)
    } catch (e: any) {
      toast.error(e.response.data.error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (id) getUserDetails(id)
    else navigate(-1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Layout>
      <Container fixed>
        {isLoading || !userDetails._id ? (
          <Box
            height={"calc(100vh - 100px)"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <NavigatorTree navigators={navigators} />
            <Box paddingY={3}>
              <Box className={classes.userContentWrapper}>
                <Avatar
                  src={profileImage}
                  sx={{ width: 120, height: 120 }}
                  className={classes.profileImage}
                />
                <Box>
                  <Box display="flex" alignItems="center" gap="8px">
                    <Typography className={classes.name}>
                      {firstName} {lastName}
                    </Typography>
                    {isFriend && (
                      <Typography className={classes.friendText}>
                        Friend
                      </Typography>
                    )}
                    {isFriendRequestSent && (
                      <Typography className={classes.pendingText}>
                        Request pending
                      </Typography>
                    )}
                  </Box>
                  <Typography className={classes.email}>{email}</Typography>
                  {noRelation ||
                    isFriendRequestRejected ||
                    (false && (
                      <Box paddingTop={3}>
                        <Button
                          startIcon={
                            <img src={UserAddIcon} height={18} alt="user add" />
                          }
                        >
                          Send friend request
                        </Button>
                      </Box>
                    ))}
                  {isFriendRequestSent && (
                    <Box paddingTop={3}>
                      <Button
                        startIcon={
                          <img
                            src={UserCancelIcon}
                            height={18}
                            alt="user add"
                          />
                        }
                        className={classes.cancelRequestButton}
                      >
                        Cancel friend request
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default UserProfile
