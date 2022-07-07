const client = require("./connection.js");
const express = require("express");
var cors = require("cors");

const app = express();
app.use(cors());

app.listen(8062, () => {
  console.log("Sever is now listening at port 8062");
});

client.connect();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// show vendors
// app.get("/chatapplication", (req, res) => {
// client.query(`Select * from vendor`, (err, result) => {
// if (!err) {
// res.send(result.rows);
// console.log('Passed');
// }
// });
// client.end;
// });

//Login
//show vendors by email and password
app.get("/chatapplication/:email/:password", (req, res) => {
  client.query(
    `Select * from vendor where email=${req.params.email} and password=${req.params.password}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows);
        console.log("passed");
      } else {
        console.log("failed");
      }
    }
  );
  client.end;
});

//sign-up
app.post("/Signup", (req, res) => {
  const user = req.body;
  console.log(user.email);
  client.query(
    `select * from vendor  where email='${user.email}'`,
    (err, result) => {
      if (result.rows.length >= 1) {
        console.log("Email already exist");
        res.status(201);
        res.send("Email already exist");
      } else {
        let insertQuery = `insert into vendor(name,email, password) 
          values('${user.name}','${user.email}', '${user.password}')`;

        client.query(insertQuery, (err, result) => {
          if (!err) {
            res.send("Insertion was successful");
            console.log("Insertion is Successfull");
            console.log(user.name + " " + user.email + " " + user.password);
          } else {
            console.log(err.message);
          }
        });
      }
    }
  );

  client.end;
});
