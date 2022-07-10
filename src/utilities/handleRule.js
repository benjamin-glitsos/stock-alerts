import handleError from "./handleError.js";
import Mustache from "mustache";
import { v4 as uuidv4 } from "uuid";

export default async (settings, parameters) => {
    const { id, symbol, message } = parameters;
    try {
        const eventId = uuidv4();
        const dateTime = new Date().toUTCString();
        const messageTemplated = message
            ? Mustache.render(message, parameters)
            : message;

        console.log({
            eventId,
            dateTime,
            id,
            symbol,
            message: messageTemplated
        });
    } catch (err) {
        console.error(err);
        handleError(id, `Could not fetch data for '${symbol}'`);
    }
};
