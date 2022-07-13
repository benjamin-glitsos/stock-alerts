import getStockQuote from "../utilities/getStockQuote.js";
import handleEvent from "../utilities/handleEvent.js";
import handleError from "../utilities/handleError.js";

export default async (settings, parameters) => {
    const { id, symbol, type, price, message } = parameters;

    const previousClose = await getStockQuote({
        apiKey: settings.yahooFinanceApiKey,
        id,
        symbol
    }).then(
        res => res.data.quoteSummary.result[0].summaryDetail.previousClose.raw
    );

    const eventParameters = {
        ...parameters,
        previousClose
    };

    switch (type) {
        case "minimum":
            var eventName = "Price below minimum";
            var eventMessage = `Price **$${previousClose}** is below minimum of **$${price}**`;
            var isTriggered = previousClose < price;
            break;
        case "maximum":
            var eventName = "Price above maximum";
            var eventMessage = `Price **$${previousClose}** is above maximum of **$${price}**`;
            var isTriggered = previousClose > price;
            break;
        default:
            handleError(
                parameters.id,
                `Type attribute of '${type}' is not recognised`
            );
    }

    if (isTriggered) {
        handleEvent(settings, {
            ...eventParameters,
            eventName,
            message: message || eventMessage
        });
    }
};
