import { Avatar, Box, Button, Divider, IconButton, Link, ListItemIcon, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import React from 'react'


const Navbar = () => {
  return (
    <Box
        sx={{
            padding: "20px",
            backgroundColor: "silver",
        }}
    >
        <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textAlign: 'center' 
        }}>
        <Typography sx={{ minWidth: 100 }}>
          <Button href={"/"} variant="contained">Home</Button>
        </Typography>
        <Typography sx={{ minWidth: 100 }}>
          <Button href={"/news" } variant="contained">News</Button>
        </Typography>      
    </Box>   
  </Box>
  )
}

export default Navbar