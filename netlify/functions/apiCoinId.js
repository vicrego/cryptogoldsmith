

exports.handler = async function (event, context) {
    const coinId_api = `https://api.coingecko.com/api/v3/coins/list`
    const response = await fetch(coinId_api, /*{
        headers: {accept: 'application/json', 'x-cg-api-key': import.meta.env.REACT_APP_API_KEY}
    }*/);
    const data = await response.json()
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}
