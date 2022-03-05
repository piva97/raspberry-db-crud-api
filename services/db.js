const sqlite = require('better-sqlite3');
const path = require('path');
const db = new sqlite(path.resolve('weatherStation.db'), {fileMustExist: true});

function query(sql) {
  return db.prepare(sql).all();
}

function run(sql, params) {
  return db.prepare(sql).run(params);
}

module.exports = {
  query,run
}