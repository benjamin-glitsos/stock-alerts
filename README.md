# Stock alerts

## Requirements

-   Linux

## Get started

Create a `.stock-alerts.xml` file in your home directory.

```xml
<Rules
    yahooFinanceApiKey="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    sendGridApiKey="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    emailSender="sender+stockalerts@example.com"
    emailRecipient="recipient@example.com"
    emailReplyTo="no-reply@gmail.com"
    emailSubject="Stock alert for {{symbol}} ({{id}})">
    <PriceMinimum id="PriceMinimumAAPL500" symbol="AAPL" price="500" />
    <PriceMaximum id="PriceMaximumGOOG1000" symbol="GOOG" price="1000" message="Google price has exceeded <b>${{price}}</b>." />
</Rules>
```

## Configuration

-   Rules
    -   yahooFinanceApiKey
    -   sendGridApiKey
    -   emailSender
    -   emailRecipient
    -   emailReplyTo
    -   emailSubject
    -   PriceMinimum
        -   id
        -   symbol
        -   price
        -   message
