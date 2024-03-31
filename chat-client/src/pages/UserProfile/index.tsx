import { useState, useEffect } from "react"
import { Box, Container, Avatar, Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import { useParams, useNavigate } from "react-router-dom"
import Layout from "components/Layout"
import NavigatorTree from "components/NavigatorTree"
import { AppRoutings } from "utility/enums/app-routings"
import { INavigator } from "utility/interfaces/common"
import userService from "services/user-service"
import { ISearchUserDetails } from "utility/interfaces/users"
import { FriendshipStatus } from "utility/enums/common"
import useFriendshipStatusHook from "hooks/useFriendshipStatusHook"
import Button from "components/Button"
import { UserAddIcon, UserCancelIcon } from "assets/images"
import { DEFAULT_USER_INFO } from "utility/constants"
import { handleCatchError } from "utility/constants/helper"
import {
  ACCEPT_LABEL,
  CANCEL_FRIEND_REQUEST_LABEL,
  FRIEND_LABEL,
  HOME_LABEL,
  REJECT_LABEL,
  REMOVE_FRIEND_LABEL,
  SEND_FRIEND_REQUEST_LABEL,
} from "utility/constants/messages"
import CustomLoaderContainer from "components/CustomLoaderContainer"
import chatService from "services/chat-service"

const useStyles = makeStyles((theme: Theme) => ({
  userContentWrapper: {
    display: "flex",
    alignItems: "center",
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
  email: {
    color: "#333",
    opacity: "0.6",
    fontSize: "14px !important",
    fontWeight: "500 !important",
  },
  chatBtn: {
    width: "fit-content !important",
  },
}))

const UserProfile = () => {
  const { id } = useParams()
  const classes = useStyles()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [isFriendRequestLoading, setIsFriendRequestLoading] = useState(false)
  const [isAcceptingFriendRequest, setIsAcceptingFriendRequest] =
    useState(false)
  const [isRejectingFriendRequest, setIsRejectingFriendRequest] =
    useState(false)
  const [isRemovingFriend, setIsRemovingFriend] = useState(false)
  const [isAccessingChat, setIsAccessingChat] = useState(false)
  const [userDetails, setUserDetails] = useState<ISearchUserDetails>({
    ...DEFAULT_USER_INFO,
    friendshipStatus: FriendshipStatus.EMPTY,
    isFriendRequest: false,
  })

  const {
    _id,
    email,
    firstName,
    lastName,
    profileImage,
    friendshipStatus,
    isFriendRequest,
  } = userDetails

  const { noRelation, isFriend, isFriendRequestSent, isFriendRequestRejected } =
    useFriendshipStatusHook(friendshipStatus)

  const navigators: INavigator[] = [
    {
      heading: HOME_LABEL,
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
    } catch (error: any) {
      handleCatchError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendFriendRequest = async () => {
    setIsFriendRequestLoading(true)
    try {
      const res = await userService.friendRequest({
        receiverId: _id,
        status: FriendshipStatus.PENDING,
      })
      setUserDetails(res.data.data)
    } catch (error: any) {
      handleCatchError(error)
    } finally {
      setIsFriendRequestLoading(false)
    }
  }

  const handleCancelFriendRequest = async () => {
    setIsFriendRequestLoading(true)
    try {
      const res = await userService.friendRequest({
        receiverId: _id,
        status: FriendshipStatus.NO_RELATION,
      })
      setUserDetails(res.data.data)
    } catch (error: any) {
      handleCatchError(error)
    } finally {
      setIsFriendRequestLoading(false)
    }
  }

  const handleAcceptFriendRequest = async () => {
    setIsAcceptingFriendRequest(true)
    try {
      const res = await userService.friendRequest({
        receiverId: _id,
        status: FriendshipStatus.ACCEPTED,
      })
      setUserDetails(res.data.data)
    } catch (error: any) {
      handleCatchError(error)
    } finally {
      setIsAcceptingFriendRequest(false)
    }
  }

  const handleRejectFriendRequest = async () => {
    setIsRejectingFriendRequest(true)
    try {
      const res = await userService.friendRequest({
        receiverId: _id,
        status: FriendshipStatus.REJECTED,
      })
      setUserDetails(res.data.data)
    } catch (error: any) {
      handleCatchError(error)
    } finally {
      setIsRejectingFriendRequest(false)
    }
  }

  const handleRemoveFriend = async () => {
    setIsRemovingFriend(true)
    try {
      const res = await userService.removeFriend(_id)
      setUserDetails(res.data.data)
    } catch (error: any) {
      handleCatchError(error)
    } finally {
      setIsRemovingFriend(false)
    }
  }

  useEffect(() => {
    if (id) getUserDetails(id)
    else navigate(-1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const renderFriendRequestButton = () => {
    if (noRelation || isFriendRequestRejected) {
      return (
        <Button
          startIcon={<img src={UserAddIcon} height={18} alt="user add" />}
          isLoading={isFriendRequestLoading}
          onClick={handleSendFriendRequest}
        >
          {SEND_FRIEND_REQUEST_LABEL}
        </Button>
      )
    }

    if (isFriend) {
      return (
        <Box display="flex" gap="5px">
          <Button
            className={classes.chatBtn}
            isLoading={isAccessingChat}
            onClick={handleAccessChat}
          >
            Chat
          </Button>
          <Button
            color="secondary"
            isLoading={isRemovingFriend}
            onClick={handleRemoveFriend}
          >
            {REMOVE_FRIEND_LABEL}
          </Button>
        </Box>
      )
    }

    if (isFriendRequest) {
      return (
        <Box display="flex" gap="10px">
          <Button
            isLoading={isAcceptingFriendRequest}
            onClick={handleAcceptFriendRequest}
          >
            {ACCEPT_LABEL}
          </Button>
          <Button
            color="error"
            isLoading={isRejectingFriendRequest}
            onClick={handleRejectFriendRequest}
          >
            {REJECT_LABEL}
          </Button>
        </Box>
      )
    }

    if (isFriendRequestSent) {
      return (
        <Button
          startIcon={<img src={UserCancelIcon} height={18} alt="user add" />}
          color="secondary"
          isLoading={isFriendRequestLoading}
          onClick={handleCancelFriendRequest}
        >
          {CANCEL_FRIEND_REQUEST_LABEL}
        </Button>
      )
    }

    return null
  }

  const handleAccessChat = async () => {
    setIsAccessingChat(true)
    try {
      const response = await chatService.accessChat(_id)
      const { _id: chatId } = response.data.data
      navigate(`${AppRoutings.Chats}/${chatId}`)
    } catch (error: any) {
      handleCatchError(error)
    } finally {
      setIsAccessingChat(false)
    }
  }

  return (
    <Layout>
      <Container maxWidth="md">
        <CustomLoaderContainer
          height="calc(100vh - 100px)"
          loaderSize={30}
          isLoading={isLoading || !userDetails._id}
        >
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
                        {FRIEND_LABEL}
                      </Typography>
                    )}
                  </Box>
                  <Typography className={classes.email}>{email}</Typography>
                  <Box paddingTop={3}>{renderFriendRequestButton()}</Box>
                </Box>
              </Box>
            </Box>
          </>
        </CustomLoaderContainer>
      </Container>
    </Layout>
  )
}

export default UserProfile
