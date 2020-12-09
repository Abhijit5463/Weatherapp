const https = require("https");
const app = express();
 app.get("/", function(req, res)
 {
     const url=""
     https.get(url, function(response)
     {
         if(response.statusCode===200){
         console.log(response.statusCode);
         response.on("data", function(data)
         {
             const weatherData = JSON.parse(data)
             const temp = weatherData.main.temp
             const weatherDescription = weatherData.weather[0].description
             res.write("The weather is currently" + weatherDescription);
             res.send("The temp is " + temp + "degree celcius.");
         })
      }else{
          res.sendFile(__dirname+ "/failure.html");}
      
     })
     res.send("OK!!")
     
 })
