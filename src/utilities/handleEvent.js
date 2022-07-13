import handleError from "./handleError.js";
import Mustache from "mustache";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "./sendEmail.js";

export default async (
    {
        sendGridApiKey,
        emailEnabled,
        emailSenderAddress,
        emailSenderName,
        emailRecipientAddress,
        emailRecipientName,
        emailReplyToAddress,
        emailReplyToName,
        emailSubject
    },
    parameters
) => {
    const { id, symbol, ruleName, message } = parameters;

    const eventId = uuidv4();
    const dateTime = new Date().toUTCString();
    const messageTemplated = message
        ? Mustache.render(message, parameters)
        : message;
    const subjectTemplated = Mustache.render(emailSubject, parameters);

    const eventParameters = {
        apiKey: sendGridApiKey,
        eventId,
        dateTime
    };

    const emailParameters = {
        enabled: emailEnabled,
        senderAddress: emailSenderAddress,
        senderName: emailSenderName,
        recipientAddress: emailRecipientAddress,
        recipientName: emailRecipientName,
        replyToAddress: emailReplyToAddress,
        replyToName: emailReplyToName,
        subject: subjectTemplated,
        message
    };

    sendEmail({
        ...parameters,
        ...eventParameters,
        ...emailParameters
    });
};
