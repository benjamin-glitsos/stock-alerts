import axios from "axios";
import handleError from "./handleError.js";
import lastElement from "./lastElement.js";
import roundTwoDecimals from "../utilities/roundTwoDecimals.js";

export default async ({ apiKey, id, symbol, range }) => {
    try {
        const headers = {
            headers: {
                "x-api-key": apiKey
            }
        };

        const prices = await axios
            .get(
                `https://yfapi.net/v8/finance/chart/${symbol}?range=${range}&interval=1d`,
                headers
            )
            .catch(error => {
                const maybeMessage = error.response.data.message;
                const errorMessage = `Could not fetch '${symbol}' from Yahoo Finance.`;
                if (maybeMessage) {
                    handleError(id, `${errorMessage} Reason: ${maybeMessage}`);
                } else {
                    handleError(id, errorMessage);
                }
                throw Error(error);
            })
            .then(res => res.data.chart.result[0].indicators.quote[0].close);

        const startPrice = prices[0];
        const endPrice = lastElement(prices);
        const priceRange = [startPrice, endPrice].map(roundTwoDecimals);

        return priceRange;
    } catch (error) {}
};
