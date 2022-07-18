import getStockPrices from "../utilities/getStockPrices.js";
import handleEvent from "../utilities/handleEvent.js";
import handleError from "../utilities/handleError.js";

export default async (settings, parameters) => {
    const { id, symbol, type, unit, value, range, message } = parameters;

    const prices = await getStockPrices({
        apiKey: settings.yahooFinanceApiKey,
        id,
        symbol,
        range
    });

    const firstPrice = prices[0];
    const lastPrice = prices[prices.length - 1];
    const absoluteChange = lastPrice - firstPrice;
    const percentageChange = absoluteChange / firstPrice;

    switch (`${unit}:${type}`) {
        case "absolute:increase":
            var "Absolute increase";
            var eventCondition = absoluteChange > value;
            var eventMessage = `Price has increased by **${absoluteChange}** in **${range}**. (Your change limit is **${value}** for this alert.)`
            break;
        case "absolute:decrease":
            var "Absolute decrease";
            var eventCondition = absoluteChange < value;
            var eventMessage = `Price has decreased by **${absoluteChange}** in **${range}**. (Your change limit is **${value}** for this alert.)`
            break;
        case "percentage:increase":
            var "Percentage increase";
            var eventCondition = percentageChange > value;
            var eventMessage = `Price has increased by **${percentageChange}%** in **${range}**. (Your change limit is **${value}%** for this alert.)`
            break;
        case "percentage:decrease":
            var "Percentage decrease";
            var eventCondition = percentageChange < value;
            var eventMessage = `Price has decreased by **${percentageChange}%** in **${range}**. (Your change limit is **${value}%** for this alert.)`
            break;
        default:
            handleError(
                parameters.id,
                `Either type attribute of ${type} or unit attribute of ${unit} are not recognised.`
            );
    }

    const eventParameters = {
        ...parameters,
        firstPrice,
        lastPrice,
        absoluteChange,
        percentageChange
    };

    const subject = `${symbol}: ${eventName}`;

    if (eventCondition) {
        handleEvent(settings, {
            ...eventParameters,
            eventName,
            subject,
            message: message || eventMessage
        });
    }
};
