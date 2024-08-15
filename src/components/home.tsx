import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from '@mui/material'
import Layoults from './Layoult/Layoults'
import currentNews from "../content/currentNews.json"
import upArrow from "../assets/gifs/upArrow.gif"

const Home = ({theme}) => {

  const secondaryTheme = theme.palette.secondary;
  console.log(currentNews);

  let positivity;
  if(currentNews.positivity === true){
    positivity = "green"
  } else if (currentNews.positivity === false) {
    positivity = "red"
  } else {
    positivity = "yellow"
  }

  return (
    <Layoults>
      <Stack
        sx={{
          height: "100%",
          alignItems: "center",
          gap: "3rem"
        }}
      >
        <Typography variant="h3">
          Das
        </Typography>
        <Card sx={{ maxWidth: 345, backgroundColor: positivity}}>
          <CardContent>
            
            <Typography gutterBottom variant="h5" component="div">
              What's on?
            </Typography>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
              <Grid item xs={9}>
                <Typography gutterBottom variant="h5" component="div">
                  {currentNews.title}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                {currentNews.positivity === true ?
                  (<img style={{width: "2rem"}} src={upArrow} alt="upArrow" />) : ""
                }
              </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary">
            {currentNews.text}
            </Typography>
            <Typography variant='caption' color="CaptionText">
              {currentNews.date}
            </Typography>
          </CardContent>

        </Card>
      </Stack>
    </Layoults>
  )
}

export default Home