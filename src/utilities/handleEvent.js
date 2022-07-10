import handleError from "./handleError.js";
import Mustache from "mustache";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "./sendEmail.js";

export default async (
    {
        sendGridApiKey,
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
    const { id, symbol, message } = parameters;

    const eventId = uuidv4();
    const dateTime = new Date().toUTCString();
    const messageTemplated = message
        ? Mustache.render(message, parameters)
        : message;
    const subjectTemplated = Mustache.render(emailSubject, parameters);

    console.log({
        eventId,
        dateTime,
        id,
        symbol,
        message: messageTemplated
    });

    sendEmail({
        apiKey: sendGridApiKey,
        id,
        senderAddress: emailSenderAddress,
        senderName: emailSenderName,
        recipientAddress: emailRecipientAddress,
        recipientName: emailRecipientName,
        replyToAddress: emailReplyToAddress,
        replyToName: emailReplyToName,
        subject: subjectTemplated,
        body: message
    });
};
