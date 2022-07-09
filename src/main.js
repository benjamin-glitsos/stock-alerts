const fs = require("fs");
const parseXml = require("xml-js");
const axios = require("axios");

fs.readFile(`${process.env.HOME}/.stock-alerts.xml`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const config = parseXml.xml2js(data, { compact: true });
  const globalConfig = config.Rules._attributes;
  axios
    .get("https://yfapi.net/v11/finance/quoteSummary/AAPL?modules=defaultKeyStatistics", {
      headers: {
        "x-api-key": globalConfig.yahooFinanceApiKey,
      },
    })
    .then((res) => console.log(JSON.stringify(res.data)))
    .catch((error) => console.error(error));
});
