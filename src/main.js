import { promises as fsPromises } from "fs";
import parseXml from "xml-js";
import handleError from "./utilities/handleError.js";
import priceMinimum from "./ruleTypes/priceMinimum.js";

(async () => {
    const configFilepath = `${process.env.HOME}/.stock-alerts.xml`;
    const config = await fsPromises
        .readFile(configFilepath, "utf8")
        .catch(err =>
            console.error(`Could not open config file: ${configFilepath}`)
        )
        .then(data =>
            parseXml.xml2js(data, { compact: true, ignoreComment: true })
        );
    const configSettings = config.Rules._attributes;
    const configRules = config.Rules;
    console.log(config);

    // TODO: rules should be: Reminder, PriceLimit, PriceChange, ProfitLimit
    // TODO: add currency conversion using yahoo finance api. put this inside every ruleType
    // TODO: load xml on each run; this allows it to 'hot load' the config
    // TODO: don't use' cron, instead, put everything on a one day loop. And have an 'every' field to throttle it using local memory - takes a number (this will be number of days). The throttle stores into an object in memory with the rule IDs as keys and dates as values

    // TODO: just put a while sleep loop that runs every day
    // TODO: make the time of day that it runs configurable - uses system time and system timezone
    await Promise.all(
        Object.entries(configRules).map(([rule, value]) => {
            const parameters = value._attributes;

            if (parameters) {
                switch (rule) {
                    case "PriceMinimum":
                        priceMinimum(configSettings, parameters);
                        break;
                    default:
                        handleError(
                            parameters.id,
                            `Rule type '${rule}' is not recognised.`
                        );
                }
            }
        })
    );
})();
