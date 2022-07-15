import { promises as fsPromises } from "fs";
import parseXml from "xml-js";

const configFilepath = `${process.env.HOME}/.stock-alerts.xml`;

export default async () =>
    fsPromises
        .readFile(configFilepath, "utf8")
        .catch(err =>
            console.error(`Could not open config file: ${configFilepath}`)
        )
        .then(data =>
            parseXml.xml2js(data, { compact: true, ignoreComment: true })
        )
        .then(
            config =>
                [config].flatMap(x => {
                    let settings = config.Rules._attributes;
                    let rules = config.Rules;
                    delete rules["_attributes"];
                    return { settings, rules };
                })[0]
        );
