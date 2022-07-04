const client = require("./connection.js");
const express = require("express");

const app = express();

app.listen(8062, () => {
  console.log("Sever is now listening at port 8062");
});

client.connect();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

// show vendors
app.get("/chatapplication", (req, res) => {
  client.query(`Select * from vendor`, (err, result) => {
    if (!err) {
      res.send(result.rows);
      console.log('Passed');
    }
  });
  client.end;
});

//Login
//show vendors by email and password
app.get("/chatapplication/:email/:password", (req, res) => {
  client.query(
    `Select * from vendor where email=${req.params.email} and password=${req.params.password}`,
    (err, result) => {
      if (!err) {
        res.send(result.rows)
        console.log('passed');
      } else {
        console.log('failed')
      }
    }
  );
  client.end;
});

//sign-up
app.post("/chatapplication", (req, res) => {
  const user = req.body;
  let insertQuery = `insert into vendor(email,password,name) 
                       values('${user.email}', '${user.password}','${user.name}')`;

  client.query(insertQuery, (err, result) => {
    if (!err) {
      res.send("New Vendor Registered Successfully");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});
