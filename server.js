const express = require("express")
const mysql = require("mysql")
const BodyParser = require("body-parser")
/* deklarasi yg di butuhkan */

const app = express(); 
/* deklarasi lagi karena express itu function */
app.use(BodyParser.urlencoded({extended : true }))
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
  // untuk get data
  app.get("/",(req,res) => {
  const sql = "SELECT * FROM user"
  db.query(sql, (err, result) => {
    const users =JSON.parse(JSON.stringify(result));
    res.render("index", {users : users, title : "Dims Code"})
    })
  })
    // untuk insert data 
    app.post("/tambah",(req,res) => {
      const insertSql =`INSERT INTO user (nama,kelas) VALUES ('${req.body.nama}','${req.body.kelas}');`
      db.query(insertSql, (err,result) => {
        if(err) throw err
        res.redirect("/");
      })
    })
})
/* ini untuk mengkoneksikan */

app.listen(8000, () => {
  console.log('server siap')
})