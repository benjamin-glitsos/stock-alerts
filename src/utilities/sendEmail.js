import { promises as fsPromises } from "fs";
import path from "path";
import axios from "axios";
import Mustache from "mustache";
import handleError from "./handleError.js";

export default async parameters => {
    const {
        template,
        apiKey,
        id,
        isDevelopmentMode,
        senderAddress,
        senderName,
        recipientAddress,
        recipientName,
        replyToAddress,
        replyToName,
        subject,
        message
    } = parameters;

    try {
        const content = await fsPromises
            .readFile(
                path.resolve(
                    `${path.resolve()}/src/views/${template}.mustache.html`
                ),
                "utf8"
            )
            .then(t => Mustache.render(t, parameters));

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
                    value: content
                }
            ]
        };

        if (!isDevelopmentMode) {
            await axios.post(
                `https://api.sendgrid.com/v3/mail/send`,
                body,
                headers
            );
            return true;
        } else {
            console.log(content);
            return false;
        }
    } catch (err) {
        handleError(id, `Could not send email: '${subject}'`);
    }
};
