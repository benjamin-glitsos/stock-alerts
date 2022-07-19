import getConfig from "./utilities/getConfig.js";
import reminder from "./ruleTypes/reminder.js";
import priceLimit from "./ruleTypes/priceLimit.js";
import priceChange from "./ruleTypes/priceChange.js";
import isDevelopmentModeParser from "./utilities/isDevelopmentMode.js";
import runLoop from "./utilities/runLoop.js";
import handleError from "./utilities/handleError.js";

import configuration from "./actors/configuration.js";
import { dispatch } from "nact";

dispatch(configuration, { action: "GET_CONFIG", value: "Test" });

// (async () => {
//     const { settings, rules } = await getConfig();
//     const isDevelopmentMode = isDevelopmentModeParser(settings.mode);
//     settings.isDevelopmentMode = isDevelopmentMode;
//
//     for (const ruleType in rules) {
//         for (const rule of rules[ruleType]) {
//             const parameters = rule["@"];
//             switch (ruleType) {
//                 case "Reminder":
//                     runLoop(reminder, settings, parameters);
//                     break;
//                 case "PriceLimit":
//                     runLoop(priceLimit, settings, parameters);
//                     break;
//                 case "PriceChange":
//                     runLoop(priceChange, settings, parameters);
//                     break;
//                 default:
//                     handleError(
//                         parameters.id,
//                         `Rule type '${r}' is not recognised.`
//                     );
//             }
//         }
//     }
// })();
