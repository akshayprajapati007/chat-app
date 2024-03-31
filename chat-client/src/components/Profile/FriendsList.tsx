import { useState, useEffect } from "react"
import { Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"
import userService from "services/user-service"
import FriendInfoCard from "./FriendInfoCard"
import { IUserDetails } from "utility/interfaces/common"
import { EMPTY_FRIENDS_LIST_MESSAGE } from "utility/constants/messages"
import ProfileList from "./ProfileList"
import { FriendInfoCardTypes } from "utility/enums/common"
import chatService from "services/chat-service"
import { AppRoutings } from "utility/enums/app-routings"
import { handleCatchError } from "utility/constants/helper"

const FriendsList = () => {
  const navigate = useNavigate()
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
    } catch (error: any) {
      handleCatchError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleAccessChat = async (userId: string) => {
    try {
      const response = await chatService.accessChat(userId)
      const { _id } = response.data.data
      navigate(`${AppRoutings.Chats}/${_id}`)
    } catch (error: any) {
      handleCatchError(error)
    }
  }

  const handleRemoveFriend = async (userId: string) => {
    try {
      await userService.removeFriend(userId)
      getFriendsList()
    } catch (error: any) {
      handleCatchError(error)
    }
  }

  return (
    <ProfileList
      isLoading={loading}
      listLength={friendsList.length}
      emptyListMessage={EMPTY_FRIENDS_LIST_MESSAGE}
    >
      {friendsList.map((friend: IUserDetails) => {
        const { _id, firstName, lastName, profileImage } = friend
        const fullName = `${firstName} ${lastName}`

        return (
          <Grid key={_id} item xs={12} sm={6} md={4}>
            <FriendInfoCard
              id={_id}
              name={fullName}
              profileImage={profileImage}
              type={FriendInfoCardTypes.FRIEND}
              handleStartChat={handleAccessChat}
              handleRemoveFriend={handleRemoveFriend}
            />
          </Grid>
        )
      })}
    </ProfileList>
  )
}

export default FriendsList
