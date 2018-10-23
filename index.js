const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/mysite", (req, resp)=>{
    //resp.end("Hi welcome");
    resp.json({
        name:"Ella",
        number:"5"
    })
})

app.listen(port, (err)=>{
    if(err){
        console.log(err);
        return false; //whenever you want to kill the server
    }
    
    console.log("Server started at port "+port);
})