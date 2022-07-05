const client = require('./connection.js')
const express = require('express');
const app = express();



client.connect();


const bodyParser = require("body-parser");
app.use(express.json());


app.get('/rating', (req, res)=>{
    client.query(`Select * from rating`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})
app.get('/session1', (req, res)=>{
    client.query(`Select * from Session1`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})
// client.connect();




app.get('/chatapplication/:chat_message_id', (req, res)=>{
    client.query(`Select * from chat_message where chat_message_id=${req.params.chat_message_id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})








app.post('/chatapplications', (req, res)=> {
    const chat_message = req.body;
    console.log(req.body);
    let insertQuery = `insert into rating(rate_list,rate_id,session_id) 
                       values(${chat_message.rate_list},${chat_message.rate_id},${chat_message.session_id})`

    client.query(insertQuery, (err, result)=>{
        if(!err){
            res.send("Successfully inserted");
        }
        else{ console.log(err.message) }
    })
    client.end;
})
 



const cors = require("cors");


//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo



// app.post('/rating', (req, res)=> {
//     const chat_message = req.body;
//     console.log(req.body);
//     let insertQuery = `insert into rating(rate_id) 
//                        values(${chat_message.rate_id})`

//     client.query(insertQuery, (err, result)=>{
//         if(!err){
//             res.send('Insertion was successful')
//         }
//         else{ console.log(err.message) }
//     })
//     client.end;
// })

app.post("/rating", async (req, res) => {
    try {
      const {rate_list,rate_id, session_id, vendor_email} = req.body;
      console.log(req.body);
      //res.send("jjhh");
      const newTodo = await client.query(
        "INSERT INTO rating (rate_list,rate_id,session_id, vendor_email) VALUES($1,$2,$3,$4)",
        [rate_list,rate_id,session_id, vendor_email]
     );  
    } catch (err) {
      console.error(err.message);
    }
  });




  app.get('/available_server', (req, res)=>{
    client.query(`Select v_email, room from available_server`, (err, result)=>{
        if(!err){
            res.send(result.rows);
            // data=result.rows;
            // console.log(data);
            // console.log(Object.entries(result.rows));
            var resultArray = Object.values(JSON.parse(JSON.stringify(result.rows)))
            console.log(resultArray[0].v_email);
        }
        //console.log(result);
    });
    client.end;
})



  
  app.put("/available_server/:v_email", async (req, res) => {
    try {
      const {c_email,status} = req.body;
      console.log(req.body);
    //   const v_emails=req.params.v_email
    //   const status = true;
      //res.send("jjhh");
      const newTodo = await client.query(
        `UPDATE available_server SET c_email = $1, status = $2 WHERE v_email = ${req.params.v_email} `,
         [c_email, status]
     );  
    } catch (err) {
      console.error(err.message);
    }
  });



  app.put("/available_server/:v_email", async (req, res) => {
    try {
      const {c_email,status} = req.body;
      console.log(req.body);
    //   const v_emails=req.params.v_email
    //   const status = true;
      //res.send("jjhh");
      const newTodo = await client.query(
        `UPDATE available_server SET c_email = $1, status = $2 WHERE v_email = ${req.params.v_email} `,
         [c_email, status]
     );  
    } catch (err) {
      console.error(err.message);
    }
  });








  app.listen(8064, ()=>{
    console.log("Sever is now listening at port 8064");
});
