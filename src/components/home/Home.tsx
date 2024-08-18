import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Pagination, Stack, Typography,  } from '@mui/material'
import Layoults from '../layoult/Layoults'
import currentNews from "../../content/currentNews.json"
import upArrow from "../assets/gifs/upArrow.gif"
import { useState } from 'react'
import CardReport from './cards/CardReport'
import CardsDisplay from './cards/CardsDisplay'




const Home = ({theme}:any) => {

  const count = Math.ceil(currentNews.length / 3);
  const [page, setPage] = useState(1);
  const handleChange = (event, value: any) => {
    setPage(paginator(currentNews, value, 3).page);
  };
  const [checked, setChecked] = useState([]);
  const handleOnChange = (e, index: any) => {
    let prev = checked;
    let itemIndex = prev.indexOf(index);
    if (itemIndex !== -1) {
      prev.splice(itemIndex, 1);
    } else {
      prev.push(index);
    }
    setChecked([...prev]);
  };


  return (
    <Layoults>
      <Stack
        sx={{
          height: "100%",
          alignItems: "center",
          gap: "3rem"
        }}
      >
        <Typography variant="h3" >
          Das
        </Typography>
        <CardReport currentNews={currentNews}/>  
        <CardsDisplay currentNews={currentNews}/>


      </Stack>
    </Layoults>
  )
}

export default Home