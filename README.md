# Stock alerts

<b>Note:</b> this is a work in progress.

## Requirements

- Linux
- Node.js

## Get started

Create a `.stock-alerts.xml` file in your home directory.

```xml
<Rules
    yahooFinanceApiKey="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    sendGridApiKey="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    emailEnabled="Yes"
    emailSenderAddress="sender+stockalerts@example.com"
    emailSenderName="Stock Alert"
    emailRecipientAddress="recipient@example.com"
    emailRecipientName="Jane Doe"
    emailReplyToAddress="no-reply@gmail.com"
    emailReplyToName="No reply"
    emailSubject="{{symbol}} stock alert: {{eventName}}">
    <PriceLimit id="AAPLMinimum500" symbol="AAPL" type="minimum" price="500" />
    <PriceLimit id="AAPLMaximum20" symbol="AAPL" type="maximum" price="20"
        message="Google price has exceeded **${{price}}**." />
</Rules>
```

## Configuration

- Rules
  - yahooFinanceApiKey
  - sendGridApiKey
  - emailEnabled
  - emailSenderAddress
  - emailSenderName
  - emailRecipientAddress
  - emailRecipientName
  - emailReplyToAddress
  - emailReplyToName
  - emailSubject
  - PriceMinimum
    - id
    - symbol
    - price
    - message
