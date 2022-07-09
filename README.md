# Stock alerts

## Requirements

* Linux

## Get started

Create a `.stock-alerts.xml` file in your home directory.

```xml
<Rules yahooFinanceApiKey="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX">
    <PriceMinimum symbol="AAPL" price="500" />
    <PriceMaximum symbol="GOOG" price="1000" />
</Rules>
```
