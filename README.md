# Stock alerts

<b>Note:</b> this is a work in progress.

## Requirements

-   Linux

## Get started

Create a `.stock-alerts.xml` file in your home directory.

```xml
<Rules
    yahooFinanceApiKey="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    sendGridApiKey="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    emailSenderAddress="sender+stockalerts@example.com"
    emailSenderName="Stock Alert"
    emailRecipientAddress="recipient@example.com"
    emailRecipientName="Jane Doe"
    emailReplyToAddress="no-reply@gmail.com"
    emailReplyToName="No reply"
    emailSubject="Stock alert for {{symbol}} ({{id}})">
    <PriceMinimum id="PriceMinimumAAPL500" symbol="AAPL" price="500" />
    <PriceMaximum id="PriceMaximumGOOG1000" symbol="GOOG" price="1000" message="Google price has exceeded <b>${{price}}</b>." />
</Rules>
```

## Configuration

-   Rules
    -   yahooFinanceApiKey
    -   sendGridApiKey
    -   emailSenderAddress
    -   emailSenderName
    -   emailRecipientAddress
    -   emailRecipientName
    -   emailReplyToAddress
    -   emailReplyToName
    -   emailSubject
    -   PriceMinimum
        -   id
        -   symbol
        -   price
        -   message
