const axios = require("axios");

module.exports = async (settings, { id, symbol, price }) => {
    const quote = await axios.get(
        `https://yfapi.net/v11/finance/quoteSummary/${symbol}?modules=summaryDetail`,
        {
            headers: {
                "x-api-key": settings.yahooFinanceApiKey,
            },
        }
    );

    const previousClose = quote.data.quoteSummary.result[0].summaryDetail.previousClose.raw;

    if (previousClose < price) {
        return { id, triggered: true, symbol, message: `Price ${previousClose} is below minimum of ${price}` }
    } else {
        return { id, triggered: false }
    }
};
