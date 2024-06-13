import { useLayoutEffect } from "react"
import { Box, IconButton, useMediaQuery } from "@mui/material"
import { styled } from "@mui/system"
import { Theme } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"
import { ArrowBackIosRounded } from "@mui/icons-material"
import SearchUserList from "components/SearchUserList"
import { PRIMARY_MAIN } from "configs/theme"

const MainWrapper = styled(Box)({
  padding: "15px 15px 15px 10px",
  display: "flex",
  gap: "10px",
  alignItems: "center",
  backgroundColor: PRIMARY_MAIN,
})

const BackIcon = styled(ArrowBackIosRounded)({
  color: "#fff",
})

const Search = () => {
  const navigate = useNavigate()
  const isMobileScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  )

  useLayoutEffect(() => {
    if (!isMobileScreen) {
      navigate(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobileScreen])

  const handleBackRedirect = () => {
    navigate(-1)
  }
  return (
    <Box>
      <MainWrapper>
        <IconButton onClick={handleBackRedirect}>
          <BackIcon />
        </IconButton>
        <Box flex={1}>
          <SearchUserList isMobileScreenSearch />
        </Box>
      </MainWrapper>
    </Box>
  )
}

export default Search
