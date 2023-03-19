const mysql = require("mysql");

var db = mysql.createConnection({
  user: "root",
    host: "localhost",
    password: "password",
    database: "smarttic",
});

db.connect((err) => {
  if (!err) {
    console.log("DB is Connected");
  } else {
    console.log(err);
  }
});

module.exports = db;
