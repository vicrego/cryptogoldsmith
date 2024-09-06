import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Layoults from '../../layoult/Layoults'
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, ImageList, ImageListItem, InputLabel, Radio, RadioGroup, Stack, Typography, useMediaQuery } from '@mui/material'
import pricePrediction from "../../../content/pricePrediction.json"
import DOMPurify from "dompurify";
import CurrencyInput from 'react-currency-input-field';
import axios from 'axios';
import { useTheme } from '@emotion/react';
import Carousel from 'react-material-ui-carousel';
import { FitScreen } from '@mui/icons-material';


const Predictions = () => {

  const theme = useTheme();
  const charactersArray = JSON.stringify(pricePrediction);
  const sanitizedCharactersArray = JSON.parse(DOMPurify.sanitize(charactersArray));  
  const [character, setCharacter] = useState();
  const [prediction, setPrediction] = useState(0);
  const [bitcoinPrice, setBitcoinPrice] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState("bullish");
  const [inputValue, setInputValue]= useState(0);
  const [char, setChar]= useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Optional, for later access

  
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
    console.log(character)
    setCharacter(character);
    setInputValue(0);
    setPrediction(0);
  };

  const handleCarousel = (value: any) => {
    let chosenCharacter = sanitizedCharactersArray[value];
    console.log("character", character)
    setCharacter(chosenCharacter)
  }
  

  const handleRadio = () => {
    setInputValue(0);
    setPrediction(0);
    const selectedRadio = document.querySelector("#radio-buttons-group input[type='radio']:checked");
    if (selectedRadio) {
      const selectedValue = selectedRadio.value; 
      setSelectedRadio(selectedValue);
    } 
  }

  

  useEffect(() => {
    console.log("uiui")
    if (sanitizedCharactersArray.length > 0) {
      setSelectedCharacter(sanitizedCharactersArray[0]); // Set initial character
    }
  }, [character]);
  
  const handleInputText = (value: any, name: any, values: any) => {
    if(selectedRadio === "bullish"){
      calculation(value, values, character?.price.bullish);
    } else if(selectedRadio === "bear"){
      calculation(value, values, character?.price.bear);
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

  

  return (
    <Layoults>
      {phoneDisplay ? (
        <Stack>
          <Stack sx={{maxHeight: "fit-content"}}> 
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
              /*indicatorContainerProps={{
                style: {
                    marginTop: 50, // 5

                }
              }}*/
            >
              {sanitizedCharactersArray.map((character: any) => (
              <Box sx={{height: 380}}>
                <Box >
                  <ImageListItem 
                    sx={{
                      width: "20rem", 
                      alignItems: "center", 
                      marginLeft: "auto", 
                      marginRight: "auto",
                    }} 
                    key={character.img} 
                  >
                    <img
                      srcSet={`${character.img}`}
                      src={`${character.img}`}
                      alt={character.name}
                      loading="lazy"
                      style={{backgroundColor: "yellow", alignSelf: "center"}}
                    />  
                    <Typography gutterBottom variant="h5" component="div" textAlign={"center"} sx={{color: "silver"}}>
                      {character.name} 
                    </Typography>
                  </ImageListItem>
                </Box>
              </Box>
              ))}
            </Carousel>
            <Box >
              <Typography variant="h3" sx={{p: 2}} textAlign="center">
                Predictions
              </Typography>
              <Typography sx={{width: "100%", alignContent: "center", textAlign: "justify"}}>
                <div dangerouslySetInnerHTML={{__html: character?.description}} />
              </Typography>
              <Typography gutterBottom variant="h5" p={4} component="div" textAlign={"center"}>
                <div dangerouslySetInnerHTML={{__html: character?.statement}} />
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
                  <Grid item sm={3} sx={{alignContent: "center"}}>
                    <CurrencyInput
                      id="input-example"
                      name="input-name"
                      placeholder="Enter a number"
                      decimalsLimit={2}
                      value={inputValue}
                      onValueChange={(value, name, values) => handleInputText(value, "Input number", values)}
                    />
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    //alignContent: "center", 
                    background: theme.palette.primary.dark, 
                    borderRadius: 5,
                    width: "50%"
                  }}
                >
                  <Typography variant="h4" sx={{p: 2, color: 'white'}} textAlign="center">
                    ${prediction}
                  </Typography>
                </Box>
              </FormControl>
            </Box>

          </Stack>
          
        </Stack>
      ) : (
        <Grid container rowSpacing={1} columns={{ sm: 3.9, md: 28, lg: 40 }} >
          <Grid item sm={1.5} md={8.5} lg={12} >
            <ImageList sx={{ width: 240, height: "80vh"}} cols={1} rowHeight={300}>
              {sanitizedCharactersArray.map((character: any) => (
                <Button onClick={() => handleClick(character)}>
                  <ImageListItem key={character.img}>
                    <img
                      srcSet={`${character.img}`}
                      src={`${character.img}`}
                      alt={character.name}
                      loading="lazy"
                    />  
                    <Typography gutterBottom variant="h5" component="div" textAlign={"center"} sx={{color: "silver"}}>
                      {character.name} 
                    </Typography>
                  </ImageListItem>
                </Button>
              ))}
            </ImageList>
          </Grid>

          <Grid item sm={2.4} md={18} lg={25} textAlign={"justify"}>
            <Typography variant="h3" sx={{p: 2}} textAlign="center">
              Predictions
            </Typography>
            <Typography sx={{width: "100%", alignContent: "center"}}>
              <div dangerouslySetInnerHTML={{__html: character?.description}} />
            </Typography>
            <Typography gutterBottom variant="h5" p={4} component="div" textAlign={"center"}>
              <div dangerouslySetInnerHTML={{__html: character?.statement}} />
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
                    value={inputValue}
                    onValueChange={(value, name, values) => handleInputText(value, "Input number", values)}
                  />
                </Grid>
              </Grid>
              <Box 
                sx={{
                  //alignContent: "center", 
                  background: theme.palette.primary.dark, 
                  borderRadius: 5,
                  width: "50%"
                }}>
                  <Typography variant="h4" sx={{p: 2, color: 'white', textAlign: "center", alignSelf: "center"}} >
                    ${prediction}
                  </Typography>
                </Box>
            </FormControl>
          </Grid>
        </Grid>
      )}

    </Layoults>
  )
}

export default Predictions