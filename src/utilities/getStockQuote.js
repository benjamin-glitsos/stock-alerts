import axios from "axios";

export default async (apiKey, symbol) => {
    try {
        return await axios.get(
            `https://yfapi.net/v11/finance/quoteSummary/${symbol}?modules=summaryDetail`,
            {
                headers: {
                    "x-api-key": apiKey
                }
            }
        );
    } catch (err) {
        handleError(id, `Could not fetch data for '${symbol}'`);
    }
};
