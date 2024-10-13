import { useEffect, useMemo, useState } from 'react'
import Layoults from '../../layoult/Layoults'
import { Autocomplete, Box, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery } from '@mui/material'
import axios from 'axios'
import { AgCharts } from 'ag-charts-react'


interface CoinIdType {
  id: number;
  symbol: string;
  name: string;
  label: string;
}


const Current = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [day, setDay] = useState<any>("30");
  const [coinId, setCoinId] = useState<any>("");
  const [value, setValue] = useState<string | null >("bitcoin");
  const [inputValue, setInputValue] = useState('');

  const phoneDisplay = useMediaQuery('(max-width:698px)');
/*
  const http = rateLimit(axios.create(), {
    maxRPS: 2, // Shorthand for perMilliseconds: 1000
  });
*/
  
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    currentDay: string,
    ) => {
    event = event;
    if(day !== currentDay && currentDay !== null){
      setDay(currentDay)
    }
  };
  /*
  useEffect(() => {
    setDay("30");
  }, [])
*/
  useEffect(() => {
    let sortedData: any = [];
    //setCharacter(sanitizedCharactersArray[0]);  
    axios.get(
      `/.netlify/functions/apiCoinId`,{
      }).then(function (response) {
        sortedData = response.data.map((item: any) => ({
          value: item.id,
          label: item.name,
        }));
        setCoinId(sortedData);
        
      })
      .catch(function (error) {
        console.error(error);
      })
  }, [])

  const fetchData = useMemo(() => async () => {
    //const id = "bitcoin";
    console.log("value", value)
    const vs_currency = 'usd';
    let sortedData: any = [];
    axios.get(
      `/.netlify/functions/apiHistoricalPrice?id=${value}&vs_currency=${vs_currency}&days=${day}`,{
      }).then(function (response) {
        for (let i = 0; i < response.data.prices.length; i++){
          let price = response.data.prices[i][1];  
          let month = response.data.prices[i][0];
          sortedData.push({month: month, price : price});
        }
        setHistoricalData(sortedData);
      })
      .catch(function (error) {
        console.error(error);
      })
  }, [day, value])


  useEffect(() => {
    if (!day) return; 
    fetchData();
  }, [day, value]);

  return (
    <Layoults>
      <Stack         
      sx={{
        height: "100%",
        gap: 3,
        textAlign: "center"
      }}>
        <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
        <div>{`inputValue: '${inputValue}'`}</div>
        <Typography variant="h3" textAlign="center" sx={{p: 2}}>
            Current Price
        </Typography>
        <Typography variant="h4" textAlign="left" sx={{marginLeft: "12%"}}>
        <Autocomplete
         
          value={value}
          //disablePortal
          options={coinId}

          onChange={(_, newValue: string | null) => {
            setValue(newValue?.value);
          }}
          inputValue={inputValue}
          onInputChange={(_, newInputValue) => {
            console.log("newInputValue",newInputValue)
            setInputValue(newInputValue);
          }}
          //getOptionLabel={(option) => option?.label}
          isOptionEqualToValue={(option, value) =>   
          option?.label === value?.value}
          sx={{ width: 300, backgroundColor: "white" }}
          renderInput={(params) => <TextField {...params} label="Coin" />}
        />
        </Typography>
        <AgCharts  
        className="graph"
        style={{ width: phoneDisplay ? "100%" : "80%", height: "100%", backdropFilter: 'none', alignSelf: "center" }}
        options={{
          data: historicalData,
          series: [{
            type: "line",
            xKey: "month",
            xName: "Month",
            yKey: "price",
            marker: {
              size: 1,
            },
            connectMissingData: true
          }],
          axes: [
            {
              type: "time",
              position: "bottom",
              label: {
                color: "orange"
              },
              line: {
                stroke: "white",
              },
            },
            {
              type: "number",
              position: "left",
              label: {
                color: "orange",
              },
              line: {
                stroke: "white",
              },
              gridLine: {
                enabled: false,
              },
            },
            {
              type: "number",
              position: "right",
            },
            {
              type: "number",
              position: "top",
            },  
          ],
          background: {
            fill: "black",
          },
        }}/>
        <Box>
          <ToggleButtonGroup
            color={'primary'}
            value={day}
            exclusive
            onChange={handleChange}
            aria-label="text alignment"
            sx={{gap: 0.3}}
          >
            <ToggleButton 
              sx={{
                backgroundColor: "orange",
                borderBlockColor: "orange", 
                color: "white",
                '&:hover': {
                  color: "white",
                }
              }} 
              //color="secondary" 
              value="1"
            >
              1 day
            </ToggleButton>
            <ToggleButton 
              sx={{
                backgroundColor: "orange", 
                borderBlockColor: "orange", 
                color: "white",
                '&:hover': {
                  color: "white",
                }
              }} 
              value="30"
            >
                  30 days
            </ToggleButton>
            <ToggleButton 
              sx={{
                backgroundColor: "orange", 
                borderBlockColor: "orange", 
                color: "white",
                '&:hover': {
                  color: "white",
                }
              }} 
              value="100"
            >
                100 days
              </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        
      </Stack>
    </Layoults>
  )
}

export default Current