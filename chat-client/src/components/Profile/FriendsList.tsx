import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { Grid } from "@mui/material"
import userService from "services/user-service"
import FriendInfoCard from "./ProfileInfoCard"
import { IUserDetails } from "utility/interfaces/common"
import { EMPTY_FRIENDS_LIST_MESSAGE } from "utility/constants/messages"
import ProfileList from "./ProfileList"
import { FriendInfoCardTypes } from "utility/enums/common"

const FriendsList = () => {
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

  const handleRemoveFriend = async (id: string) => {
    try {
      await userService.removeFriend(id)
      getFriendsList()
    } catch (e: any) {
      toast.error(e.response.data.error)
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
              handleRemoveFriend={handleRemoveFriend}
            />
          </Grid>
        )
      })}
    </ProfileList>
  )
}

export default FriendsList
