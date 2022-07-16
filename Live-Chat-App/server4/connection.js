const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "12345678",
  host: "localhost",
  port: 1234,
  database: "chatapplication",
});

pool.connect(function (err) {
  if (err) {
    console.log("not connected");
    console.log(err);
  } else {
    console.log("Connected!");
  }
});

module.exports = pool;
