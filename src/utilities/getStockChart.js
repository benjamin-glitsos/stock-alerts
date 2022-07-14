import axios from "axios";
import handleError from "./handleError.js";

export default async ({ apiKey, id, symbol, range }) => {
    try {
        const headers = {
            headers: {
                "x-api-key": apiKey
            }
        };

        return await axios.get(
            `https://yfapi.net/v8/finance/chart/${symbol}?range=${range}&interval=1d&region=AU`,
            headers
        );
    } catch (err) {
        handleError(id, `Could not fetch data for '${symbol}'`);
    }
};
