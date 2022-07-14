import getStockPrices from "../utilities/getStockPrices.js";
import handleEvent from "../utilities/handleEvent.js";
import handleError from "../utilities/handleError.js";
import roundTwoDecimals from "../utilities/roundTwoDecimals.js";

export default async (settings, parameters) => {
    const { id, symbol, type, price, message } = parameters;

    const lastPrice = await getStockPrices({
        apiKey: settings.yahooFinanceApiKey,
        id,
        symbol,
        range: "1d"
    }).then(([p]) => roundTwoDecimals(p));

    const eventParameters = {
        ...parameters,
        lastPrice
    };

    switch (type) {
        case "minimum":
            var eventName = "Price below minimum";
            var eventMessage = `Price **${lastPrice} USD** is below minimum of **${price} USD**`;
            var isTriggered = lastPrice < price;
            break;
        case "maximum":
            var eventName = "Price above maximum";
            var eventMessage = `Price **${lastPrice} USD** is above maximum of **${price} USD**`;
            var isTriggered = lastPrice > price;
            break;
        default:
            handleError(
                parameters.id,
                `Type attribute of '${type}' is not recognised`
            );
    }

    const subject = `${symbol}: ${eventName}`;

    if (isTriggered) {
        handleEvent(settings, {
            ...eventParameters,
            eventName,
            subject,
            message: message || eventMessage
        });
    }
};
