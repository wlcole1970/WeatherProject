//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

// catches the route 

app.post("/", function(req, res) {
    
    // open weather API

    const query = req.body.cityName;
    const apiKey = "31566c7d375c1d65f23e519395fe9670";
    const unit = "imperial"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`

    https.get( url, function(response){
    // console.log(response.statusCode);

    response.on('data', function(data) {

        
        const weatherData = JSON.parse(data);//converts data into a javascript object and stores into a function
        const temp = Math.floor(weatherData.main.temp);
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    

        // since you can only send one res.send() use res.write()
      
        res.write(`<h1>The temperature in ${query} is ${temp} degrees with ${description}.</h1>`);
        res.write(`<img src=${imageURL}>`);

        res.send();
        
    });
}); 
}); 





app.listen(3000, function () {
    console.log("The server is running on Port 3000");
});