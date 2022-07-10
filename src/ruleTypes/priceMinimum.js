import axios from "axios";
import getYahooFinanceQuote from "../utilities/getYahooFinanceQuote.js";
import handleRule from "../utilities/handleRule.js";
import handleError from "../utilities/handleError.js";

export default async (settings, { id, symbol, price }) => {
    const quote = await getYahooFinanceQuote(
        settings.yahooFinanceApiKey,
        symbol
    );

    const previousClose =
        quote.data.quoteSummary.result[0].summaryDetail.previousClose.raw;

    if (previousClose < price) {
        return handleRule(settings, {
            id,
            symbol,
            message: `Price ${previousClose} is below minimum of ${price}`
        });
    }
};
