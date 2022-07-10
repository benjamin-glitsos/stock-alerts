import { promises as fsPromises } from "fs";
import parseXml from "xml-js";
import handleError from "./utilities/handleError.js";
import priceMinimum from "./ruleTypes/priceMinimum.js";

(async () => {
    const configFilepath = `${process.env.HOME}/.stock-alerts.xml`;
    const configXml = await fsPromises
        .readFile(configFilepath, "utf8")
        .catch(err =>
            console.error(`Could not open config file: ${configFilepath}`)
        );
    const config = parseXml.xml2js(configXml, { compact: true });
    const configSettings = config.Rules._attributes;
    const configRules = config.Rules;

    // TODO: use a template file to make the email be in a table format. Possibly switch from mustache to a fuller templating library
    // TODO: email template should include link to open full yahoo finance page for the symbol
    // TODO: message attribute should be in markdown format, and converted to HTML using a node.js library
    // TODO: cron (note - load xml on each run; this allows it to 'hot load' the config)
    // TODO: instead of cron, put everything on a one day loop. And have a max occurrence field - daily, weekly, monthly
    // TODO: handleError should log to /var/log
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
