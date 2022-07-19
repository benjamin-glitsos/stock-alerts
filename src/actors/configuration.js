import { spawn } from "nact";
import root from "./root.js";
import fs from "fs";
import xml2js from "xml2js";

const configFilepath = `${process.env.HOME}/.stock-alerts.xml`;
const xmlParserOptions = { attrkey: "@" };

const configJson = (() => {
    const xmlParser = new xml2js.Parser(xmlParserOptions);
    const configXml = fs.readFileSync(configFilepath, "utf8");

    return xmlParser.parseString(configXml, (err, data) => {
        if (err) {
            throw Error(`Could not parse config file: ${configFilepath}`);
        } else {
            const settings = data.Rules["@"];
            const rules = data.Rules;
            delete rules["@"];
            return {
                settings,
                rules
            };
        }
    });
})();

const configuration = spawn(
    root,
    (state = {}, msg, ctx) => {
        switch (msg.action) {
            case "GET_CONFIG":
                console.log(configJson);
                return configJson;
                break;
            default:
                console.error(`Action '${msg.action}' not recognised.`);
                return state;
        }
    },
    "configuration"
);

export default configuration;
