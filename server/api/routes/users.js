const express = require("express");
const router = express.Router();
const pool = require("../db");

router.use(express.json())
//Routes
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO client (email) VALUES($1) RETURNING *",
      [email]
    );
        res.send("send");
    //res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/queue", async (req, res) => {
  try {
    const { email } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO queingsystem (email) VALUES($1) RETURNING *",
      [email]
    );
        res.send("send");
    //res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/room", async (req, res) => {
  try {
    const { v_email,room,status,c_email } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO availableserver ( v_email,room,status,c_email) VALUES($1,$2,$3,$4) RETURNING *",
      [ v_email,room,status,c_email]
    );
        res.send("send");
    //res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


router.get("/:room", async(req, res) => {
  let user;
  const newTodo = await pool.query(
        `Select * from availableserver where room=${req.params.room} `,
    (err, result) => {
      if (!err) {
        user=result.v_email;
        res.send(result);
        console.log('passed');
      } else {
        console.log('failed')
      }
    }
  );
  console.log(user);

  });

  app.get('/available_server', (req, res)=>{
    client.query(`Select v_email, room from available_server`, (err, result)=>{
        if(!err){
            res.send(result.rows);

            // var resultArray = Object.values(JSON.parse(JSON.stringify(result.rows)))
            
        }
        //console.log(result);
    });
    client.end;
})



module.exports=router;

