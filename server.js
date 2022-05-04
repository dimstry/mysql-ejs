const express = require("express")
const mysql = require("mysql")
/* deklarasi yg di butuhkan */

const app = express(); 
/* deklarasi lagi karena express itu function */
app.set("view engine", "ejs")
app.set("views", "views") /*directory html nya dimana*/
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
    res.render("index", {users : users, title : "Dims Code"})
    })
  })
  
})
/* ini untuk mengkoneksikan */

app.listen(8000, () => {
  console.log('server siap')
})