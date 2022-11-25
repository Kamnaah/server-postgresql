const client = require('./connection.js')
const express = require('express');
const cors= require('cors');

//middleware
const app = express();
app.use(express.json());
app.use(cors())


//get all
app.listen(8080, ()=>{
    console.log("Sever is now listening at port 8080");
})


client.connect();

//get all query------------------
app.get('/records', (req, res)=>{
  
  client.query(`Select * from records`, (err, result)=>{
      if(!err){
          res.send(result.rows);
      }
      else{
        res.send(err.message)
      }
  });
  client.end;
})


//get by id query----------------------

app.get('/records/:id', (req, res)=>{
  client.query(`Select * from records where id=${req.params.id}`, (err, result)=>{
      if(!err){
          res.send(result.rows);
      }
  });
  client.end;
})


//add new records query --------------------------

app.post('/records', (req, res)=> {
  const records = req.body;
  let insertQuery = `insert into records(id, first_name, last_name, email , gender , ip_address) 
                     values(${records.id}, '${records.first_name}', '${records.last_name}', '${records.email}' , '${records.gender}', '${records.ip_address}')`

  client.query(insertQuery, (err, result)=>{
      if(!err){
          res.send('Insertion was successful')
      }
      else{ console.log(err.message) }
  })
  client.end;
})

//update records query---------------------

app.put('/records/:id', (req, res)=> {
  let records = req.body;
  let updateQuery = `update records
                     set first_name = '${records.first_name}',
                     last_name = '${records.last_name}',
                     email= '${records.email}',
                     gender='${records.gender}',
                     ip_address='${records.ip_address}'
                     where id = ${records.id}`

  client.query(updateQuery, (err, result)=>{
      if(!err){
          res.send('Update was successful')
      }
      else{ console.log(err.message) }
  })
  client.end;
})


//delete record query--------------------

app.delete('/records/:id', (req, res)=> {
  let insertQuery = `delete from records where id=${req.params.id}`

  client.query(insertQuery, (err, result)=>{
      if(!err){
          res.send('Deletion was successful')
      }
      else{ console.log(err.message) }
  })
  client.end;
})