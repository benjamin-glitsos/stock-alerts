import handleError from "./handleError";
import Mustache from "mustache";
import { v4 as uuidv4 } from 'uuid';

export default async (ruleTypeFilename, settings, parameters) => {
    try {
        const result = await require(`../ruleTypes/${ruleTypeFilename}`)(settings, parameters);
        if (result) {
            const transactionId = uuidv4();
            const dateTime = (new Date()).toISOString();
            const id = result.id;
            const symbol = result.symbol;
            const messageTemplated = parameters.message ? Mustache.render(parameters.message, parameters) : result.message;
            console.log({ transactionId, dateTime, id, symbol, message: messageTemplated });
        }
    } catch(err) {
        handleError(parameters.id, `Could not fetch data for '${parameters.symbol}'`)
    }
}
