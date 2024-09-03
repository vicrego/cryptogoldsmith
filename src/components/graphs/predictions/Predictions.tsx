import React, { useEffect, useState } from 'react'
import Layoults from '../../layoult/Layoults'
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, ImageList, ImageListItem, InputLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import pricePrediction from "../../../content/pricePrediction.json"
import DOMPurify from "dompurify";
import CurrencyInput from 'react-currency-input-field';
import axios from 'axios';
import { OutputRounded } from '@mui/icons-material';


const Predictions = () => {

  const charactersArray = JSON.stringify(pricePrediction);
  const sanitizedCharactersArray = JSON.parse(DOMPurify.sanitize(charactersArray));  
  //const lonetest = sanitizedCharactersArray[0];
  const [character, setCharacter] = useState();
  const [prediction, setPrediction] = useState(0);
  const [bitcoinPrice, setBitcoinPrice] = useState([]);
  const [predictionDollar, setPredictionDollar] = useState(0);
  const [inputPrice, setInputPrice] = useState(0);
  const [selectedRadio, setSelectedRadio] = useState("bullish");
  
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



  const handleClick = (price: any) => {
    setCharacter(price);
  };

  const handleRadio = () => {
    const itemText = document.getElementById("input-example");
    console.log("itemText.innerHTML",itemText)
    if (itemText) {
      itemText.innerHTML = "0";
      console.log("here")
    } else {
      console.error("Element with ID 'input-example' not found.");
    }
    
    //itemText.innerText = "";
    //document.getElementById("Form").reset();
    const selectedRadio = document.querySelector("#radio-buttons-group input[type='radio']:checked");
    setPrediction(0);
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
    };
    console.log("predictionDollar",predictionDollar)
  }

  const calculation = (value: any, values: any, characterPrediction: any) => {
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
      <Stack        
      sx={{
        height: "100%",
        gap: 3
      }}
      >
        <Grid container rowSpacing={1} columns={{ sm: 4, md: 28, lg: 40 }} >
          <Grid item sm={2} md={10} lg={12} >
            <ImageList sx={{ width: 300, height: "80vh" }} cols={1} rowHeight={300}>
              {sanitizedCharactersArray.map((character: any) => (
                <Button onClick={() => handleClick(character)}>
                  <ImageListItem key={character.img}>
                    <img
                      srcSet={`${character.img}`}
                      src={`${character.img}`}
                      alt={character.name}
                      loading="lazy"
                    />  
                    <Typography gutterBottom variant="h5" component="div" textAlign={"center"}>
                      {character.name} 
                    </Typography>
                  </ImageListItem>
                </Button>
              ))}
            </ImageList>
          </Grid>
          <Grid item sm={2} md={18} lg={25} textAlign={"justify"}>
            <Typography variant="h3" sx={{p: 2}} textAlign="center">
              Predictions
            </Typography>
            <Box >
              <div dangerouslySetInnerHTML={{__html: character?.description}} />
            </Box>
            <Typography gutterBottom variant="h5" p={4} component="div" textAlign={"center"}>
              <div dangerouslySetInnerHTML={{__html: character?.statement}} />
            </Typography>
            <FormControl sx={{width: "100%"}}  >
              <FormLabel id="radio-buttons-group">
                <Typography variant="h4" sx={{p: 2, color: 'white'}} textAlign="center">
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
                    //onChange={(value) => handleRadio(value)}
                    //onChange={(value) => testing(value, "Form Control", inputPrice)}
                    id="radio-buttons-group"
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="bullish"
                    //value={predictionStatus}
                    name="radio-buttons-group"
                    onChange={() => handleRadio()}
                  >
                    <FormControlLabel value="bullish" control={<Radio />} label="Bullish" />
                    <FormControlLabel value="bear" control={<Radio />} label="Bear" />
                  </RadioGroup>
                </Grid>
                <Grid item sm={3} sx={{alignContent: "center"}}>
                  <CurrencyInput
                    id="input-example"
                    name="input-name"
                    placeholder="Enter a number"
                    defaultValue={0}
                    decimalsLimit={2}
                    onValueChange={(value, name, values) => handleInputText(value, "Input number", values)}
                  />
                </Grid>
                <Grid item sm={7} sx={{alignContent: "center"}}>
                  <Typography variant="h4" sx={{p: 2, color: 'white'}} textAlign="center">
                    ${prediction}
                  </Typography>
                </Grid>
              </Grid>
            </FormControl>
          </Grid>

        </Grid>

      </Stack>
    </Layoults>
  )
}

export default Predictions