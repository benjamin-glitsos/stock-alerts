import { promises as fsPromises } from "fs";
import parseXml from "xml-js";
import handleError from "./utilities/handleError.js";
import priceLimit from "./ruleTypes/priceLimit.js";
import reminder from "./ruleTypes/reminder.js";

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

    // TODO: add rules: PriceChange, ProfitLimit
    // TODO: use Handlebars instead of Mustache in order to remove "View on Yahoo Finance" from email when symbol doesn't exist
    // TODO: pass values to sendEmail without renaming them. And also to handlEvent without renaming and other functions.
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
                    case "PriceLimit":
                        priceLimit(configSettings, parameters);
                        break;
                    case "Reminder":
                        reminder(configSettings, parameters);
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
