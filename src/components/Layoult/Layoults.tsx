import React, { Children } from 'react'
import Navbar from '../Header/Navbar'
import { Outlet } from 'react-router-dom'
import { Box, Stack } from '@mui/material'
import { createTheme } from '@mui/material/styles';


const Layoults = ( { children, ...props }: { children: React.ReactNode }) => {

  return (
    <Stack  
      sx={{
        height: "100vh",
      }}
    >
      <Navbar/>
      <Stack 
        sx={{
          p: "0 2rem", 
          height: "100%",
        }}
      >
        {children}
      </Stack>
    </Stack>
  )
}

export default Layoults