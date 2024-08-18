import { Box, Stack, Typography } from '@mui/material'
import Layoults from '../layoult/Layoults'

const News = () => {
  return (
    <Box>
        <Layoults>
          <Stack         
          sx={{
            height: "100%",
            justifyContent: "space-between",
          }}>
          <Typography variant="h3">
            News
          </Typography>
          </Stack>
        </Layoults>
    </Box>
  )
}

export default News