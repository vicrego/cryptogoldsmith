import { Box, Button, Stack, Typography,  } from '@mui/material'
import Layoults from '../layoult/Layoults'
import currentNews from "../../content/currentNews.json"
import CardReport from './cards/CardReport'
import CardsDisplay from './cards/CardsHomeDisplay'
import { useState } from 'react'
import Modal from '@mui/material/Modal';
import { useTheme } from '@emotion/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';


const Home = () => {
  let theme: any = useTheme()

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: theme.palette.primary.dark,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

  return (
    <Layoults>
      <Stack
        sx={{
          alignItems: "center",
          gap: 1.5
        }}
      >
        <Typography variant="h3" sx={{p: 2}}>
          What's On?
        </Typography>
        <CardReport currentNews={currentNews}/>
        <Button onClick={handleOpen} sx={{backgroundColor: theme.palette.primary.dark}}>
          <Typography sx={{color: "white", background: ""}}>
            Find out more...
          </Typography>
        </Button> 

        <Stack>  
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description" 
          >
              <Box sx={style}>
                <Box sx={{ textAlign: "end", marginRight: 2 }}>
                  <Button 
                    onClick={handleClose} 
                    sx={{
                      
                      color: "white",
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                  >
                  <FontAwesomeIcon 
                    style={{alignSelf: "flex-end"}} 
                    icon={faXmark} 
                    size="xl"
                    className='faXmark'
                  />
                  </Button>
                </Box>
                <CardsDisplay currentNews={currentNews}/>
              </Box>
       
          </Modal>
        </Stack>
      </Stack>
    </Layoults>
  )
}

export default Home