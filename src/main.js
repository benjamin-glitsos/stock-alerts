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
