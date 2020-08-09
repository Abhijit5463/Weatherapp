const express = require("express");
const https = require("https");
const bodyParser=require("body-parser")

const app= express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");

   
        });
        app.post("/",function(req,res){
         const query=req.body.cityName;
        const api="a643992955a7bbe67dfd480c4e79c7fc";
        const unit ="metric"
        const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit +"&appid="+ api;
        
        
        https.get(url, function(response){
            console.log(response.statuscode );

            if(response.statusCode!=200){
                res.sendFile(__dirname + "/failure.html");}
           

            response.on("data",function(data){
                
                const weatherdata=JSON.parse(data)
               const temp =weatherdata.main.temp
               //console.log(temp);
               const description=weatherdata.weather[0].description
               const icon=weatherdata.weather[0].icon
               const imgurl=" http://openweathermap.org/img/wn/" + icon +"@2x.png"
            
               res.write("<h1>The temperature in "  +  query  +   " is " +  temp  + "degree celcius</h1>")
    
               res.write("<h1>The weather in " + query +" is " + description +"</h1>")
               
                res.write("<img src=" + imgurl + ">")
               res.send();

            });
        });     
            
        })


app.listen(process.env.PORT || 3000,function(){
    console.log("All ok");
})