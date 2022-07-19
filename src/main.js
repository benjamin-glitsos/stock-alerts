import { start, dispatch, stop, spawnStateless } from "nact";
import getConfig from "./utilities/getConfig.js";
import reminder from "./ruleTypes/reminder.js";
import priceLimit from "./ruleTypes/priceLimit.js";
import priceChange from "./ruleTypes/priceChange.js";
import isDevelopmentModeParser from "./utilities/isDevelopmentMode.js";
import runLoop from "./utilities/runLoop.js";
import handleError from "./utilities/handleError.js";

const actors = start();

const greeter = spawnStateless(
    actors,
    (msg, ctx) => console.log(`Hello ${msg.name}`),
    "greeter"
);

dispatch(greeter, { name: "Erlich Bachman" });

(async () => {
    const { settings, rules } = await getConfig();
    const isDevelopmentMode = isDevelopmentModeParser(settings.mode);
    settings.isDevelopmentMode = isDevelopmentMode;

    for (const ruleType in rules) {
        for (const rule of rules[ruleType]) {
            const parameters = rule["@"];
            switch (ruleType) {
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
    }
})();
