const handleError = require("./handleError");
const Mustache = require("mustache");
const { v4: uuidv4 } = require('uuid');

module.exports = async (ruleTypeFilename, settings, parameters) => {
    try {
        const result = await require(`../ruleTypes/${ruleTypeFilename}`)(settings, parameters);
        if (result.triggered) {
            const messageTemplated = parameters.message ? Mustache.render(parameters.message, parameters) : result.message;
            console.log({ 
                transactionId: uuidv4(),
                ruleId: result.id,
                symbol: result.symbol,
                message: messageTemplated
            });
        }
    } catch(err) {
        handleError(parameters.id, `Could not fetch data for '${parameters.symbol}'`)
    }
}
