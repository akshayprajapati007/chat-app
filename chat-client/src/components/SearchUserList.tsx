import { useState, useEffect, useMemo } from "react"
import { Box, InputAdornment, CircularProgress } from "@mui/material"
import SearchRoundedIcon from "@mui/icons-material/SearchRounded"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import { makeStyles } from "@mui/styles"
import TextField from "components/TextField"
import { ISearchUserDetails } from "utility/interfaces/users"
import userService from "services/user-service"
import { toast } from "react-toastify"
import { debounce } from "lodash"
import SearchUserCard from "./SearchUserCard"

const useStyles = makeStyles({
  searchWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  usersListWrapper: {
    position: "absolute",
    marginTop: "5px",
    color: "#000",
    width: "100%",
    maxHeight: "250px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    zIndex: 1,
    boxShadow: "0 2px 18px 4px rgba(176, 176, 176, 0.22)",
  },
  searchField: {
    width: "350px",
    "& > div": {
      padding: "8px 10px",
    },
    "& fieldset": {
      borderColor: "transparent !important",
    },
  },
  searchCloseButton: {
    outline: "none",
    border: "none",
    padding: "2px",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
      borderRadius: "50%",
    },
    "& > svg": {
      color: "rgba(0, 0, 0, 0.54)",
    },
  },
  profileInfoWrapper: {
    textDecoration: "none",
    "& > div": {
      color: "#fff",
      display: "flex",
      gap: "8px",
      alignItems: "center",
      padding: "6px 12px",
      fontWeight: 500,
      fontSize: "0.9rem",
      fontFamily: "'Montserrat', sans-serif",
      borderRadius: "20px",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
      },
    },
  },
})

const SearchUserList = () => {
  const classes = useStyles()

  const [search, setSearch] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [usersList, setUsersList] = useState<ISearchUserDetails[]>([])

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearch(value)
    if (!value) setUsersList([])
  }

  const handleClearSearchValue = () => {
    setSearch("")
    setUsersList([])
  }

  const handleSearchUsers = async () => {
    setIsSearching(true)
    try {
      const response = await userService.searchUsers(1, 10, search)
      setUsersList(response.data.data)
    } catch (e: any) {
      toast.error(e.response.data.error)
      setUsersList([])
    } finally {
      setIsSearching(false)
    }
  }

  const debouncedResults = useMemo(() => {
    return debounce(handleSearchUsers, 700)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  useEffect(() => {
    if (search.length > 2) {
      debouncedResults()
    }

    return () => {
      debouncedResults.cancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <Box className={classes.searchWrapper}>
      <Box position="relative">
        <TextField
          value={search}
          onChange={handleSearchValueChange}
          autoComplete="off"
          placeholder="Search"
          className={classes.searchField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: isSearching ? (
              <InputAdornment position="end">
                <CircularProgress size={16} />
              </InputAdornment>
            ) : search ? (
              <button
                className={classes.searchCloseButton}
                onClick={handleClearSearchValue}
              >
                <CloseRoundedIcon fontSize="small" />
              </button>
            ) : null,
          }}
        />
        <Box className={classes.usersListWrapper}>
          <Box>
            {usersList.map((user: ISearchUserDetails) => {
              const {
                _id,
                firstName,
                lastName,
                profileImage,
                friendshipStatus,
              } = user
              const fullName = `${firstName} ${lastName}`

              return (
                <SearchUserCard
                  key={_id}
                  id={_id}
                  name={fullName}
                  profileImage={profileImage}
                  friendshipStatus={friendshipStatus}
                />
              )
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default SearchUserList
