import handleError from "./handleError.js";
import Mustache from "mustache";
import { v4 as uuidv4 } from "uuid";

export default async (settings, parameters) => {
    const { id, symbol, message } = parameters;

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
};
