const handleError = require("./handleError");
const Mustache = require("mustache");

module.exports = async (scriptFilename, settings, parameters) => {
    try {
        const result = await require(`../rules/${scriptFilename}`)(settings, parameters);
        if (result.triggered) {
            const messageTemplated = parameters.message ? Mustache.render(parameters.message, parameters) : result.message;
            console.log({ 
                id: result.id,
                symbol: result.symbol,
                message: messageTemplated
            });
        }
    } catch(err) {
        handleError(parameters.id, `Could not fetch data for '${parameters.symbol}'`)
    }
}
