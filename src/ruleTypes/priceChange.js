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
            var eventName = "Absolute change above limit";
            var eventCondition = absoluteChange > value;
            var eventMessage = `Price has changed by **${absoluteChange}** in **${range}**. (This is above the change limit of **${value}**.)`;
            break;
        case "absolute:decrease":
            var eventName = "Absolute change below limit";
            var eventCondition = absoluteChange < value;
            var eventMessage = `Price has changed by **${absoluteChange}** in **${range}**. (This is below the change limit of **${value}**.)`;
            break;
        case "percentage:increase":
            var eventName = "Percentage change above limit";
            var eventCondition = percentageChange > value;
            var eventMessage = `Price has changed by **${absoluteChange}%** in **${range}**. (This is above the change limit of **${value}%**.)`;
            break;
        case "percentage:decrease":
            var eventName = "Percentage change below limit";
            var eventCondition = percentageChange < value;
            var eventMessage = `Price has changed by **${absoluteChange}%** in **${range}**. (This is below the change limit of **${value}%**.)`;
            break;
        default:
            handleError(
                parameters.id,
                `Either type attribute of '${type}' or unit attribute of '${unit}' are not recognised.`
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
