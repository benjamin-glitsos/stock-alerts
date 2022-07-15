const brackets = s => `[${s}]`;

export default ({ isError, dateTime, ruleId, description, eventId }) => {
    const eventType = isError ? "ERROR" : "EVENT";
    console.log(
        [
            eventType,
            brackets(dateTime),
            brackets(ruleId),
            brackets(description),
            brackets(eventId)
        ].join(" ")
    );
};
