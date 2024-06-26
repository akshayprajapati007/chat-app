import { useEffect, useMemo, useRef, useState } from "react"
import { Avatar, Box, CircularProgress, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { makeStyles } from "@mui/styles"
import { Theme } from "@mui/material/styles"
import { debounce } from "lodash"
import TextField from "components/TextField"
import chatService from "services/chat-service"
import userService from "services/user-service"
import { handleCatchError } from "utility/constants/helper"
import { AppRoutings } from "utility/enums/app-routings"
import { IUserDetails } from "utility/interfaces/common"
import CustomLoaderContainer from "components/CustomLoaderContainer"
import { updateChatList } from "store/slices/chatSlice"
import { useAppDispatch, useAppSelector } from "hooks/storeHook"
import { RootState } from "store/store"

const useStyles = makeStyles((theme: Theme) => ({
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  listWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    marginTop: "15px",
    height: "100%",
    overflowY: "auto",
  },
  friendInfoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    border: "1.5px solid #f0f0f0",
    padding: "10px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f7f7f7",
    },
    "& > h6": {
      fontSize: "1rem",
      flex: 1,
    },
  },
}))

const NewChat = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [creatingChatId, setCreatingChatId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const searchFieldRef = useRef<HTMLInputElement>(null)
  const { chatList } = useAppSelector((state: RootState) => state.chat)
  const [tempFriendsList, setTempFriendsList] = useState<IUserDetails[]>([])
  const [friendsList, setFriendsList] = useState<IUserDetails[]>([])

  useEffect(() => {
    if (searchFieldRef.current) {
      searchFieldRef.current.focus()
    }
    getFriendsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const getFriendsList = async () => {
    try {
      search && setLoading(true)
      const res = await userService.getFriendsList(1, 20, search)
      const searchedList = res.data.data
      setTempFriendsList(!search ? searchedList : tempFriendsList)
      setFriendsList(searchedList)
    } catch (error: any) {
      handleCatchError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleNewChat = (userId: string) => {
    const existingChat = chatList.find((chat) =>
      chat.users.some((user) => user._id === userId)
    )
    if (existingChat) {
      navigate(`${AppRoutings.Chats}/${existingChat._id}`)
      return
    }
    handleAccessChat(userId)
  }

  const handleAccessChat = async (userId: string) => {
    try {
      setCreatingChatId(userId)
      const response = await chatService.accessChat(userId)
      const { _id } = response.data.data
      dispatch(updateChatList(response.data.data))
      navigate(`${AppRoutings.Chats}/${_id}`)
    } catch (error: any) {
      handleCatchError(error)
    } finally {
      setCreatingChatId(null)
    }
  }

  const debouncedResults = useMemo(() => {
    return debounce(getFriendsList, 700)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  useEffect(() => {
    if (search) {
      debouncedResults()
    } else {
      setFriendsList(tempFriendsList)
    }

    return () => {
      debouncedResults.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <Box className={classes.mainWrapper}>
      <TextField
        value={search}
        inputProps={{
          ref: searchFieldRef,
        }}
        disabled={!!creatingChatId}
        id="search-friends"
        placeholder="Search friends..."
        onChange={handleSearchValueChange}
      />
      <Box className={classes.listWrapper}>
        <CustomLoaderContainer isLoading={loading}>
          {friendsList.map((friendInfo: IUserDetails) => {
            const { _id, firstName, lastName, profileImage } = friendInfo
            const fullName = `${firstName} ${lastName}`
            return (
              <Box
                key={_id}
                className={classes.friendInfoWrapper}
                onClick={() => handleNewChat(_id)}
              >
                <Avatar src={profileImage} />
                <Typography variant="h6">{fullName}</Typography>
                {creatingChatId === _id && <CircularProgress size={16} />}
              </Box>
            )
          })}
        </CustomLoaderContainer>
      </Box>
    </Box>
  )
}

export default NewChat
