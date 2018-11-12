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
  let url = 'https://www.gasbuddy.com/home?search=british%20columbia%20institute%20of%20technology&fuel=1&cursor=0';
  var cursor = 0;
  var prices = [];

  function parseurl(){
    url = 'https://www.gasbuddy.com/home?search=british%20columbia%20institute%20of%20technology&fuel=1&cursor='+cursor;

    rp(url).then(function(html){
      //success!
      //console.log(html);
      var len = $('.styles__price___3DxO5', html).length,
          pr = $('.styles__price___3DxO5', html),
          addr = $('.styles__address___8IK98', html),
          station = $('.styles__stationNameHeader___24lb3', html),
          logo = $('styles__logoImage___2zpSA', html);

      //console.log(len);
      for(var i=0; i<len; i++){
        prices.push({
          price: pr[i].children[0].data,
          addr:addr[i].children[0].data,
          station:station[i].children[0].data,
          logo:logo[i].children[0].data,
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