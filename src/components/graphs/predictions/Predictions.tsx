import { useEffect, useState } from 'react'
import Layoults from '../../layoult/Layoults'
import { Box, Button, Card, CardContent, FormControl, FormControlLabel, FormLabel, Grid, ImageList, ImageListItem, Radio, RadioGroup, Stack, Typography, useMediaQuery } from '@mui/material'
import pricePrediction from "../../../content/pricePrediction.json"
import DOMPurify from "dompurify";
import CurrencyInput from 'react-currency-input-field';
import axios from 'axios';
import { useTheme } from '@emotion/react';
import Carousel from 'react-material-ui-carousel';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Character {
  price: {
    bullish: number,
    bear: number
  }
  img: string,
  name: string,
  description: string,
  statement: string,
  bullish: string,
  date: number
}

const Predictions = () => {

  const theme: any = useTheme();
  const charactersArray = JSON.stringify(pricePrediction);
  const sanitizedCharactersArray = JSON.parse(DOMPurify.sanitize(charactersArray));  
  const [character, setCharacter] = useState<Character>();
  const [prediction, setPrediction] = useState(0);
  const [bitcoinPrice, setBitcoinPrice] = useState("");
  const [selectedRadio, setSelectedRadio] = useState("bullish");
  const [inputValue, setInputValue]= useState(0);

  
  const phoneDisplay = useMediaQuery('(max-width:698px)');


  useEffect(() => {
    setCharacter(sanitizedCharactersArray[0]);  
    const options = {
      method: 'GET',
      url: 'https://api.coingecko.com/api/v3/simple/price',
      params: {ids: 'bitcoin', vs_currencies: 'usd'},
      headers: {accept: 'application/json', 'x-cg-api-key': 'CG-TVPFcDZPCzEVwuTp3GdRwhqZ'}
    };
    axios.request(options)
    .then(function (response) {
      setBitcoinPrice(response.data.bitcoin.usd);
    })
    .catch(function (error) {
      console.error(error);
    }); 
  }, []);

  const handleClick = (character: any) => {
    setCharacter(character);
    setInputValue(0);
    setPrediction(0);
  };

  const handleCarousel = (value: any) => {
    let chosenCharacter = sanitizedCharactersArray[value];
    setCharacter(chosenCharacter)
  }
  

  const handleRadio = () => {
    setInputValue(0);
    setPrediction(0);
    const selectedRadio: any = document.querySelector("#radio-buttons-group input[type='radio']:checked");
    if (selectedRadio) {
      const selectedValue = selectedRadio.value; 
      setSelectedRadio(selectedValue);
    } 
  }

  const handleInputText = (value: any, name: any, values: any) => {
    if(selectedRadio === "bullish"){
      calculation(value, values, character?.price.bullish);
    } else if(selectedRadio === "bear"){
      calculation(value, values, character?.price.bear);
    } else{
      Error(name);
    };
  }

  const calculation = (value: any, values: any, characterPrediction: any) => {
    setInputValue(values.float);
    
    if(value === undefined){
      setPrediction(0);
    } else {
      let inputDollars = values.float;
      let currentDollarPrice = parseFloat(bitcoinPrice);
      let futureDollarPrice = characterPrediction;
      let outputDollars = 0.00;
      
      outputDollars = inputDollars * futureDollarPrice / currentDollarPrice;
      let outputRounded = Math.round((outputDollars + Number.EPSILON) * 100) / 100;
      setPrediction(outputRounded);      
    }
  }

  const DisclaimerCard = () => {
    return (
      <Card variant="outlined" sx={{width: "76%", textAlign: "center", margin: 2}}>
        <CardContent>
          <FontAwesomeIcon 
            //style={{alignSelf: "flex-end"}} 
            icon={faTriangleExclamation} 
            size="xl"
            className='faXmark'
          />
          <Typography>Disclaimer!</Typography>
          <Typography>These are just predictions, as in the past most of them were wrong. There's no certainty about these prediction.</Typography>
        </CardContent>
      </Card>
    )
  }


  return (
    <Layoults>
      {phoneDisplay ? (
        <Stack sx={{alignItems: "center"}}>
          <DisclaimerCard/>
          <Carousel
            autoPlay={false} // <-- You probaly want to disable this for our purposes
            indicators={false}
            navButtonsAlwaysVisible
            next={(next) => handleCarousel(next)}
            prev={(prev) => handleCarousel(prev)}
            sx={{
              width: "100%", 
              height: 380,
              alignSelf: "center", 
              overflow: "hidden"
            }}    
            navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
              style: {
                backgroundColor: theme.palette.primary.dark,
              }
            }}    
          >
            {sanitizedCharactersArray.map((data: any) => (
              <Box sx={{height: 380}}>
                {data && ""}
                <Box >
                  <ImageListItem 
                    sx={{
                      width: "20rem", 
                      alignItems: "center", 
                      marginLeft: "auto", 
                      marginRight: "auto",
                    }} 
                    key={character?.img} 
                  >
                    <img
                      srcSet={`${character?.img}`}
                      src={`${character?.img}`}
                      alt={character?.name}
                      loading="lazy"
                      style={{backgroundColor: "yellow", alignSelf: "center"}}
                    />  
                    <Typography gutterBottom variant="h5" component="div" textAlign={"center"} 
                      sx={{color: "silver"}}>
                      {character?.name} 
                    </Typography>
                  </ImageListItem>
                </Box>
              </Box>
            ))}
          </Carousel>
          <Box sx={{margin: 5}}>
            <Typography sx={{width: "100%", alignContent: "center", textAlign: "justify"}}>
              <div dangerouslySetInnerHTML={{__html: character?.description ?? ""}} />
            </Typography>
            <Typography gutterBottom variant="h5" p={4} component="div" textAlign={"center"}>
              <div dangerouslySetInnerHTML={{__html: character?.statement ?? ""}} />
            </Typography>
            <FormControl sx={{width: "100%", alignItems: "center"}}  >
              <FormLabel id="radio-buttons-group">
                <Typography variant="h4" sx={{p: 2, color: 'white'}} >
                  {character?.date}
                </Typography>
              </FormLabel>
              <Grid container       
                direction="row"
                justifyContent="left"
                alignItems="stretch"
                rowSpacing={1} 
                sx={{paddingLeft: 3.2}}
                columnSpacing={{ xs: 10 }} >
                <Grid item sm={4}>
                  <RadioGroup
                    id="radio-buttons-group"
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="bullish"
                    name="radio-buttons-group"
                    onChange={() => handleRadio()}
                  >
                    {character?.price.bullish &&
                      (<FormControlLabel  
                        value="bullish" 
                        control={<Radio sx={{
                          '& .MuiSvgIcon-root': {
                            fontSize: 34,
                          },
                        }}/>} 
                        label="Bullish" 
                      />)
                    }
                    {character?.price.bear &&
                      <FormControlLabel value="bear" control={<Radio sx={{
                        '& .MuiSvgIcon-root': {
                          fontSize: 34,
                        },
                      }}/>} label="Bear" />
                    }
                  </RadioGroup>
                </Grid>
                <Grid item  sx={{alignContent: "center"}}>
                  <CurrencyInput
                    id="input-example"
                    name="input-name"
                    placeholder="Enter a number"
                    decimalsLimit={2}
                    style={{padding: "0.6rem 1rem", width: 130, fontSize: "100%" }}
                    value={inputValue}
                    onValueChange={(value, name, values) => handleInputText(value, name, values)}
                  />
                </Grid>
              </Grid>
              <Box 
                sx={{
                  background: "black", 
                }}>
                <Typography variant="h4" 
                  sx={{
                    p: 0.2, 
                    color: "white",
                  }}
                >
                  ${prediction}
                </Typography>
              </Box>
            </FormControl>
          </Box>
        
        </Stack>
      ) : (
        <Grid container rowSpacing={1} columns={{ sm: 3.9, md: 28, lg: 44 }} >
          <Grid item sm={1.5} md={8.5} lg={12}>
            <ImageList className="characterButton" sx={{ width: 240, height: "100vh"}} cols={1} rowHeight={300} >
              {sanitizedCharactersArray.map((character: any) => (
                <Button onClick={() => handleClick(character)}>
                  <ImageListItem key={character.img}>
                    <img
                      srcSet={`${character.img}`}
                      src={`${character.img}`}
                      alt={character.name}
                      loading="lazy"
                    />  
                    <Typography variant="h5" component="div" textAlign={"center"} sx={{color: "white"}}>
                      {character.name} 
                    </Typography>
                  </ImageListItem>
                </Button>
              ))}
            </ImageList>
          </Grid>
          <Grid item sm={2} md={18} lg={25} textAlign={"justify"}  >
            <Stack sx={{alignItems: "center"}}>
              <DisclaimerCard/>
              <Typography variant="h3" sx={{p: 2, paddingBottom: 3}} textAlign="center">
                {character?.name}
              </Typography>
              
              <Typography sx={{width: "100%", alignContent: "center"}}>
                <div dangerouslySetInnerHTML={{__html: character?.description ?? ""}} />
              </Typography>
              <Typography gutterBottom variant="h5" p={4} component="div" textAlign={"center"}>
                <div dangerouslySetInnerHTML={{__html: character?.statement ?? ""}} />
              </Typography>
              <FormControl sx={{width: "100%", alignItems: "center"}}  >
                <FormLabel id="radio-buttons-group">
                  <Typography variant="h4" sx={{p: 2, color: 'white'}} >
                    {character?.date}
                  </Typography>
                </FormLabel>
                <Grid container       
                  direction="row"
                  justifyContent="center"
                  alignItems="stretch"
                  rowSpacing={1} 
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                  <Grid item xs={5}>
                    <RadioGroup
                      id="radio-buttons-group"
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="bullish"
                      name="radio-buttons-group"
                      onChange={() => handleRadio()}
                    >
                      {character?.price.bullish &&
                        (<FormControlLabel value="bullish" control={<Radio />} label="Bullish" />)
                      }
                      {character?.price.bear &&
                        <FormControlLabel value="bear" control={<Radio />} label="Bear" />
                      }
                    </RadioGroup>
                  </Grid>
                  <Grid item sm={3} >
                    <CurrencyInput
                      id="input-example"
                      name="input-name"
                      placeholder="Enter a number"
                      decimalsLimit={2}
                      style={{padding: "0.6rem 1rem", width: 130, fontSize: "100%" }}
                      value={inputValue}
                      onValueChange={(value, name, values) => handleInputText(value, name, values)}
                    />
                  </Grid>
                </Grid>
                <Box>
                  <Typography variant="h4" 
                    sx={{
                      p: 0.2, 
                      color: "white",
                    }}
                  >
                    ${prediction}
                  </Typography>
                </Box>
              </FormControl>
            </Stack>
          </Grid>
        </Grid>
      )}

    </Layoults>
  )
}

export default Predictions