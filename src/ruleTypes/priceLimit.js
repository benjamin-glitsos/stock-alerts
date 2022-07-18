import getStockPrices from "../utilities/getStockPrices.js";
import handleEvent from "../utilities/handleEvent.js";
import handleError from "../utilities/handleError.js";

export default async (settings, parameters) => {
    const { id, symbol, type, price, message } = parameters;

    const lastPrice = await getStockPrices({
        apiKey: settings.yahooFinanceApiKey,
        id,
        symbol,
        range: "1d"
    })[0];

    switch (type) {
        case "minimum":
            var eventName = "Price below minimum";
            var eventMessage = `Price **${lastPrice} USD** is below minimum of **${price} USD**`;
            var eventCondition = lastPrice < price;
            break;
        case "maximum":
            var eventName = "Price above maximum";
            var eventMessage = `Price **${lastPrice} USD** is above maximum of **${price} USD**`;
            var eventCondition = lastPrice > price;
            break;
        default:
            handleError(
                parameters.id,
                `Type attribute of '${type}' is not recognised`
            );
    }

    const emailTemplate = "event";
    const subject = `${symbol}: ${eventName}`;

    const eventParameters = {
        ...parameters,
        lastPrice
    };

    if (eventCondition) {
        handleEvent(settings, {
            ...eventParameters,
            eventName,
            emailTemplate,
            subject,
            message: message || eventMessage
        });
    }
};
