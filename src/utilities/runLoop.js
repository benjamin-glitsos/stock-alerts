import isDevelopmentModeParser from "./isDevelopmentMode.js";
import between from "./between.js";

export default (fn, settings) => {
    const isDevelopmentMode = isDevelopmentModeParser(settings.mode);
    const oneSecond = 1 * 1000;
    const oneHour = 1 * 60 * 1000;
    const interval = isDevelopmentMode ? oneSecond : oneHour;

    setInterval(() => {
        const condition =
            between(new Date().getHours(), [9, 10]) || isDevelopmentMode;
        if (condition) fn();
    }, interval);
};
