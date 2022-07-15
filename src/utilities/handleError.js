import logEvent from "./logEvent.js";

export default (ruleId, message) => {
    logEvent({
        isError: true,
        ruleId,
        description: message
    });
};
