import fs from "fs";
import path from "path";
import axios from "axios";
import Mustache from "mustache";
import handleError from "./handleError.js";
import parseYesNo from "./parseYesNo.js";

const emailTemplate = fs.readFileSync(
    path.resolve(`${path.resolve()}/src/views/alertEmail.mustache.html`),
    {
        encoding: "utf8"
    }
);

export default async parameters => {
    try {
        const {
            apiKey,
            id,
            enabled,
            senderAddress,
            senderName,
            recipientAddress,
            recipientName,
            replyToAddress,
            replyToName,
            subject,
            message
        } = parameters;

        const content = Mustache.render(emailTemplate, parameters);

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

        if (parseYesNo(enabled)) {
            await axios.post(
                `https://api.sendgrid.com/v3/mail/send`,
                body,
                headers
            );
        }
    } catch (err) {
        console.error(err);
        handleError(id, `Could not send email: '${subject}'`);
    }
};
