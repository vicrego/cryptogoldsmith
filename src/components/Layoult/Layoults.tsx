import React from 'react'
import { Stack } from '@mui/material'
import Navbar from '../header/Navbar'


const Layoults = ( { children }: { children: React.ReactNode }) => {

  return (
    <Stack>
      <Navbar/>
      <Stack>
        {children}
      </Stack>
    </Stack>
  )
}

export default Layoults