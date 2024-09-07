import { useTheme } from '@emotion/react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowDropDownCircleOutlined, BorderColor } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, ClickAwayListener, Drawer, Grow, IconButton, List, ListItem, ListItemButton, ListItemIcon, Menu, MenuItem, MenuList, Paper, Popper, Select, Stack, ThemeProvider, Toolbar, Typography, styled, useMediaQuery } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {

  const phoneDisplay = useMediaQuery('(max-width:698px)');

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [subMenu, setSubMenu] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  
  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const CustomAccordion = styled(Accordion)(({ theme }) => {
    return {
      //boxShadow: 'none', // this styles directly apply to accordion
      //border: `1px solid gray`,

      '.MuiAccordionDetails-root': { border: "none" },
      '.MuiAccordionSummary-root': {     padding: 0, margin: 0, minHeight: 0}, // this apply to Summary
      '.MuiAccordionSummary-gutters': {},
      '.MuiAccordionSummary-content': {margin: 0}
    };
  });


  const DrawerList = (
    <Box sx={{ width: 250, marginTop: 3 }} role="presentation" >
      <Link to={"/"}>
        <Typography sx={{ minWidth: 100, p: "20px 20px", color: "black"}}>
          Home
        </Typography>
      </Link>
      <Link to={"/news"}>
        <Typography sx={{ minWidth: 100, p: "20px 20px", color: "black" }}>
          News
        </Typography>   
      </Link>
    
      <CustomAccordion sx={{ minWidth: 100, p: "20px 20px" }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownCircleOutlined  />}
          aria-controls="panel2-content"
          id="panel2-header"
          //sx={{p: 0, marginTop: 0}}
        >
          <Typography>Graph</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            <MenuList id="split-button-menu" autoFocusItem>
              <MenuItem>
              <Link to={"../graphs/current"}>
                <Typography sx={{padding: "20px 0", color: "black"}}>
                  Current Prices
                </Typography>
              </Link>
              </MenuItem>
              <MenuItem>
                <Link to={"../graphs/predictions"}>
                  <Typography sx={{padding: "0px 0", color: "black"}}>
                    Price Predictions
                  </Typography>
                </Link>
              </MenuItem>
            </MenuList>
          </ul>
        </AccordionDetails>
      </CustomAccordion>    
    </Box>
  );


  return (
    <Box>

      {phoneDisplay ? (
      <Box sx={{padding: "20px 34px"}}>
        <FontAwesomeIcon size={'2x'} onClick={toggleDrawer(true)} icon={faBars} />
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer> 
         
      </Box>
      ) : (

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
          <Button href={"/"} sx={{backgroundColor: theme.palette.primary.dark}} variant="contained">Home</Button>
        </Typography>
        <Typography sx={{ minWidth: 100 }}>
          <Button href={"/news" } sx={{backgroundColor: theme.palette.primary.dark}} variant="contained">News</Button>
        </Typography>   
          
        <ButtonGroup
          variant="contained"
          ref={anchorRef}
          aria-label="Button group with a nested menu"
        >
          <Button onClick={handleClick} sx={{backgroundColor: theme.palette.primary.dark}}>Graphs</Button>
        </ButtonGroup>
        <Popper
          sx={{
            zIndex: 100,
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
      
    </Box>)}
  </Box>
  )
}

export default Navbar