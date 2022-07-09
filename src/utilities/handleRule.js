const handleError = require("./handleError");

module.exports = async (scriptFilename, settings, parameters) => {
    try {
        const result = await require(`../rules/${scriptFilename}`)(settings, parameters);
        if (result.triggered) {
            console.log({ 
                id: result.id,
                symbol: result.symbol,
                message: parameters.message || result.message
            });
        }
    } catch(err) {
        handleError(parameters.id, `Could not fetch data for '${parameters.symbol}'`)
    }
}
