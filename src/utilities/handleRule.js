const handleError = require("./handleError");
const Mustache = require("mustache");
const { v4: uuidv4 } = require('uuid');

module.exports = async (ruleTypeFilename, settings, parameters) => {
    try {
        const result = await require(`../ruleTypes/${ruleTypeFilename}`)(settings, parameters);
        if (result.triggered) {
            const transactionId = uuidv4();
            const dateTime = (new Date()).toISOString();
            const id = result.id;
            const symbol = result.symbol;
            const messageTemplated = parameters.message ? Mustache.render(parameters.message, parameters) : result.message;
            console.log({ transactionId, dateTime, id, symbol, message: messageTemplated });
        }
    } catch(err) {
        handleError(parameters.id, `Could not fetch data for '${parameters.symbol}'`)
    }
}
