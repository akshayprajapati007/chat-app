import { useState, useEffect } from "react"
import { Grid } from "@mui/material"
import userService from "services/user-service"
import FriendInfoCard from "./FriendInfoCard"
import { IUserDetails } from "utility/interfaces/common"
import { EMPTY_FRIEND_REQUESTS_LIST_MESSAGE } from "utility/constants/messages"
import ProfileList from "./ProfileList"
import { FriendInfoCardTypes, FriendshipStatus } from "utility/enums/common"
import { handleCatchError } from "utility/constants/helper"
import { useAppDispatch } from "hooks/storeHook"
import { setUserProfileFriendRequestCount } from "store/slices/userProfileSlice"

const FriendRequestsList = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [friendRequestsList, setFriendRequestsList] = useState<IUserDetails[]>(
    []
  )

  useEffect(() => {
    getFriendRequestsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getFriendRequestsList = async () => {
    setLoading(true)
    try {
      const res = await userService.getFriendRequestsList(1, 20, "")
      setFriendRequestsList(res.data.data)
      dispatch(setUserProfileFriendRequestCount(res.data.data.length))
    } catch (error: any) {
      handleCatchError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptFriendRequest = async (id: string) => {
    try {
      await userService.friendRequest({
        receiverId: id,
        status: FriendshipStatus.ACCEPTED,
      })
      getFriendRequestsList()
    } catch (error: any) {
      handleCatchError(error)
    }
  }

  const handleRejectFriendRequest = async (id: string) => {
    try {
      await userService.friendRequest({
        receiverId: id,
        status: FriendshipStatus.REJECTED,
      })
      getFriendRequestsList()
    } catch (error: any) {
      handleCatchError(error)
    }
  }

  return (
    <ProfileList
      isLoading={loading}
      listLength={friendRequestsList.length}
      emptyListMessage={EMPTY_FRIEND_REQUESTS_LIST_MESSAGE}
    >
      {friendRequestsList.map((friend: IUserDetails) => {
        const { _id, firstName, lastName, profileImage } = friend
        const fullName = `${firstName} ${lastName}`

        return (
          <Grid key={_id} item xs={12} sm={6} md={4}>
            <FriendInfoCard
              id={_id}
              name={fullName}
              profileImage={profileImage}
              type={FriendInfoCardTypes.FRIEND_REQUEST}
              handleAcceptFriendRequest={handleAcceptFriendRequest}
              handleRejectFriendRequest={handleRejectFriendRequest}
            />
          </Grid>
        )
      })}
    </ProfileList>
  )
}

export default FriendRequestsList
