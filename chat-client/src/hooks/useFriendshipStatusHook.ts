import { useState, useEffect } from "react"
import { FriendshipStatus } from "utility/enums/common"

const useFriendshipStatusHook = (friendshipStatus: FriendshipStatus) => {
  const [noRelation, setNoRelation] = useState(false)
  const [isFriend, setIsFriend] = useState(false)
  const [isFriendRequestSent, setIsFriendRequestSent] = useState(false)
  const [isFriendRequestRejected, setIsFriendRequestRejected] = useState(false)

  useEffect(() => {
    if (friendshipStatus) {
      setNoRelation(friendshipStatus === FriendshipStatus.NO_RELATION)
      setIsFriend(friendshipStatus === FriendshipStatus.ACCEPTED)
      setIsFriendRequestSent(friendshipStatus === FriendshipStatus.PENDING)
      setIsFriendRequestRejected(friendshipStatus === FriendshipStatus.REJECTED)
    }
  }, [friendshipStatus])

  return { noRelation, isFriend, isFriendRequestSent, isFriendRequestRejected }
}

export default useFriendshipStatusHook
