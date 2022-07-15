import { promises as fsPromises } from "fs";
import xml2js from "xml2js";

const configFilepath = `${process.env.HOME}/.stock-alerts.xml`;
const xmlParserOptions = { attrkey: "@" };

export default async () => {
    try {
        const configXml = await fsPromises
            .readFile(configFilepath, "utf8")
            .catch(error => {
                throw Error(`Could not open config file: ${configFilepath}`);
            });

        const xmlParser = new xml2js.Parser(xmlParserOptions);

        const configJson = await xmlParser
            .parseStringPromise(configXml)
            .then(config => {
                const settings = config.Rules["@"];
                const rules = config.Rules;
                delete rules["@"];
                return {
                    settings,
                    rules
                };
            })
            .catch(error => {
                throw Error(
                    `Could not parse config file (XML format is invalid): ${configFilepath}`
                );
            });

        return configJson;
    } catch (error) {
        console.error(error);
    }
};
