const handleError = require("./handleError");

module.exports = async (scriptFilename, settings, parameters) => {
    try {
        const result = await require(`../rules/${scriptFilename}`)(settings, parameters);
        console.log(result);
    } catch(err) {
        handleError(parameters.id, `Could not fetch data for '${parameters.symbol}'`)
    }
}
