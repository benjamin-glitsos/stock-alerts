import getStockChart from "../utilities/getStockChart.js";
import handleEvent from "../utilities/handleEvent.js";
import handleError from "../utilities/handleError.js";

export default async (settings, parameters) => {
    const { id, symbol, type, unit, value, range, message } = parameters;

    const previousClose = await getStockChart({
        apiKey: settings.yahooFinanceApiKey,
        id,
        symbol,
        range
    }).then(res => console.log(res.data.chart.result[0]));

    // const eventParameters = {
    //     ...parameters,
    //     previousClose
    // };
    //
    // switch (type) {
    //     case "increase":
    //         var eventName = "Percentage increase";
    //         // var eventMessage = `Price **$${previousClose}** is below minimum of **$${price}**`;
    //         // var isTriggered = previousClose < price;
    //         break;
    //     case "decrease":
    //         // var eventName = "Price above maximum";
    //         // var eventMessage = `Price **$${previousClose}** is above maximum of **$${price}**`;
    //         // var isTriggered = previousClose > price;
    //         break;
    //     default:
    //         handleError(
    //             parameters.id,
    //             `Type attribute of '${type}' is not recognised`
    //         );
    // }
    //
    // const subject = `${symbol}: ${eventName}`;
    //
    // if (isTriggered) {
    //     handleEvent(settings, {
    //         ...eventParameters,
    //         eventName,
    //         subject,
    //         message: message || eventMessage
    //     });
    // }
};
