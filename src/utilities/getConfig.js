import { promises as fsPromises } from "fs";
import { parseString as parseXml } from "xml2js";

const configFilepath = `${process.env.HOME}/.stock-alerts.xml`;
const parseXmlOptions = { attrkey: "@" };

export default async () => {
    try {
        return fsPromises
            .readFile(configFilepath, "utf8")
            .catch(error => {
                throw Error(`Could not open config file: ${configFilepath}`);
            })
            .then(data => {
                parseXml(data, parseXmlOptions, (error, result) => {
                    if (error) {
                        throw Error(
                            `Config file is not valid XML: ${configFilepath}`
                        );
                    } else {
                        return result;
                    }
                });
            })
            .then(
                config =>
                    [config].flatMap(x => {
                        let settings = config.Rules._attributes;
                        let rules = config.Rules;
                        delete rules["_attributes"];
                        return { settings, rules };
                    })[0]
            );
    } catch (error) {
        console.error(error);
    }
};
