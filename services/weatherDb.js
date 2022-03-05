const db = require('./db');
const config = require('../config');

function getMultiple(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM weather LIMIT ?,?`, [offset, config.listPerPage]);
  const meta = {page};

  return {
    data,
    meta
  }
}

function getMultipleLimited(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM weather LIMIT ?,?`, [offset, config.listPerPage]);
  const meta = {page};

  return {
    data,
    meta
  }
}

function getMultiple() {
  const data = db.query('SELECT datetime(timestamp, \'unixepoch\') as timestamp, temperatura, umidita, pressione, temp2 FROM weather');
  //const data = db.query('SELECT * FROM weather');
  return data;
}

function validateCreate(weather) {
  let messages = [];

  console.log(weather);

  if (!weather) {
    messages.push('No object is provided');
  }
  
  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

function create(weatherObj) {
  validateCreate(weatherObj);
  const timestamp=Math.floor(Date.now()/1000);
  const {temperature, temperature_bme, humidity, pressure} = weatherObj;
  const result = db.run('INSERT INTO weather (timestamp, temperatura, temp2, umidita, pressione) VALUES (@timestamp, @temperature, @temperature_bme, @humidity, @pressure)', {timestamp, temperature, temperature_bme, humidity, pressure});
  
  let message = 'Error in creating record';
  if (result.changes) {
    message = 'Record created successfully ' + result.lastInsertRowid;
  }
  console.log(message);
  return {message};
}

module.exports = {
  getMultiple, create
}