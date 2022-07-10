import axios from "axios";
import handleError from "./handleError.js";

export default async ({
    apiKey,
    id,
    senderAddress,
    senderName,
    recipientAddress,
    recipientName,
    replyToAddress,
    replyToName,
    subject,
    body: emailBody
}) => {
    try {
        const headers = {
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            }
        };

        const body = {
            personalizations: [
                { to: [{ email: recipientAddress, name: recipientName }] }
            ],
            from: { email: senderAddress, name: senderName },
            reply_to: { email: replyToAddress, name: replyToName },
            subject,
            content: [
                {
                    type: "text/html",
                    value: emailBody
                }
            ]
        };

        return await axios.post(
            `https://api.sendgrid.com/v3/mail/send`,
            body,
            headers
        );
    } catch (err) {
        console.error(err);
        handleError(id, `Could not send email: '${subject}'`);
    }
};
