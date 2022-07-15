import handleError from "./handleError.js";
import Mustache from "mustache";
import { v4 as uuidv4 } from "uuid";
import { parseInline as parseMarkdown } from "marked";
import sendEmail from "./sendEmail.js";
import logEvent from "./logEvent.js";

export default async (settings, parameters) => {
    const {
        sendGridApiKey,
        emailEnabled,
        emailSenderAddress,
        emailSenderName,
        emailRecipientAddress,
        emailRecipientName,
        emailReplyToAddress,
        emailReplyToName
    } = settings;
    const { id, symbol, ruleName, subject, message, emailTemplate } =
        parameters;

    const [dateTimePretty, dateTimeLog] = [new Date()].flatMap(x => [
        x.toUTCString(),
        x.toISOString()
    ]);

    const eventId = uuidv4();
    const messageHtml = Mustache.render(parseMarkdown(message), parameters);

    const eventParameters = {
        apiKey: sendGridApiKey,
        eventId,
        dateTime: dateTimePretty
    };

    const emailParameters = {
        template: emailTemplate,
        enabled: emailEnabled,
        senderAddress: emailSenderAddress,
        senderName: emailSenderName,
        recipientAddress: emailRecipientAddress,
        recipientName: emailRecipientName,
        replyToAddress: emailReplyToAddress,
        replyToName: emailReplyToName,
        subject,
        message: messageHtml
    };

    const allParameters = {
        ...parameters,
        ...eventParameters,
        ...emailParameters
    };

    const logEventParameters = {
        isError: false,
        dateTime: dateTimeLog,
        ruleId: id,
        description: subject,
        eventId
    };

    sendEmail(allParameters) && logEvent(logEventParameters);
};
