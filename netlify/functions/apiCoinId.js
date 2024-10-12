

exports.handler = async function (event, context) {
    
    
    const coinId_api = `https://pro-api.coingecko.com/api/v3/coins/list`
    
    const response = await fetch(coinId_api);
    const data = await response.json()
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}
