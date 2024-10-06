import { useEffect, useMemo, useState } from 'react'
import Layoults from '../../layoult/Layoults'
import { Box, Stack, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import axios from 'axios'
import { AgCharts } from 'ag-charts-react'

const Current = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [day, setDay] = useState<any>();
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
  
  
  let sortedData: any = [];
  
  useEffect(() => {
    setDay("30");
  }, [])

  const fetchData = useMemo(() => async () => {
    //const id = "bitcoin";
    const vs_currency = 'usd';
    
    axios.get(
      `/.netlify/functions/apiHistoricalPrice?vs_currency=${vs_currency}&days=${day}`,{
        

      }).then(function (response) {
        console.log("response", response)
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

/*
    const options = {
      method: 'GET',
      fetch: '/.netlify/functions/api-historical-price',
      url: `/api/api/v3/coins/${id}/market_chart`,
      params: {vs_currency: 'usd', days: "30"},
      headers: {accept: 'application/json', 'x-cg-api-key': 'CG-TVPFcDZPCzEVwuTp3GdRwhqZ'}
    };
    axios
      .request(options)
      .then(function (response) {
        /*for (let i = 0; i < response.data.prices.length; i++){
          let price = response.data.prices[i][1];  
          let month = response.data.prices[i][0];
          sortedData.push({month: month, price : price});
        }*/
       // console.log(response)
        //setHistoricalData(sortedData);
  /*      
      })
      .catch(function (error) {
        console.error(error);
      })
*/
/*
    axios
      .request(options)
      .then(function (response) {
        for (let i = 0; i < response.data.prices.length; i++){
          let price = response.data.prices[i][1];  
          let month = response.data.prices[i][0];
          sortedData.push({month: month, price : price});
        }
        console.log(response)
        setHistoricalData(sortedData);
        
      })
      .catch(function (error) {
        console.error(error);
      })
      */
  }, [day])


  useEffect(() => {
        //setTimeout(() => fetchData(), 1000)
    if (!day) return; // Skip if day is not yet defined
    
    fetchData();
  }, [day]);


  return (
    <Layoults>
      <Stack         
      sx={{
        height: "100%",
        gap: 3,
        textAlign: "center"
      }}>
        <Typography variant="h3" textAlign="center" sx={{p: 2}}>
            Current Price
        </Typography>
        <Typography variant="h4" textAlign="left" sx={{marginLeft: "12%"}}>
          Bitcoin
        </Typography>
        <AgCharts  
        className="graph"
        style={{ width: "80%", height: "100%", backdropFilter: 'none', alignSelf: "center" }}
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