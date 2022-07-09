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

    // TODO: add event id UUID to each event triggered by stock-tracker
    // TODO: add date field to each return object as well
    // TODO: add date and event id to return objects when triggered=false as well
    // TODO: handleNotify - sending emails using an API
    // TODO: cron (note - load xml on each run; this allows it to 'hot load' the config)
    // TODO: handleError should log to /tmp
    await Promise.all(Object.entries(configRules).map(([rule, value]) => {
        const parameters = value._attributes;

        if (parameters) {
            switch (rule) {
                case "PriceMinimum":
                    handleRule("priceMinimum", configSettings, parameters);
                    break;
                default:
                    handleError(parameters.id, `Rule type '${rule}' is not recognised.`)
            }
        }
    }));
})();
