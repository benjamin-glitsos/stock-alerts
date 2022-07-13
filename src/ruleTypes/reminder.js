import handleEvent from "../utilities/handleEvent.js";
import handleError from "../utilities/handleError.js";

export default async (settings, parameters) => {
    const { id, message } = parameters;

    const eventName = "Reminder";
    const eventSubject = "Reminder from Stock Alerts";
    const eventMessage = `No reminder message has been written for ${id}.`;

    handleEvent(settings, {
        ...parameters,
        eventName,
        subject: eventSubject,
        eventSubject,
        message: message || eventMessage
    });
};
