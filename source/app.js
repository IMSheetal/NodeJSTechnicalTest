const express = require("express");
var http = require("http");
const axios = require("axios");
const logger = require("./../source/logger");
const app = express();
app.use(express.json());
require("dotenv").config();
const port = process.env.port || 3000;
app.post("/", async (req, res) => {
  const multiaddress = req.body.addresses;
  const apikey = process.env.API_KEY;
  const ethUrl = `https://api-goerli.etherscan.io/api?module=account&action=balancemulti&address=${multiaddress}&tag=latest&apikey=${apikey}`;
  try {
    var finalResult = await axios
    .get(ethUrl)
    .then((result) => {
        // console.log(result.data);
        const addressCount = multiaddress.length;
        if (addressCount <= 100) {
          var sumall = result.data.result
            .map((item) => item.balance)
            .reduce((prev, curr) => prev + curr, 0);
          const resultdata = result.data.result.map((item) => {
            var container = {};
            container["address"] = item.account;
            container["balance"] = item.balance;
            return container;
          });
          const finalResult = {
            addresses: resultdata,
            totalBalance: sumall,
          };
          return finalResult;
        }
        logger.info(res.status);
        return finalResult;
        // res.send(result.data)
    });
    res.send(finalResult);
    logger.info("success");
  } catch (e) {
    logger.info("Error",e);
  }
});

app.listen(port, () => {
  logger.info("Express.js listening on port 3000.");
});
