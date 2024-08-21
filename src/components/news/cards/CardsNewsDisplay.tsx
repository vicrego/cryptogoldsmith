
import { Box, Card, CardContent, Grid, Pagination, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'



function paginator(items: any, current_page: any, per_page_items: any) {
  console.log("items",items)
  console.log("items",current_page)
  console.log("per_page",per_page_items)

  
  let page = current_page || 1,
    per_page = per_page_items,
    offset = (page - 1) * per_page,
    paginatedItems = items.slice(offset).slice(0, per_page_items),
    
    total_pages = Math.ceil(items.length / per_page);
    console.log(total_pages)
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

const CardsNewsDisplay = ({news}: any) => {
    
    console.log("news", news)
    let count = 0;
    let newsData = [];
    try {
      count = Math.ceil(news.payload.length / 4);
      newsData = news.payload;
    } catch (error) {
      console.error(error);
    }


    console.log("ceil", count)
    const [page, setPage] = useState(1);
    const handleChange = (event, value: any) => {
      setPage(paginator(newsData, value, 3).page);
    };
    
    return (
        <Box>
          
            <Grid container rowSpacing={2} 
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
            {paginator(newsData, page, 4).data.map((filteredNews: any, index: any) => (
                <Grid item sx={{ width: "15rem"}} xs={6} key={index}>  
                <Card >
                    <CardContent>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                        <Grid item xs={9}>
                        <Typography gutterBottom variant="h5" component="div" >
                            {filteredNews.title}
                        </Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="body2" textAlign={"justify"}>
                        {/*filteredNews.content*/}
                    </Typography>
                    <Typography variant="caption" color="CaptionText" component="div" textAlign={"center"}>
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
        </Box>
      );
    };

export default CardsNewsDisplay