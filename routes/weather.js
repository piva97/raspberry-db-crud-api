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

router.post('/', function(req, res, next) {
  new_req = {
    temperature : Math.round(req.body.temperature * 1e1) /1e1,
    humidity: Math.floor(req.body.humidity),
    pressure: Math.round((req.body.pressure / 100) * 1e2) /1e2 ,
    temperature_bme: Math.round(req.body.temperature_bme * 1e1) /1e1
  }
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