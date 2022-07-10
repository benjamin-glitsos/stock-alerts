import axios from "axios";
import getStockQuote from "../utilities/getStockQuote.js";
import handleEvent from "../utilities/handleEvent.js";
import handleError from "../utilities/handleError.js";

export default async (settings, { id, symbol, price }) => {
    const quote = await getStockQuote(settings.yahooFinanceApiKey, symbol);

    const previousClose =
        quote.data.quoteSummary.result[0].summaryDetail.previousClose.raw;

    if (previousClose < price) {
        return handleEvent(settings, {
            id,
            symbol,
            message: `Price ${previousClose} is below minimum of ${price}`
        });
    }
};
