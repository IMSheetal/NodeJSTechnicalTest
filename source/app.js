const express = require("express");
const axios = require("axios");
const logger = require("./../source/logger");
const app = express();
app.use(express.json());
require("dotenv").config();
const port = process.env.port || 3000;
app.post("/", async (req, res) => {
  const multiaddress = req.body.addresses;
  var multiaddressarray = multiaddress.split(",");
  const addressCount = multiaddressarray.length;
  const apikey = process.env.API_KEY;
  const baseUrl = process.env.BASE_URL;
  const ethUrl = `${baseUrl}api?module=account&action=balancemulti&address=${multiaddress}&tag=latest&apikey=${apikey}`;
  try {
    if (addressCount <= 100) {
      try{
      var finalResult = await axios.get(ethUrl).then((result) => {
        
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
        logger.info(res.status);
        return finalResult;
      });
      res.send(finalResult);
      logger.info(res.status);
    }catch(e){
      res.send(e);
      logger.error("Error", e);
    }
    } else {
      res.send("Addresses should not be more than 100");
    }
  } catch (e) {
    logger.info("Error", e);
    res.send(e);
  }
});

app.listen(port, () => {
  logger.info("Express.js listening on port 3000.");
});
