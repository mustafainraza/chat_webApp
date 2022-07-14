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
// 
//ar
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const newTodo = await client.query(
      "INSERT INTO client (email) VALUES($1) RETURNING *",
      [email]
    );
        res.send("send");
    //res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
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
