import axios from "axios";
import getStockQuote from "../utilities/getStockQuote.js";
import handleEvent from "../utilities/handleEvent.js";
import handleError from "../utilities/handleError.js";

export default async (settings, parameters) => {
    const { id, symbol, price, message } = parameters;

    const eventName = "Price below minimum";

    const quote = await getStockQuote({
        apiKey: settings.yahooFinanceApiKey,
        id,
        symbol
    });

    const previousClose =
        quote.data.quoteSummary.result[0].summaryDetail.previousClose.raw;

    const eventMessage = `Price **$${previousClose}** is below minimum of **$${price}**`;

    if (previousClose < price) {
        return handleEvent(settings, {
            ...parameters,
            eventName,
            message: message || eventMessage,
            previousClose
        });
    }
};
