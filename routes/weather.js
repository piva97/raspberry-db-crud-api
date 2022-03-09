const express = require('express');
const router = express.Router();
const weatherDb = require('../services/weatherDb');
const weatherCloud = require('../services/weatherCloud');
var count = 1;

router.get('/', function(req, res, next) {
  try {
    res.json(weatherDb.getMultiple(req.query.page));
  } catch(err) {
    console.error(`Error while getting data `, err.message);
    next(err);
  }
});

 function cToF(celsius){
   return Math.round(((9/5) * celsius + 32) * 1e1) /1e1;
}

 function fToC(fahrenheit){
   return Math.round(((5/9) * (fahrenheit - 32)) * 1e1) /1e1;
}

function calculateHeatIndex(tempair, rHumidity){
  tempair = cToF(tempair);
  if (tempair <= 40.0) {
      var hi = tempair;
  }
  else {
      var hitemp = 61.0+((tempair-68.0)*1.2)+(rHumidity*0.094);
      var fptemp = parseFloat(tempair);
      var hifinal = 0.5*(fptemp+hitemp);

      if(hifinal > 79.0){
          var hi = -42.379+2.04901523*tempair+10.14333127*rHumidity-0.22475541*tempair*rHumidity-6.83783*(Math.pow(10, -3))*(Math.pow(tempair, 2))-5.481717*(Math.pow(10, -2))*(Math.pow(rHumidity, 2))+1.22874*(Math.pow(10, -3))*(Math.pow(tempair, 2))*rHumidity+8.5282*(Math.pow(10, -4))*tempair*(Math.pow(rHumidity, 2))-1.99*(Math.pow(10, -6))*(Math.pow(tempair, 2))*(Math.pow(rHumidity,2));
          if((rHumidity <= 13) && (tempair >= 80.0) && (tempair <= 112.0)) {
              var adj1 = (13.0-rHumidity)/4.0;
              var adj2 = Math.sqrt((17.0-Math.abs(tempair-95.0))/17.0);
              var adj = adj1 * adj2;
              var hi = hi - adj;
          }
          else if ((rHumidity > 85.0) && (tempair >= 80.0) && (tempair <= 87.0)) {
              var adj1 = (rHumidity-85.0)/10.0;
              var adj2 = (87.0-tempair)/5.0;
              var adj = adj1 * adj2;
              var hi = hi + adj;
          }
      }
      else{
          var hi = hifinal;
      }
  }
  return fToC(hi);
}

router.post('/', function(req, res, next) {
  new_req = {
    temperature : Math.round(req.body.temperature * 1e1) /1e1,
    humidity: Math.floor(req.body.humidity),
    heatIndex: 0,
    pressure: Math.round((req.body.pressure / 100) * 1e2) /1e2 ,
    temperature_bme: Math.round(req.body.temperature_bme * 1e1) /1e1
  }
  new_req.heatIndex=calculateHeatIndex(new_req.temperature,new_req.humidity);
   try {
     if(count % 2){
       weatherCloud.sendToWeatherCloud(new_req);
     }
    
     weatherDb.create(new_req);
     count = count + 1;  
     res.sendStatus(200);
  } catch(err) {
    console.error(`Error while adding data `, err.message);
    next(err);
  }
});

router.post('/ret-req', function(req, res, next) {
  console.log(req.body);
  res.statusCode=200;
  res.end();
});

module.exports = router;