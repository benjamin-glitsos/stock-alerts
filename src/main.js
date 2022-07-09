const fs = require("fs");
const fsPromises = fs.promises;
const parseXml = require("xml-js");
const axios = require("axios");

(async () => {
    try {
        const configXml = await fsPromises.readFile(
            `${process.env.HOME}/.stock-alerts.xml`,
            "utf8"
        );
        const config = parseXml.xml2js(configXml, { compact: true });
        const configSettings = config.Rules._attributes;
        const configRules = config.Rules;

        const res = await axios.get(
            `https://yfapi.net/v11/finance/quoteSummary/AAPL?modules=summaryDetail`,
            {
                headers: {
                    "x-api-key": configSettings.yahooFinanceApiKey,
                },
            }
        );

        console.log(res.data.quoteSummary.result[0].summaryDetail.previousClose.raw);
    } catch(err) {
        console.error(err);
    }
})();
