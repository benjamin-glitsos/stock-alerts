import { promises as fsPromises } from "fs";
import parseXml from "xml-js";
import handleRule from "./utilities/handleRule";
import handleError from "./utilities/handleError";

(async () => {
    const configFilepath = `${process.env.HOME}/.stock-alerts.xml`;
    const configXml = await fsPromises.readFile(
        configFilepath,
        "utf8"
    ).catch(err => console.error(`Could not open config file: ${configFilepath}`));
    const config = parseXml.xml2js(configXml, { compact: true });
    const configSettings = config.Rules._attributes;
    const configRules = config.Rules;

    // TODO use import syntax - put "type": "module" in package.json
    // TODO: cron (note - load xml on each run; this allows it to 'hot load' the config)
    // TODO: instead of cron, put everything on a one day loop. And have a max occurrence field - daily, weekly, monthly
    // TODO: handleNotify - sending emails using an API
    // TODO: handleError should log to /var/log
    // TODO: make the yahoo endpoint and return object into a utility (automatically adds date and event id)
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
