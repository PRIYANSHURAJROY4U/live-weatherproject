 const express = require('express');
const https=require("https");
 const app=express();
 const bodyparser=require("body-parser");

 app.use(bodyparser.urlencoded({extended:true
 }));





 app.get("/",function(req,res){
   res.sendfile(__dirname + "/index.html")});

   app.post("/",function(req,res){
   const unit = "metric";
   const query = req.body.cityname;
   const apikey="cce94f72b4b5722032cdc7a6c944acba";
   const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;

   https.get(url,function(response){
     console.log(response.statusCode);

response.on("data",function(data){
  const weatherData = JSON.parse(data)
  const description =weatherData.weather[0].description
  const temp = weatherData.main.temp
  const icon = weatherData.weather[0].icon
  const imageurl = "http://openweathermap.org/img/wn/" +icon+ "@2x.png"

  console.log(description);

  res.write("<h1>temperature of "  +   query  +   " is " + temp + " degree celcius</h1>");
  res.write("<h1>weather condition in " + query + " is " +description + " day</h1>");
  res.write("<img src=" + imageurl + ">")
  res.send();
});



});

 });





   app.listen(2500,function(){
 console.log("server intiated on 2500")});
