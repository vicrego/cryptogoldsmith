import React from 'react'
import Layoults from '../../layoult/Layoults'
import { Stack, Typography } from '@mui/material'

const Current = () => {
  return (
    <Layoults>
      <Stack         
      sx={{
        height: "100%",
        alignItems: "center",
        gap: 3
      }}>
        <Typography variant="h3" alignItems="center">
            Current
        </Typography>
      </Stack>
    </Layoults>
  )
}

export default Current