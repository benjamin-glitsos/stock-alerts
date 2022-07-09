const fs = require("fs");
const fsPromises = fs.promises;
const parseXml = require("xml-js");
const handleRule = require("./utilities/handleRule");

(async () => {
    try {
        const configXml = await fsPromises.readFile(
            `${process.env.HOME}/.stock-alerts.xml`,
            "utf8"
        );
        const config = parseXml.xml2js(configXml, { compact: true });
        const configSettings = config.Rules._attributes;
        const configRules = config.Rules;

        await Promise.all(Object.entries(configRules).map(([key, value]) => {
            const parameters = value._attributes;
            if (parameters) {
                switch (key) {
                    case "PriceMinimum":
                        handleRule("priceMinimum", configSettings, parameters);
                }
            }
        }));

    } catch(err) {
        console.error(err);
    }
})();
