import getConfig from "./utilities/getConfig.js";
import reminder from "./ruleTypes/reminder.js";
import priceLimit from "./ruleTypes/priceLimit.js";
import priceChange from "./ruleTypes/priceChange.js";
import isDevelopmentModeParser from "./utilities/isDevelopmentMode.js";
import runLoop from "./utilities/runLoop.js";
import handleError from "./utilities/handleError.js";

// let history = new Object();

// TODO: dont use history! Instead, create one setInterval per rule, and multiply the interval by the 'every' parameter.
// Also, use a sleep function before the loop that waits until the desired time of day e.g. 9am to run. (nice-to-have)

(async () => {
    const config = await getConfig();

    const main = async () => {
        const { rules, settings } = await getConfig();
        const isDevelopmentMode = isDevelopmentModeParser(settings.mode);
        settings.isDevelopmentMode = isDevelopmentMode;

        for (const r in rules) {
            const parameters = rules[r]._attributes;
            // console.log(history, parameters.every);
            if (history) {
                switch (r) {
                    case "Reminder":
                        await reminder(settings, parameters);
                        break;
                    case "PriceLimit":
                        await priceLimit(settings, parameters);
                        break;
                    case "PriceChange":
                        await priceChange(settings, parameters);
                        break;
                    default:
                        handleError(
                            parameters.id,
                            `Rule type '${r}' is not recognised.`
                        );
                }
            }
            // history[parameters.id] = Date.now();
        }
    };

    runLoop(main, config.settings);
})();

// TODO: finish writing PriceChange ruleType
// TODO: handleError should send email. Find a way to pass the email params to it more easily in order to do this
// TODO: pass values to sendEmail without renaming them. And also to handlEvent without renaming and other functions.
