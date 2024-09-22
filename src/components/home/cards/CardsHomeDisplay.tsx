

import { useTheme } from '@emotion/react';
import { Box, Card, CardContent, Grid, Pagination, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import upArrow from "../../../assets/gifs/upArrow.gif"


function paginator(items: any, current_page: any, per_page_items: any) {
    let page = current_page || 1,
    per_page = per_page_items,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page_items),
    total_pages = Math.ceil(items.length / per_page);
    
    return {
      page: page,
      per_page: per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      total: items.length - 1,
      total_pages: total_pages ,
      data: paginatedItems
    };
}

const CardsHomeDisplay = ({currentNews}: any) => {

  const theme: any = useTheme();
  const count = Math.ceil(currentNews.length / 4);
  const [page, setPage] = useState(1);

  const handleChange = (event: any, value: any) => {
    event = event;
    setPage(paginator(currentNews, value, 3).page);
  };

  
  return (
    <Stack sx={{ alignItems: "center", height: "70vh", overflowY: "scroll"}}>
      <Grid container sx={{alignContent: "center"}} rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}  >
      {paginator(currentNews, page, 4).data.filter((filtered: any) => filtered !== currentNews[0]).map((filteredNews: any, index: any) => (
        <Grid item sx={{marginLeft: "auto", marginRight: "auto", alignSelf: "center"}}  key={index}>  
          <Card sx={{ backgroundColor: theme.palette.primary.dark, height: 170}}>
            <CardContent >
              <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                <Grid item xs={9}>
                <Typography gutterBottom variant="h5" component="div" sx={{color: filteredNews.positivity ? "green" : filteredNews.positivity === false ? "red" : "yellow"}}>
                    {filteredNews.title}
                </Typography>
                </Grid>
                <Grid item xs={2}>
                {filteredNews.positivity === true ?
                  (<img style={{width: "1rem"}} src={upArrow} alt="upArrow" />) : <img style={{width: "1rem"}} src={upArrow} alt="upArrow" className="rotate90"/>
                }
                </Grid>
              </Grid>
              <Typography variant="body2" sx={{color: 'white'}} textAlign={"justify"}>
                  {filteredNews.text}
              </Typography>
              <Typography variant="caption" sx={{color: 'white'}} component="div" textAlign={"center"}>
                  {filteredNews.date}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      </Grid>
      <Box sx={{ p:3, display: "flex", justifyContent: "center" }}>
        <Pagination count={count} page={page} onChange={handleChange} color="primary" sx={{ button: { color: '#ffffff' } }} />
      </Box>
    </Stack>
  );
};

export default CardsHomeDisplay