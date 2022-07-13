const express = require("express");
const router = express.Router();
const client = require("./../connection.js");

//const query = require("./../models/clients.js");

router.use(express.json());

// client.connect(); mustufain sigin
router.get("/chatapplication/:email/:password", (req, res) => {
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

//mutufain sign up
router.post("/Signup", (req, res) => {
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


//zain
router.get("/", async (req, res) => {
  client.query(`SELECT * FROM postgres.clients`, (err, result) => {
    if (!err) {
      console.log(result);
      res.send(result);
      // res.send("ssasd")
    } 
  });
  client.end;
});

router.post("/", async (req, res) => {
  client.query(query, (err, message) => {});

  client.query(
    `select clients.email from clients where email = '${req.body.email}'`,
    (err, result) => {
      if (!err) {
        if (!result.rows.length) {
          let insertQuery = `insert into clients (name , email, waiting)
                            values ('${req.body.name}' , '${req.body.email}', '${req.body.waiting}')`;

          client.query(insertQuery, (err, message) => {
            if (!err) {
              res.send("ok");
            } else {
              console.log(err.message);
            }
          });
        } else {
          res.send("Email already exists");
        }
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

router.put("/:email", (req, res) => {
  let updateQuery = `update clients
                        set waiting = ${req.body.waiting}
                         where email = '${req.params.email}'`;

  client.query(updateQuery, (err, result) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

router.get("/vacant", async (req, res) => {
  client.query(
    `SELECT vendors.name FROM vendors where vendors.availabler1 = 0 AND vendors.availabler2 = 0`,
    (err, result) => {
      if (!err) {
        res.send(result);
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

router.get("/notvacant", async (req, res) => {
  client.query(
    `SELECT vendors.name FROM vendors where vendors.availabler1 = 1 OR vendors.availabler2 = 1`,
    (err, result) => {
      if (!err) {
        res.send(result);
      } else {
        console.log(err.message);
      }
    }
  );
  client.end;
});

router.post("/checkroom", async (req, res) => {
  client.query(
    `SELECT vendors.availabler1 FROM vendors where room1 = ${req.body.room} `,
    (err, result) => {
      if (!err) {
        if(!result.length){
          client.query(
            `SELECT vendors.availabler2 FROM vendors where room2 = ${req.body.room} `,
            (err, result) => {
              if (!err) {
                res.send(result);
              }  
            })        
          }else{
          res.send(result);
        }
      } else {
        console.log(err.message);
      }
    });
  client.end;
});


module.exports = router;
