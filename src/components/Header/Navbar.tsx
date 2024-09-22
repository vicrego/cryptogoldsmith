import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ArrowDropDownCircleOutlined } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, ButtonGroup, ClickAwayListener, Drawer, Grow, MenuItem, MenuList, Paper, Popper, Stack, Typography, styled, useMediaQuery } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {

  const phoneDisplay = useMediaQuery('(max-width:698px)');

  const [open, setOpen] = React.useState(false);
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
  const CustomAccordion = styled(Accordion)(() => {
    return {
      '.MuiAccordion-root': {},
      '.MuiAccordion-rounded': {square: "false"},
      '.MuiAccordionSummary-expandIconWrapper': {marginRight: 50},
      '.MuiAccordionDetails-root': { border: "none" },
      '.MuiAccordionSummary-root': { padding: 0, margin: 0, minHeight: 0}, // this apply to Summary
      '.MuiAccordionSummary-gutters': {disableGutters: true},
      '.MuiAccordionSummary-content': {margin: 0}
    };
  });


  const DrawerList = (
    <Stack sx={{ width: 200, marginTop: 3, marginLeft: 3, gap:4 }} role="presentation" >
      <Link to={"/"}>
        <Typography sx={{ minWidth: 100, color: "white"}}>
          Home
        </Typography>
      </Link>
      <Link to={"/news"}>
        <Typography sx={{ minWidth: 100, color: "white" }}>
          News
        </Typography>   
      </Link>
    
      <CustomAccordion 
        sx={{ 
          minWidth: 100,   
          backgroundColor: "orange",
          boxShadow: "none",
          borderBottom: "1px solid orange",

        }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownCircleOutlined sx={{color: 'white'}}  />}
          aria-controls="panel2-content"
          id="panel2-header"
          
        >
          <Typography sx={{color: "white"}}>Graph</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ul>
            <MenuList id="split-button-menu"  autoFocusItem>
              <MenuItem>
              <Link to={"../graphs/current"}>
                <Typography sx={{color: "white"}}>
                  Current Prices
                </Typography>
              </Link>
              </MenuItem>
              <MenuItem>
                <Link to={"../graphs/predictions"}>
                  <Typography sx={{color: "white"}}>
                    Price Predictions
                  </Typography>
                </Link>
              </MenuItem>
            </MenuList>
          </ul>
        </AccordionDetails>
      </CustomAccordion>    
    </Stack>
  );


  return (
    <Box>

      {phoneDisplay ? (
      <Box sx={{padding: "20px 34px"}}>
        <FontAwesomeIcon size={'2x'} onClick={toggleDrawer(true)} icon={faBars} />
        <Drawer open={open}  
          PaperProps={{
          sx: {
            backgroundColor: "orange",
            color: "black",
          }
          }} 
          onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer> 
         
      </Box>
      ) : (
      <Box
        display={"flex"}
        flexDirection={'row'}
        justifyContent={"space-between"}
        sx={{
            padding: "20px",
            backgroundColor: "orange",
        }}
      >
        <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textAlign: 'center' 
        }}>
        <Link to={"/"} >
          <Typography 
            sx={{ 
              minWidth: 100, 
              color: "white",
              '&:hover': {
                color: 'red',
                borderBottom: "1px solid",
                marginBottom: "-1px"
              },
            }}>
            HOME
          </Typography>
        </Link>
        <Link to={"/news" } >
          <Typography 
            sx={{ 
              minWidth: 100, 
              color: "white",
              '&:hover': {
                color: 'red',
                borderBottom: "1px solid",
                marginBottom: "-1px"
              }
            }}>
            NEWS
          </Typography>
        </Link> 
        <ButtonGroup
          ref={anchorRef}
          aria-label="Button group with a nested menu"
          sx={{cursor: "pointer"}}
        >
          <Box 
            onClick={handleClick} 
            sx={{ 
              minWidth: 100, 
              color: "white",
              '&:hover': {
                color: 'red',
                borderBottom: "1px solid",
                marginBottom: "-1px"
              }
            }}>
            <Typography>
              GRAPHS
            </Typography>
          </Box>
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
                      <Link to={"../graphs/current"}>
                        <Typography sx={{color: "black"}}>Current Prices</Typography>
                      </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to={"../graphs/predictions"}>
                          <Typography sx={{color: "black"}}>
                            Price Predictions
                          </Typography>
                        </Link>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </ul>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>  
      <img style={{width: 40, marginRight: 40}} src="/favicon.svg"/>
    </Box>)}
  </Box>
  )
}

export default Navbar