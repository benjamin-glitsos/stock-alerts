import getConfig from "./utilities/getConfig.js";
import reminder from "./ruleTypes/reminder.js";
import priceLimit from "./ruleTypes/priceLimit.js";
import priceChange from "./ruleTypes/priceChange.js";
import isDevelopmentModeParser from "./utilities/isDevelopmentMode.js";
import runLoop from "./utilities/runLoop.js";
import handleError from "./utilities/handleError.js";

(async () => {
    const { settings, rules } = await getConfig();
    const isDevelopmentMode = isDevelopmentModeParser(settings.mode);
    settings.isDevelopmentMode = isDevelopmentMode;
    console.log(rules, settings);

    // TODO: now, loop over the new data structure from the XML config (you'll need to use two for loops nested)
    for (const r in rules) {
        const parameters = rules[r]._attributes;
        switch (r) {
            case "Reminder":
                runLoop(reminder, settings, parameters);
                break;
            case "PriceLimit":
                runLoop(priceLimit, settings, parameters);
                break;
            case "PriceChange":
                runLoop(priceChange, settings, parameters);
                break;
            default:
                handleError(
                    parameters.id,
                    `Rule type '${r}' is not recognised.`
                );
        }
    }
})();

// TODO: finish writing PriceChange ruleType
// TODO in future: use 'nact' actors for config and each rule. This allows periodic loading of config, easy passing of config values to deeply nested functions, resilience by 'let it crash' and reload actors
// * TODO: handleError should send email. Find a way to pass the email params to it more easily in order to do this
// * TODO: use a sleep function before the setInterval that waits until the desired time of day e.g. 9am to run. (nice-to-have)
