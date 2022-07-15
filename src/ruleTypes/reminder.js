import handleEvent from "../utilities/handleEvent.js";
import handleError from "../utilities/handleError.js";

export default async (settings, parameters) => {
    const { id, message } = parameters;

    const eventName = "Reminder";
    const eventSubject = "Reminder from Stock Alerts";
    const eventMessage = `None.`;
    const emailTemplate = "reminder";

    handleEvent(settings, {
        ...parameters,
        eventName,
        emailTemplate,
        subject: eventSubject,
        eventSubject,
        message: message || eventMessage
    });
};
