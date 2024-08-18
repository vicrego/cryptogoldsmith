import { Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import upArrow from "../../../assets/gifs/upArrow.gif"

const CardReport = ({currentNews}: any) => {

    let positivity;
    if(currentNews[0].positivity === true){
      positivity = "green"
    } else if (currentNews[0].positivity === false) {
      positivity = "red"
    } else {
      positivity = "yellow"
    }
  
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: positivity}}>
      <CardContent>
        
        <Typography gutterBottom variant="h5" component="div" textAlign={"center"} color={"yellow"}>
            WHAT's ON?
        </Typography>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
            <Grid item xs={9}>
            <Typography gutterBottom variant="h5" component="div" color={"yellow"}>
                {currentNews[0].title}
            </Typography>
            </Grid>
            <Grid item xs={2}>
            {currentNews[0].positivity === true ?
                (<img style={{width: "2rem"}} src={upArrow} alt="upArrow" />) : <img style={{width: "2rem"}} src={upArrow} alt="upArrow" className="rotate90"/>
            }
            </Grid>
        </Grid>
        <Typography variant="body2" color="yellow" >
            {currentNews[0].text}
        </Typography>
        <Typography variant='caption' color="CaptionText" component="div"   textAlign={"center"}>
            {currentNews[0].date}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardReport