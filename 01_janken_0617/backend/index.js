const express = require('express')
const mysql = require('mysql2')
const app = express()
const path = require('path');
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '../frontend/build')));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Reototetu33!',
  database: 'future_db_01'
});

app.get("/api/tork", (req, res) => {
  const user_id = req.query.user_id;
  const nick_name = req.query.nick_name;
  const sexkbn = req.query.sexkbn;
  const birthday = req.query.birthday;
  const telno = req.query.telno;
  const address1 = req.query.address1;
  
  const email = req.query.email;
  const id = req.query.id;
  const password = req.query.password;

  connection.query(
    'INSERT INTO `T_EE_USER_KHN` SET ?',
    {PK_EE_USER_ID:user_id
      , NICK_NAME:nick_name
      , SEX_KBN:sexkbn
      , BIRTH_DAY:birthday
      , TEL_NO:telno
      , ADDRESS1:address1
      , MAIL_ADDRESS:email
      , ID:id
      , PASSWORD:password},

      function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
    }
  );
  console.log("接続終了(正常)");
});


 app.get("/api", (req, res) => {
   connection.query(
     'SELECT LPAD(IfNull(MAX(PK_EE_USER_ID)+1,0000000001),10,0) as PK_EE_USER_ID FROM `T_EE_USER_KHN`',
     function(err, results, fields) {
       if(err) {
         console.log("接続終了(異常)");
         throw err;
       }
       res.json({user_id: results[0].PK_EE_USER_ID});
     }
   );
   console.log("接続終了(正常)");
 });

 app.get("/api/search/user_id_er", (req, res) => {
  connection.query(
    'SELECT LPAD(IfNull(MAX(PK_ER_USER_ID)+1,0000000001),10,0) as PK_ER_USER_ID FROM `T_ER_USER_KHN`',
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({user_id: results[0].PK_ER_USER_ID});
    }
  );
  console.log("接続終了(正常)");
});


app.get("/api/tork/er", (req, res) => {
  const user_id = req.query.user_id;
  const nick_name = req.query.nick_name;
  const sexkbn = req.query.sexkbn;
  const birthday = req.query.birthday;
  const telno = req.query.telno;
  const address1 = req.query.address1;
  
  const email = req.query.email;
  const id = req.query.id;
  const password = req.query.password;

  connection.query(
    'INSERT INTO `T_ER_USER_KHN` SET ?',
    {PK_ER_USER_ID:user_id
      , NICK_NAME:nick_name
      , SEX_KBN:sexkbn
      , BIRTH_DAY:birthday
      , TEL_NO:telno
      , ADDRESS1:address1
      , MAIL_ADDRESS:email
      , ID:id
      , PASSWORD:password},

      function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
    }
  );
  console.log("接続終了(正常)");
});












app.get("/api/search/user_er_all", (req, res) => {
  connection.query(
    'SELECT * FROM `T_ER_USER_KHN`',
    function(err, results, fields) {
      if(err) {
        console.log("接続終了(異常)");
        throw err;
      }
      res.json({userEeData: results});
    }
  );
  console.log("接続終了(正常)");
});













app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'));
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
})