const db = require('../services/db');
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

function getMultiple(page = 1) {
  const offset = (page - 1) * config.listPerPage;
  const data = db.query(`SELECT * FROM weather LIMIT ?,?`, [offset, config.listPerPage]);
  const meta = {page};

  return {
    data,
    meta
  }
}

function validateCreate(weather) {
  let messages = [];

  console.log(weather);

  if (!weather) {
    messages.push('No object is provided');
  }

  if (!weather.timestamp) {
    messages.push('PK timestamp is empty');
  }
  
  if (messages.length) {
    let error = new Error(messages.join());
    error.statusCode = 400;

    throw error;
  }
}

function create(weatherObj) {
  validateCreate(weatherObj);
  const {timestamp, temperatura, temp2, umidita, pressione} = weatherObj;
  const result = db.run('INSERT INTO weather (timestamp, temperatura, temp2, umidita, pressione) VALUES (@timestamp, @temperatura, @temp2, @umidita, @pressione)', {timestamp, temperatura, temp2, umidita, pressione});
  
  let message = 'Error in creating record';
  if (result.changes) {
    message = 'Record created successfully';
  }

  return {message};
}

module.exports = {
  getMultiple, create
}