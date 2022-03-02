const express = require('express');
const router = express.Router();
const weather = require('../services/weather');

/* GET quotes listing. */
router.get('/', function(req, res, next) {
  try {
    res.json(weather.getMultiple(req.query.page));
  } catch(err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

/* POST quote */
router.post('/', function(req, res, next) {
  try {
    res.json(weather.create(req.body));
  } catch(err) {
    console.error(`Error while adding quotes `, err.message);
    next(err);
  }
});

module.exports = router;