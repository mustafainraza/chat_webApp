const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "admin",
  host: "localhost",
  port: 5432,
  database: "chat_application"
});

pool.connect(function(err) {
  if (err) {console.log("not connected");
  console.log(err);
  }
  else{console.log("Connected!");}
  
});

module.exports = pool;
