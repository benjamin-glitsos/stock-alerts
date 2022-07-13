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

export default async ({
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
}) => {
    try {
        // const content = await fsPromises
        //     .readFile("../views/alertEmail.mustache.html", "utf8")
        //     .then(emailTemplate =>
        //         Mustache.render(emailTemplate, { subject, message })
        //     );
        const content = emailTemplate;

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

        if (parseYesNo("Yes")) {
            // await axios.post(
            //     `https://api.sendgrid.com/v3/mail/send`,
            //     body,
            //     headers
            // );
            console.log(content);
        }
    } catch (err) {
        console.error(err);
        handleError(id, `Could not send email: '${subject}'`);
    }
};
