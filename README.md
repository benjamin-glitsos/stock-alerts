# Stock alerts

## Requirements

* Linux

## Get started

Create a `.stock-alerts.xml` file in your home directory.

```xml
<Rules
    yahooFinanceApiKey="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    sendGridApiKey="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    sendGridSubject="Stock alert for {{symbol}} ({{id}})">
    <PriceMinimum id="PriceMinimumAAPL500" symbol="AAPL" price="500" />
    <PriceMaximum id="PriceMaximumGOOG1000" symbol="GOOG" price="1000" message="Google price has exceeded ${{price}}." />
</Rules>
```

## Configuration

* Rules
  * yahooFinanceApiKey
  * sendGridApiKey
  * sendGridSubject
  * PriceMinimum
    * id
    * symbol
    * price
    * message
