import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Pagination, Stack, Typography,  } from '@mui/material'
import Layoults from '../layoult/Layoults'
import currentNews from "../../content/currentNews.json"
import upArrow from "../assets/gifs/upArrow.gif"
import { useState } from 'react'
import CardReport from './cards/CardReport'
import CardsDisplay from './cards/CardsHomeDisplay'




const Home = ({theme}:any) => {
  
  return (
    <Layoults>
      <Stack
        sx={{
          height: "100%",
          alignItems: "center",
          gap: 1.5
        }}
        
      >
        <Typography variant="h3" sx={{p: 2}}>
          Das
        </Typography>
        <CardReport currentNews={currentNews}/> 
        <CardsDisplay currentNews={currentNews}/>
      </Stack>
    </Layoults>
  )
}

export default Home