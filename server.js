const express = require("express");
const mysql = require("mysql");
const BodyParser = require("body-parser");
/* deklarasi yg di butuhkan */

const app = express(); 
/* deklarasi lagi karena express itu function */
app.use(BodyParser.urlencoded({extended : true }));
//untuk post form , supaya menangkap hasil input an

app.set("view engine", "ejs");
app.set("views", "views"); /*directory html nya dimana*/
const db = mysql.createConnection({
  host : "127.0.0.1",
  database : "db_siswa",
  user : "root",
  password : "root",
});
/* set up databes*/

db.connect((err) => {
  if (err) throw err;
  console.log ('database connect...');
  // untuk get data
  app.get("/",(req,res) => {
  const sql = "SELECT * FROM user";
  db.query(sql, (err, result) => {
    const users =JSON.parse(JSON.stringify(result));
    res.render("index", {users : users, title : "Dims Code"});
    });
  });
    // untuk insert data 
    app.post("/tambah",(req,res) => {
      const insertSql =`INSERT INTO user (nama,kelas) VALUES ('${req.body.nama}','${req.body.kelas}');`;
      db.query(insertSql, (err,result) => {
        if(err) throw err;
        res.redirect("/");
      });
    });
    
    // Delate data 
    app.get("/delate/:id_user", (req, res) => {
      const delateSql = `DELETE FROM user WHERE id_user='${req.params.id_user}';`;
      db.query(delateSql, (err,result) => {
        if(err) throw err;
        res.redirect("/");
      });
    });
    
    // edit data 
    /*
    app.get("/edit/:id_user", (req, res) => {
      const sql = `SELECT nama,kelas FROM user WHERE id_user='${req.params.id_user}';`;
      console.log(sql)
      db.query(sql, (err, result) => {
      const user =JSON.parse(JSON.stringify(result));
      console.log(user.nama);
        res.render("edit", {
          user : user, 
          title : "Dims Code",
          nama: user.nama,
          kelas: user.kelas,
        });
      });
    });
    */
});
/* ini untuk mengkoneksikan */

app.listen(8000, () => {
  console.log('server siap');
});