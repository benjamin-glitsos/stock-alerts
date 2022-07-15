import getConfig from "./utilities/getConfig.js";
import reminder from "./ruleTypes/reminder.js";
import priceLimit from "./ruleTypes/priceLimit.js";
import priceChange from "./ruleTypes/priceChange.js";
import isDevelopmentModeParser from "./utilities/isDevelopmentMode.js";
import runLoop from "./utilities/runLoop.js";
import handleError from "./utilities/handleError.js";

let history = new Object();

(async () => {
    const config = await getConfig();

    const main = async () => {
        const { rules, settings } = await getConfig();
        const isDevelopmentMode = isDevelopmentModeParser(settings.mode);
        settings.isDevelopmentMode = isDevelopmentMode;

        for (const r in rules) {
            const parameters = rules[r]._attributes;
            console.log(history, parameters.every);
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
            history[parameters.id] = Date.now();
        }
    };

    runLoop(main, config.settings);
})();

// TODO: finish writing PriceChange ruleType
// TODO: handleError should send email. Find a way to pass the email params to it more easily in order to do this
// TODO: pass values to sendEmail without renaming them. And also to handlEvent without renaming and other functions.
// TODO: don't use' cron, instead, put everything on a one day loop. And have an 'every' field to throttle it using local memory - takes a number (this will be number of days). The throttle stores into an object in memory with the rule IDs as keys and dates as values
// TODO: just put a while sleep loop that runs every day
