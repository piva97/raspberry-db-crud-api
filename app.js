var express = require("express");
var app = express();
const sqlite3 = require("sqlite3").verbose();
let db = new sqlite3.Database("weatherStation.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/wheater-station", (req, res, next) => {
  var list = [];
  db.serialize(() => {
    db.each(
      `SELECT * FROM weather`,
      (err, row) => {
        if (err) {
          console.error(err.message);
        }
        console.log(row.id + "\t" + row.temp);
        var temp = {
          id: row.id,
          temp: row.temp
        };
        list.push(temp);
      }
    );
    res.json({list});
  });
  
});

app.post("/wheater-station", (req, res, next) => {
  res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});

app.delete("/wheater-station", (req, res, next) => {
  res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
});
