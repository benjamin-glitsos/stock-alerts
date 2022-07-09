module.exports = async (scriptFilename, settings, parameters) => {
    try {
        const result = await require(`../rules/${scriptFilename}`)(settings, parameters);
        console.log(result);
    } catch(err) {
        console.error(err);
    }
}
