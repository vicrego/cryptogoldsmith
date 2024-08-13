import React from 'react'
import Navbar from '../Header/Navbar'
import { Outlet } from 'react-router-dom'
import { Box, Stack } from '@mui/material'

const Layoults = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <Stack  
    sx={{
      height: "100vh",
    }}
  >
        <Navbar/>
        {children}
    </Stack>
  )
}

export default Layoults