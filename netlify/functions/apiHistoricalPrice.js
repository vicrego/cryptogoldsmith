



/*
exports.handler = async function () {
    
    const historical_api = "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart"
    const response = await fetch(historical_api);
    const data = await response.json()
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
    
    https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${vs_currency}&days=${days}
}*/


//const fetch = require("node-fetch");
   
exports.handler = async function (event, context) {
    const { vs_currency, days } = event.queryStringParameters;
    console.log("vs_currency", vs_currency)
    console.log("days", days)
    const historical_api = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${vs_currency}&days=${days}`
    
    const response = await fetch(historical_api);
    const data = await response.json()
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}
