import axios from "axios";
import handleError from "./handleError.js";

export default async ({ apiKey, id, symbol }) => {
    try {
        const headers = {
            headers: {
                "x-api-key": apiKey
            }
        };

        return await axios.get(
            `https://yfapi.net/v11/finance/quoteSummary/${symbol}?modules=summaryDetail`,
            headers
        );
    } catch (err) {
        handleError(id, `Could not fetch data for '${symbol}'`);
    }
};
