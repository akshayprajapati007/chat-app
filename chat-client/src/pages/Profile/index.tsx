import { useEffect } from "react"
import { Box } from "@mui/material"
import { Theme } from "@mui/material/styles"
import { makeStyles } from "@mui/styles"
import { AppRoutings } from "utility/enums/app-routings"
import { INavigator } from "utility/interfaces/common"
import NavigatorTree from "components/NavigatorTree"
import Layout from "components/Layout"
import CustomTabs from "components/CustomTabs"
import {
  FRIENDS_LABEL,
  FRIEND_REQUESTS_LABEL,
  HOME_LABEL,
  PROFILE_LABEL,
} from "utility/constants/messages"
import FriendsList from "components/Profile/FriendsList"
import FriendRequestsList from "components/Profile/FriendRequestsList"
import ProfileInfo from "components/Profile/ProfileInfo"
import userService from "services/user-service"
import { handleCatchError } from "utility/constants/helper"
import { useAppDispatch, useAppSelector } from "hooks/storeHook"
import { setUserProfileMetaData } from "store/slices/userProfileSlice"
import { RootState } from "store/store"

const sharedWrapperStyles = {
  boxShadow: "0 2px 18px 4px rgba(176, 176, 176, 0.22)",
  borderRadius: "12px",
  width: "800px",
}

const useStyles = makeStyles((theme: Theme) => ({
  formWrapper: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  formBoxWrapper: {
    ...sharedWrapperStyles,
    padding: "100px 50px 50px",
    position: "relative",
  },
  friendsListWrapper: {
    ...sharedWrapperStyles,
    padding: "30px 50px",
  },
  profileImageWrapper: {
    position: "absolute",
    top: "0%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    borderRadius: "50%",
  },
  profileImageChildWrapper: {
    position: "relative",
    "& > button": {
      position: "absolute",
      right: "0",
      bottom: "5%",
      transform: "translateX(0%)",
      backgroundColor: theme.palette.primary.main,
      border: "2px solid #fff",
      "&:hover,&:disabled": {
        backgroundColor: theme.palette.primary.main,
      },
      "& svg": {
        color: "#fff",
        fontSize: "15px",
      },
    },
  },
  profileImageLoader: {
    color: "#fff",
  },
  fieldWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
}))

const Profile = () => {
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const { profileMetaData } = useAppSelector(
    (state: RootState) => state.userProfile
  )

  const profileTabs = [
    {
      tabLabel: FRIENDS_LABEL,
      tabPanel: <FriendsList />,
    },
    {
      tabLabel: `${FRIEND_REQUESTS_LABEL} ${
        profileMetaData ? `(${profileMetaData.totalFriendRequests})` : ""
      }`,
      tabPanel: <FriendRequestsList />,
    },
  ]

  const navigators: INavigator[] = [
    {
      heading: HOME_LABEL,
      link: AppRoutings.Home,
    },
    {
      heading: PROFILE_LABEL,
      link: AppRoutings.Profile,
    },
  ]

  useEffect(() => {
    getProfileMetaData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getProfileMetaData = async () => {
    try {
      const response = await userService.getUserProfileMetaData()
      dispatch(setUserProfileMetaData(response.data.data))
    } catch (error: any) {
      handleCatchError(error)
    }
  }
  return (
    <Layout>
      <NavigatorTree navigators={navigators} />
      <Box pt={15}>
        <ProfileInfo />
      </Box>
      <Box mt={5} pb={5} display="flex" justifyContent="center">
        <Box className={classes.friendsListWrapper}>
          <CustomTabs tabs={profileTabs} />
        </Box>
      </Box>
    </Layout>
  )
}

export default Profile
