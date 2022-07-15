import { v4 as uuidv4 } from "uuid";

const brackets = s => `[${s}]`;

export default ({ isError, dateTime, ruleId, description, eventId }) => {
    const eventType = isError ? "ERROR" : "EVENT";
    const dateTimeLog = dateTime || new Date().toISOString();
    const eventIdLog = eventId || uuidv4();
    console.log(
        [
            eventType,
            brackets(dateTimeLog),
            brackets(ruleId),
            brackets(description),
            brackets(eventIdLog)
        ].join(" ")
    );
};
