# Stock alerts

<b>Note:</b> this is a work in progress.

## Requirements

- Linux
- Node.js

## Get started

Create a `.stock-alerts.xml` file in your home directory.

```xml
<Rules
    mode="dev"
    yahooFinanceApiKey="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    sendGridApiKey="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    emailSenderAddress="sender+stockalerts@example.com"
    emailSenderName="Stock Alert"
    emailRecipientAddress="recipient@example.com"
    emailRecipientName="Jane Doe"
    emailReplyToAddress="no-reply@gmail.com"
    emailReplyToName="No reply">

    <!-- Reminders: -->
    <Reminder id="rem1"
        message="Each week, remember to **[check your portfolio](https://au.finance.yahoo.com/portfolio/p_0/view/v1)**." />

    <!-- Apple Inc (AAPL): -->
    <PriceLimit id="AAPLMinimum500" symbol="AAPL" type="minimum" price="500" />
    <PriceLimit id="AAPLMaximum20" symbol="AAPL" type="maximum" price="20"
        message="**Apple Inc** price has exceeded **${{price}}**." />
</Rules>
```

## Configuration

- Rules
  - mode
  - yahooFinanceApiKey
  - sendGridApiKey
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
    - type
    - price
    - message
  - Reminder
    - id
    - message
