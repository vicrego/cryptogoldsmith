import { Stack, Typography } from '@mui/material'
import Layoults from '../layoult/Layoults'
import axios from 'axios';
import { useEffect, useState } from 'react';
import CardsNewsDisplay from './cards/CardsNewsDisplay';

const News = () => {


  const [news, setNews] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response   
 = await axios.get('https://crypto-news-api5.p.rapidapi.com/news', {
          headers: {
            'x-rapidapi-key': 'e0d6374b36msh236f8c7f2dc2df6p1e5ddcjsn0b7504f86d09',
            'x-rapidapi-host': 'crypto-news-api5.p.rapidapi.com'
          }
        });
        setNews(response.data);
      } catch (error) {
        console.log("error")
      } finally {
        console.log("error")
      }
    };

    fetchData();
  }, []);


  return (
    <Layoults>
      <Stack         
      sx={{
        height: "100%",
        alignItems: "center",
        gap: 3
      }}>
      <Typography variant="h3" sx={{p: 2}}>
        News
      </Typography>
     <CardsNewsDisplay news={news}/>
      </Stack>
    </Layoults>
  )
}

export default News