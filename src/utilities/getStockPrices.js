import axios from "axios";
import handleError from "./handleError.js";
import lastElement from "./lastElement.js";

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
            .then(res => res.data.chart.result[0].indicators.quote[0].close);

        const startPrice = prices[0];
        const endPrice = lastElement(prices);

        return [startPrice, endPrice];
    } catch (err) {
        handleError(
            id,
            `Could not fetch stock prices for '${symbol}' from Yahoo Finance`
        );
    }
};
