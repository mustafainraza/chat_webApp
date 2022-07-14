const express = require("express");
const router = express.Router();
const client = require("./../connection.js");
const query = require("./../models/clients.js");
const query1 = require("./../models/vendors.js");

router.use(express.json());


router.get("/availableroom", (req, res) => {
  const val =false;
  console.log("objectobject");
  client.query(`select room_id from availableserver as v where v.status = ${val}`, (err, result) => {
    if (!err) {
      console.log("object");
      console.log(result.rows[0].room_id);
      res.send(result.rows[0].room_id);
    }
  else{
    console.log(err.message);
  }
});
  
  client.end;
});


router.post("/", async (req, res) => {
client.query(query1, (err, result) => {});
 client.query(
    `select vendors.email from vendors where email = '${req.body.email}'`,
    (err, result) => {
      if (!err) {
        console.log(req.body.email);
        console.log(result);
        if (result.length) {
          client.query(
            `select vendors.room1 from vendors where room1 = ${req.body.room1} OR room1 = ${req.body.room2}`,
            (err, result) => {
              if (!err) {
                if (!result.length) {
                  client.query(
                    `select vendors.room2 from vendors where room2 = ${req.body.room1} OR room2 = ${req.body.room2}`,
                    (err, result) => {
                      if (!err) {
                        if (!result.length) {
                          let updateQuery = `update vendors
                         set name = '${req.body.name}',
                         password = '${req.body.password}',
                         room1 = ${req.body.room1} ,
                         room2 = ${req.body.room2},
                         availabler1 = ${req.body.availabler1},
                         availabler2 = ${req.body.availabler2},
                         where email = '${req.body.email}'`; 

                          client.query(updateQuery, (err, result) => {
                            if (!err) {
                              res.send("ok");
                            } else {
                              console.log(err.message);
                            }
                          });
                        } else {
                          res.send("Room 2 already exists");
                        }
                      } else {
                        console.log(err.message);
                      }
                    }
                  );
                } else {
                  res.send("Room 1 already exists");
                }
              } else {
                console.log(err.message);
              }
            }
          );
        } else {
          res.send("No such vendor exists");
        }
      } else {
        console.log(err.message);
      }
    }
  );

  client.end;
});

router.get("/", async (req, res) => {
  client.query("select * from vendors", (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      err.message;
    }
  });
});

router.get("/:room", (req, res) => {
  client.query(`select status from availableserver as v where v.room_id = ${req.params.room}`, (err, result) => {
    if (!err) {
      console.log("object");
      console.log(result);
      res.send(result.rows[0].status);}
  else{
    console.log(err.message);
  }
});
  
  client.end;
});


//rooms post
router.post("/rooms", (req, res) => {
  const user = req.body;

        let insertQuery = `insert into availableserver(v_email,room_id,status) 
          values('${user.v_email}','${user.room}', '${user.status}')`;

        client.query(insertQuery, (err, result) => {
          if (!err) {
            res.send("Insertion was successful");
            console.log("Insertion is Successfull");
          } else {
            console.log(err.message);
          }
        });


  client.end;
});

//update

router.post("/update/:rooms", (req, res) => {
  const val=true;
  const user = req.body;

        let insertQuery = `update availableserver set status=${val} where room_id=${req.params.rooms}`; 

        client.query(insertQuery, (err, result) => {
          if (!err) {
            res.send("update was successful");
            console.log("update is Successfull");
          } else {
            console.log(err.message);
          }
        });


  client.end;
});

module.exports = router;
