const express = require("express")
const mysql = require("mysql")
/* deklarasi yg di butuhkan */

const app = express(); 
/* deklarasi lagi karena express itu function */

const db = mysql.createConnection({
  host : "127.0.0.1",
  database : "db_siswa",
  user : "root",
  password : "root",
})
/* set up databes*/

db.connect((err) => {
  if (err) throw err
  console.log ('database connect...')
  
  const sql = "SELECT * FROM user"
  db.query(sql, (err, result) => {
    const users =JSON.parse(JSON.stringify(result));
    console.log ("Hasil db ->", users)
    app.get("/",(req,res) => {
    res.send(users)
    })
  })
  
})
/* ini untuk mengkoneksikan */

app.listen(8000, () => {
  console.log('server siap')
})