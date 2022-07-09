module.exports = async (scriptFilename, settings, parameters) => {
    try {
        return await console.log(require(`../rules/${scriptFilename}`)(settings, parameters));
    } catch(err) {
        console.error(err);
    }
}
