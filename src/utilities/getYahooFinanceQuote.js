import axios from "axios";

export default async (apiKey, symbol) =>
    await axios.get(
        `https://yfapi.net/v11/finance/quoteSummary/${symbol}?modules=summaryDetail`,
        {
            headers: {
                "x-api-key": apiKey
            }
        }
    );
