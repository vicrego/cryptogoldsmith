import { Avatar, Box, Button, ButtonGroup, ClickAwayListener, Grow, Menu, MenuItem, MenuList, Paper, Popper, Select, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {



  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  
  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {

    setOpen(false);
  };


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
        
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="Button group with a nested menu"
      >
        <Button onClick={handleClick}>Graphs</Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'right' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ul onMouseLeave={handleClose} >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    <MenuItem>
                    <Link to={"../graphs/current"}>Current Prices
                    </Link>
                    </MenuItem>
                    <Link to={"../graphs/predictions"}>
                    Price Predictions
                    </Link>
                  </MenuList>
                </ClickAwayListener>
              </ul>
            </Paper>
          </Grow>
        )}
      </Popper>


    </Box>   
  </Box>
  )
}

export default Navbar