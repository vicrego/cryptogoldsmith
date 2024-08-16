import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography,  } from '@mui/material'
import Layoults from './layoult/Layoults'
import currentNews from "../content/currentNews.json"
import upArrow from "../assets/gifs/upArrow.gif"

const Home = ({theme}:any) => {

  const secondaryTheme = theme.palette.secondary;
  console.log(currentNews);

  let positivity;
  if(currentNews[0].positivity === true){
    positivity = "green"
  } else if (currentNews[0].positivity === false) {
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
        <Typography variant="h3" >
          Das
        </Typography>
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
                  (<img style={{width: "2rem"}} src={upArrow} alt="upArrow" />) : <img style={{width: "2rem"}} src={upArrow} alt="upArrow" class="rotate90"/>
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
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {currentNews.filter((news) => currentNews[0] != news).map(filteredNews => (
              <Grid item xs={6}>
          
              <Card sx={{ maxWidth: 345, backgroundColor: positivity}}>
                <CardContent>
                  <Grid container rowSpacing={1} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
                    <Grid item xs={9}>
                      <Typography gutterBottom variant="h5" component="div" color={"yellow"}>
                        {filteredNews.title}
                      </Typography>
                    </Grid>
                    
                  </Grid>
                  <Typography variant="body2" color="yellow" >
                    {filteredNews.text}
                  </Typography>
                  <Typography variant='caption' color="CaptionText" component="div"   textAlign={"center"}>
                    {filteredNews.date}
                  </Typography>
                </CardContent>
              </Card>
              </Grid> 
            ))}

        </Grid>
      </Stack>
    </Layoults>
  )
}

export default Home