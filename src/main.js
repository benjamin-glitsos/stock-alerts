const fs = require("fs");
const fsPromises = fs.promises;
const parseXml = require("xml-js");
const handleRule = require("./utilities/handleRule");
const handleError = require("./utilities/handleError");

(async () => {
    const configFilepath = `${process.env.HOME}/.stock-alerts.xml`;
    const configXml = await fsPromises.readFile(
        configFilepath,
        "utf8"
    ).catch(err => console.error(`Could not open config file: ${configFilepath}`));
    const config = parseXml.xml2js(configXml, { compact: true });
    const configSettings = config.Rules._attributes;
    const configRules = config.Rules;

    await Promise.all(Object.entries(configRules).map(([rule, value]) => {
        const parameters = value._attributes;
        const context = {
            settings: configSettings,
            rule,
            parameters
        };

        if (parameters) {
            switch (rule) {
                case "PriceMinimum":
                    handleRule("priceMinimum", context);
                    break;
                default:
                    handleError(rule, "Rule is not recognised.")
            }
        }
    }));
})();
