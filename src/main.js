const fs = require("fs");
const parseXml = require("xml-js");
const axios = require("axios");

fs.readFile(`${process.env.HOME}/.stock-alerts.xml`, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(
      parseXml.xml2json(data, {compact: true})
  );
});
