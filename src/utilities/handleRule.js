const handleError = require("./handleError");

module.exports = async (scriptFilename, { settings, rule, parameters }) => {
    try {
        const result = await require(`../rules/${scriptFilename}`)(settings, parameters);
        console.log(result);
    } catch(err) {
        handleError(rule, `Could not fetch data for '${parameters.symbol}'`)
    }
}
