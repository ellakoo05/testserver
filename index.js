const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const rp = require('request-promise');
const $ = require('cheerio');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/fuelhubdata", (req, resp)=>{
  //resp.end("Hi welcome");
  let url = 'https://www.gasbuddy.com/home?lng=-123.12073750000002&lat=49.2827291&fuel=1&cursor=0';
  var cursor = 0;
  var prices = [];

  function parseurl(){
    url = 'https://www.gasbuddy.com/home?lng=-123.12073750000002&lat=49.2827291&fuel=1&cursor='+cursor;

    rp(url).then(function(html){
      //success!
      //console.log(html);
      var len = $('.styles__price___3DxO5', html).length,
          pr = $('.styles__price___3DxO5', html),
          addr = $('.styles__address___8IK98', html);

      //console.log(len);
      for(var i=0; i<len; i++){
        prices.push({
          price: pr[i].children[0].data,
          addr:addr[i].children[0].data
        });
      }

      if(cursor < 50){
        cursor += 10;
        parseurl();
      } else {
        console.log(prices);
        //callback
        resp.json(prices);
      }
    }).catch(function(err){
      //handle error
    });
  }

  parseurl();
  
  
});

app.listen(port, (err)=>{
  if(err){
    console.log(err);
    return false;
  }
  
  console.log("Server started at port "+port);
})