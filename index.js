const http = require("http");
const fs = require("fs");
var requests = require("requests"); 

const homeFile = fs.readFileSync("home.html", "utf-8");
const replaceVal = (tempVal,orgVal) => {

   let temperature = tempVal.replace("{%tempVal%}",orgVal.main.temp);
   temperature = temperature.replace("{%tempmin%}",orgVal.main.temp_min);
   temperature = temperature.replace("{%tempmax%}",orgVal.main.temp_max);
   temperature = temperature.replace("{%location%}",orgVal.name);
   temperature = temperature.replace("{%country%}",orgVal.sys.country);
    temperature = temperature.replace("{%tempStatus%}",orgVal.weather[0].main);
   return temperature;
}
const server = http.createServer((req,res) => {
 if (req.url = "/") {
    requests('http://api.openweathermap.org/data/2.5/weather?q=gwalior&APPID=7db660901f9da4062c12b37aef88b5cc')
    .on('data', (chunk) =>  {
        const objdata = JSON.parse(chunk);
        const arrData = [objdata];
        // console.log(arrData[0].main.temp);
        const realTimeData = arrData.map((val) => replaceVal(homeFile,val)).join("");
        res.write(realTimeData);
        
     
    })
    .on('end',  (err) => {
      if (err) return console.log('connection closed due to errors', err);
     
      res.end();
    }); 
}
});

server.listen(8000,"127.0.0.1");