# Stock alerts

## Requirements

* Linux

## Get started

Create a `.stock-alerts.xml` file in your home directory.

```xml
<Rules yahooFinanceApiKey="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX">
    <PriceMinimum id="PriceMinimumAAPL500" symbol="AAPL" price="500" />
    <PriceMaximum id="PriceMaximumGOOG1000" symbol="GOOG" price="1000" />
</Rules>
```
