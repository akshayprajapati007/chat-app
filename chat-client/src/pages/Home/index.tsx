import { Box, Typography } from "@mui/material"
import Layout from "components/Layout"
import { BRAND_LABEL } from "utility/constants"
import { WELCOME_TO_LABEL } from "utility/constants/messages"

const Home = () => {
  return (
    <Layout>
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3" align="center">
          {WELCOME_TO_LABEL}
        </Typography>
        <Typography color="primary" variant="h3" align="center">
          {BRAND_LABEL}
        </Typography>
      </Box>
    </Layout>
  )
}

export default Home
