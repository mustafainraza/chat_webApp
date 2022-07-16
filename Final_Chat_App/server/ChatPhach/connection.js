const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "68788522",
  database: "livechatapp",
});

module.exports = client;
